import 'remirror/styles/all.css';
import { Remirror, useRemirror, Toolbar, ToggleBoldButton, ToggleCodeButton, ToggleBlockquoteButton, OnChangeHTML, ToggleHeadingButton, ListButtonGroup, OnChangeHTMLProps } from '@remirror/react';
import { BoldExtension, CodeBlockExtension, CodeExtension, BlockquoteExtension, HeadingExtension, PlaceholderExtension, BulletListExtension, OrderedListExtension, TaskListExtension, HardBreakExtension } from 'remirror/extensions';
import css from 'refractor/lang/css.js';
import javascript from 'refractor/lang/javascript.js';
import json from 'refractor/lang/json.js';
import markdown from 'refractor/lang/markdown.js';
import typescript from 'refractor/lang/typescript.js';
import { htmlToProsemirrorNode } from 'remirror';


const extensions = () =>
  [
    new BoldExtension("bold"),
    new CodeBlockExtension({
      supportedLanguages: [css, javascript, json, markdown, typescript],
      syntaxTheme: 'dracula'
    }),
    new CodeExtension(),
    new BlockquoteExtension(),
    new PlaceholderExtension({
      placeholder: 'Untitled...',
      emptyNodeClass: 'before:content-[attr(data-placeholder)] before:text-gray-500 before:h-0 before:float-left before:pb-4 before:pointer-events-none before:text-4xl before:font-black',
    }),
    new HeadingExtension({
      defaultLevel: 1,
      levels: [1, 2, 3, 4]
    }),
    new BulletListExtension({}),
    new OrderedListExtension(),
    new TaskListExtension(),
    new HardBreakExtension(),
  ];


export interface OnContentUpdatedParams {
  title: string
  content?: string
}

interface EditorProps {
  onChange: (html: string) => void
  initialContent?: string
}


export const Editor = ({ onChange, initialContent = 'Untiled...' }: EditorProps) => {

  const contentRegex = /(<h1>(?<title>.+)<\/h1>(?<content>.+)?)/
  const parsedContent = initialContent.match(contentRegex)?.groups

  const title = parsedContent?.title ?? 'Untiled...'
  //const content = parsedContent?.content ?? ''


  // const initialTitle = initialContent === "<p></p>" ? 'Untiled' : `${initialContent?.replace(/<\/?(h1|p)>/g, '')}`

  const defaultInitialContent = {
    type: 'doc',
    content: [
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [{ type: 'text', text: title }],
      },
    ],
  }

  const STORAGE = 'editor-remirror'

  const loadInitialContent = () => {

/* const { id } = useParams<{ id: string }>()
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
  })
*/
    /*  if (result) {
       return `<h1>${result.title}</h1>${result.content ?? '<p></p>'}`
     }
 
     if (result.content === '\"<p></p>\"') {
       return defaultInitialContent;
     }
 
     if (result.content) {
       try {
         return JSON.parse(result.content);
       } catch (error) {
         console.error('Failed to parse saved content:', error);
         return defaultInitialContent;
       }
     }
 
     return defaultInitialContent; */


    const savedContent = localStorage.getItem(STORAGE);

    if (savedContent === '\"<p></p>\"') {
      return defaultInitialContent;
    }

    if (savedContent) {
      try {
        return JSON.parse(savedContent);
      } catch (error) {
        console.error('Failed to parse saved content:', error);
        return defaultInitialContent;
      }
    }
    return defaultInitialContent;
  };



  const { manager, state, setState } = useRemirror({
    extensions,
    content: loadInitialContent(),
    selection: 'start',
    stringHandler: htmlToProsemirrorNode,
  });

  return (
    <div className='flex-1 flex flex-col'>

      <Remirror
        classNames={['focus:outline-none text-white pt-4 prose prose-invert']}
        manager={manager} initialContent={state}
        autoRender='end'
        onChange={() => setState(state)}
      >

        <Toolbar style={{ background: '#17141f', gap: 8 }}>
          <ToggleBoldButton style={{ background: '#17141f', color: '#fff', borderColor: '#fff' }} />
          <ToggleCodeButton style={{ background: '#17141f', color: '#fff', borderColor: '#fff' }} />
          <ToggleBlockquoteButton style={{ background: '#17141f', color: '#fff', borderColor: '#fff' }} />
          < ToggleHeadingButton attrs={{ level: 1 }} style={{ background: '#17141f', color: '#fff', borderColor: '#fff' }} />
          < ToggleHeadingButton attrs={{ level: 2 }} style={{ background: '#17141f', color: '#fff', borderColor: '#fff' }} />
          < ToggleHeadingButton attrs={{ level: 3 }} style={{ background: '#17141f', color: '#fff', borderColor: '#fff' }} />
          <ListButtonGroup />
        </Toolbar>

        <OnChangeHTML onChange={onChange} />

      </Remirror>

    </div>
  );
};