import { useCallback, useMemo, useState } from "react"
import { Editor } from "./Editor"

const STORAGE = 'editor-remirror'

export function DocumentRemirror() {
  const [initialContent] = useState<string>(() => {
    const content = window.localStorage.getItem(STORAGE)
    return content ? JSON.parse(content) : `<h1>Untiled...</h1>`
  })

  /*   const { id } = useParams<{ id: string }>()
    const queryClient = useQueryClient()
  
    const idDocument = id ?? ''
  
    const { data: result, isFetching } = useQuery({
      queryKey: ['document', id],
      queryFn: () => fetchDocument(idDocument),
    })
  
    const { mutateAsync: saveStateDocumentFn } = useMutation({
      mutationFn: ({ title, content }: OnContentUpdatedParams) =>
        saveStateDocument(idDocument, title, content),
      onSuccess(_data, { title, content }, __context) {
        queryClient.setQueryData<DocumentIPC[]>(['documents'], (documents) => {
          return documents?.map((document) => {
            if (document.id === idDocument) {
              return { ...document, title }
            }
            return document
          })
        })
      },
    }) */

  /*  const initialContent = useMemo(() => {
     if (result) {
       return `<h1>${result.title}</h1>${result.content ?? '<p></p>'}`
     }
 
     return ''
   }, [result]) */


  const handleEditorChange = useCallback((html: string | null) => {

    window.localStorage.setItem(STORAGE, JSON.stringify(html))

    /* const contentRegex = /(<h1>(?<title>.+)<\/h1>(?<content>.+)?)/
    const parsedContent = html?.match(contentRegex)?.groups

    const title = parsedContent?.title ?? 'Untiled...'
    const content = parsedContent?.content ?? ''

    saveStateDocumentFn({ title, content }) */

  }, [])

  return (
    <Editor onChange={handleEditorChange} initialContent={initialContent} />
  )
}