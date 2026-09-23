// The Worker in front of the static site. Everything is dist/ except /files/*,
// which is served out of the R2 bucket bound as FILES: downloads the launcher
// fetches that must not live in a git repository, the pureHD archive first.
// wrangler.jsonc routes only /files/* here (run_worker_first), so the pages
// never pay for a script run.

// The few R2 and asset-binding members this file uses. Written out rather than
// pulled from @cloudflare/workers-types, which would drag the Workers globals
// into the React build's type check.
interface R2Object {
  readonly body: ReadableStream
  readonly size: number
  readonly httpEtag: string
  writeHttpMetadata(headers: Headers): void
}

interface R2Bucket {
  get(key: string): Promise<R2Object | null>
  head(key: string): Promise<Omit<R2Object, 'body'> | null>
}

interface Env {
  FILES: R2Bucket
  ASSETS: { fetch(request: Request): Promise<Response> }
}

const prefix = '/files/'

// Flat names only: no folders, no dot segments, nothing a URL could use to
// reach a key it was not meant to.
const plainName = /^[A-Za-z0-9][A-Za-z0-9._-]*$/

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    if (!url.pathname.startsWith(prefix)) {
      return env.ASSETS.fetch(request)
    }
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, HEAD' } })
    }

    const key = url.pathname.slice(prefix.length)
    if (!plainName.test(key)) {
      return new Response('Not found', { status: 404 })
    }

    const object = request.method === 'HEAD' ? await env.FILES.head(key) : await env.FILES.get(key)
    if (!object) {
      return new Response('Not found', { status: 404 })
    }

    const headers = new Headers()
    object.writeHttpMetadata(headers)
    headers.set('ETag', object.httpEtag)
    headers.set('Content-Length', String(object.size))
    headers.set('Content-Disposition', `attachment; filename="${key}"`)
    // A day at the edge. The launcher pins each archive by SHA-256, so a file
    // replaced under the same name is refused until a launcher release says
    // otherwise, and a stale cached copy is the one it still accepts.
    headers.set('Cache-Control', 'public, max-age=86400')

    const body = request.method === 'HEAD' ? null : (object as R2Object).body
    return new Response(body, { headers })
  },
}
