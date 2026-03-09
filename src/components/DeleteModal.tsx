import styles from './DeleteModal.module.css'

interface Props {
  onConfirm: () => void
  onCancel: () => void
}

export default function DeleteModal({ onConfirm, onCancel }: Props) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p className={styles.message}>Are you sure you want to delete this item?</p>
        <div className={styles.actions}>
          <button className={styles.btnCancel} onClick={onCancel}>Cancel</button>
          <button className={styles.btnDelete} onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  )
}
