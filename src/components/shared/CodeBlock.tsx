import { Highlight, type Language, type PrismTheme } from 'prism-react-renderer'
import { useState } from 'react'
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

export type CodeTab = {
  id: string
  label: string
  code: string
  language: Language
}

type CodeBlockProps = {
  code?: string
  language?: Language
  title?: string
  tabs?: CodeTab[]
  activeTabId?: string
  onTabChange?: (id: string) => void
}

export function CodeBlock({
  code,
  language = 'kotlin',
  title,
  tabs,
  activeTabId,
  onTabChange,
}: CodeBlockProps) {
  const [internalTabId, setInternalTabId] = useState(tabs?.[0]?.id)
  const active = tabs
    ? (tabs.find((tab) => tab.id === (activeTabId ?? internalTabId)) ?? tabs[0])
    : undefined

  function selectTab(id: string) {
    setInternalTabId(id)
    onTabChange?.(id)
  }

  const shownCode = active ? active.code : (code ?? '')
  const shownLanguage = active ? active.language : language

  return (
    <div className={styles.panel}>
      <div className={styles.chrome}>
        <span className={styles.dot} data-tone="crimson" />
        <span className={styles.dot} data-tone="gold" />
        <span className={styles.dot} data-tone="muted" />
        {tabs ? (
          <div className={styles.tabs} role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={tab.id === active?.id}
                className={tab.id === active?.id ? `${styles.tab} ${styles.tabActive}` : styles.tab}
                onClick={() => selectTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        ) : (
          title && <span className={styles.title}>{title}</span>
        )}
      </div>
      <Highlight
        key={active?.id}
        code={shownCode.trim()}
        language={shownLanguage}
        theme={sacredTheme}
      >
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
