import { useState } from 'react'
import styles from './EditModal.module.css'

interface Props {
  initialTitle: string
  initialContent: string
  onSave: (title: string, content: string) => void
  onCancel: () => void
}

export default function EditModal({ initialTitle, initialContent, onSave, onCancel }: Props) {
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)

  const isValid = title.trim() && content.trim()

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.heading}>Edit item</h3>
        <label className={styles.label} htmlFor="edit-title">Title</label>
        <input
          id="edit-title"
          className={styles.input}
          placeholder="Hello world"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className={styles.label} htmlFor="edit-content">Content</label>
        <textarea
          id="edit-content"
          className={styles.textarea}
          placeholder="Content here"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className={styles.actions}>
          <button type="button" className={styles.btnCancel} onClick={onCancel}>Cancel</button>
          <button
            type="button"
            className={styles.btnSave}
            disabled={!isValid}
            onClick={() => onSave(title.trim(), content.trim())}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
