import { OnChangeJSON } from "@remirror/react";
import { WysiwygEditor } from "@remirror/react-editors/wysiwyg";
import { RemirrorJSON } from "remirror";

interface MyEditorProps {
  onChange: (json: RemirrorJSON) => void
  initialContent?: RemirrorJSON
}

export function MyEditor({ onChange, initialContent }: MyEditorProps) {
  return (
    <div className="p-4">
      <WysiwygEditor placeholder="Enter Text..." initialContent={initialContent}>
        <OnChangeJSON onChange={onChange} />
      </WysiwygEditor >
    </div >
  )
}