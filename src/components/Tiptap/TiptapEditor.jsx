import CharacterCount from '@tiptap/extension-character-count'
import Highlight from '@tiptap/extension-highlight'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import { EditorContent, useEditor, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Placeholder from '@tiptap/extension-placeholder'
import "./index.scss";
import MenuBar from './components/MenuBar'

export function Editor(option){

  const editor = useEditor({
      immediatelyRender: false,
      shouldRerenderOnTransaction: false,
      autofocus: true,
      extensions: [
        StarterKit.configure(),
        Highlight,
        Placeholder.configure({
          // Use a placeholder:
          placeholder: 'Write description …',
        }),
        TaskList,
        TaskItem,
        Table.configure({
          resizable: true,
        }),
        TableRow,
        TableHeader,
        TableCell,
        CharacterCount.configure(),           
      ],
      ...option,
      
    })

    return editor
}

export function TiptapEditor({editor}) { 
 
  const { characterCount, wordCount } = useEditorState({
    editor,
    selector: ctx => {
      return {
        characterCount: ctx.editor?.storage?.characterCount?.characters(),
        wordCount: ctx.editor?.storage?.characterCount?.words(),
      }
    },
  })
console.log("render editor")
  return (
    <div className="editor">
      {editor && <MenuBar editor={editor} />}       
      <EditorContent className="editor__content" editor={editor}/>
    </div>
  )
}
