import { Highlight, type Language, type PrismTheme } from 'prism-react-renderer'
import styles from './CodeBlock.module.less'

const sacredTheme: PrismTheme = {
  plain: {
    color: '#ede3d3',
    backgroundColor: 'transparent',
  },
  styles: [
    { types: ['comment'], style: { color: '#6f6153', fontStyle: 'italic' } },
    { types: ['keyword', 'builtin'], style: { color: '#e8c869' } },
    { types: ['function', 'method'], style: { color: '#e0a85c' } },
    { types: ['class-name', 'type-annotation', 'annotation'], style: { color: '#c9a227' } },
    { types: ['string', 'char'], style: { color: '#b8c98a' } },
    { types: ['number', 'boolean'], style: { color: '#c78a6b' } },
    { types: ['operator', 'punctuation'], style: { color: '#a99a86' } },
    { types: ['property', 'constant'], style: { color: '#d99a9a' } },
  ],
}

type CodeBlockProps = {
  code: string
  language?: Language
  title?: string
}

export function CodeBlock({ code, language = 'kotlin', title }: CodeBlockProps) {
  return (
    <div className={styles.panel}>
      <div className={styles.chrome}>
        <span className={styles.dot} data-tone="crimson" />
        <span className={styles.dot} data-tone="gold" />
        <span className={styles.dot} data-tone="muted" />
        {title && <span className={styles.title}>{title}</span>}
      </div>
      <Highlight code={code.trim()} language={language} theme={sacredTheme}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${styles.pre} ${className}`} style={style}>
            <code>
              {tokens.map((line, lineIndex) => {
                const lineProps = getLineProps({ line })
                return (
                  // biome-ignore lint/suspicious/noArrayIndexKey: token lines have no stable identity
                  <div key={lineIndex} {...lineProps} className={styles.line}>
                    <span className={styles.lineNumber}>{lineIndex + 1}</span>
                    <span className={styles.lineContent}>
                      {line.map((token, tokenIndex) => {
                        const tokenProps = getTokenProps({ token })
                        return (
                          // biome-ignore lint/suspicious/noArrayIndexKey: tokens have no stable identity
                          <span key={tokenIndex} {...tokenProps} />
                        )
                      })}
                    </span>
                  </div>
                )
              })}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  )
}
