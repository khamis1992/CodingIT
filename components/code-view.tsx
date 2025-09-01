import { useEffect, useRef } from 'react'
import 'prismjs'
import { readonlyEditor } from 'prism-code-editor/setups'
import 'prism-code-editor/themes/prism-tomorrow.css'
import 'prism-code-editor/layout.css'
import 'prism-code-editor/scrollbar.css'
import './code-theme.css'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-typescript'

export function CodeView({ code, lang }: { code: string; lang: string }) {
  const editorRef = useRef<HTMLDivElement>(null)
  const editor = useRef<any>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (editorRef.current && !editor.current) {
        editor.current = readonlyEditor(editorRef.current, {
          language: lang,
          value: code,
          wordWrap: true,
          theme: 'prism-tomorrow',
        })
      }
    }
  }, [lang, code])

  useEffect(() => {
    if (editor.current) {
      editor.current.setOptions({ value: code })
    }
  }, [code])

  return (
    <div
      ref={editorRef}
      className="p-4 pt-2"
      style={{
        fontSize: 12,
        backgroundColor: 'transparent',
        borderRadius: 0,
        margin: 0,
        height: '100%',
      }}
    />
  )
}
