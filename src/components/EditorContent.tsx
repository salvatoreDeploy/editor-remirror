import { useCallback, useState } from "react"
import { RemirrorJSON } from "remirror"
import { MyEditor } from "./MyEditor"

const STORAGE = 'editor-remirror'

export function EditorContent() {
  const [initialContent] = useState<RemirrorJSON | undefined>(() => {
    const content = window.localStorage.getItem(STORAGE)
    return content ? JSON.parse(content) : ''
  })

  const handleEditorChange = useCallback((json: RemirrorJSON) => {
    window.localStorage.setItem(STORAGE, JSON.stringify(json))
  }, [])

  return (
    <MyEditor onChange={handleEditorChange} initialContent={initialContent} />
  )
}