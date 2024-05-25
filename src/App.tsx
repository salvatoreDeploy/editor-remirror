import './global.css'
import { Editor } from "./components/Editor";
import { DocumentRemirror } from "./components/EditorContent";

export function App() {

  return (
    <div className="min-h-screen p-8 text-zinc-900 bg-gradient-to-r from-gray-700 via-gray-900 to-black">
      <div className="bg-rotion-900 w-[1100px] mx-auto rounded-xl min-h-[720px] shadow-md border-blue-400/20 overflow-hidden grid grid-cols-[16rem_1fr]">
        <aside className="bg-zinc-50 border-r border-r-zinc-100 p-4">
          <div className="flex gap-2 group">
            <button className="size-3 rounded-full bg-red-400" />
            <button className="size-3 rounded-full bg-yellow-400" />
            <button className="size-3 rounded-full bg-green-400" />
          </div>
        </aside>
        <section className="p-4">
          <div className="max-w-[700px] mx-auto pt-16">
            <DocumentRemirror />
          </div>
        </section>
      </div>
    </div>
  )
}


