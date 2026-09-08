const body = `## Mod

- Name:
- Repository (an SRML repository, if it hosts one):
- Description:
- Author:

## Notes

Anything else worth knowing before this gets reviewed.
`

const params = new URLSearchParams({
  title: 'Mod submission: ',
  body,
  labels: 'submission request',
  assignees: 'MairwunNx',
})

export const modSubmissionUrl = `https://github.com/ancaria-dev/site/issues/new?${params.toString()}`
