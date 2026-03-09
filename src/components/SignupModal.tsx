import { useState } from 'react'
import styles from './SignupModal.module.css'

interface Props {
  onEnter: (username: string) => void
}

export default function SignupModal({ onEnter }: Props) {
  const [username, setUsername] = useState('')

  function handleSubmit() {
    const trimmed = username.trim()
    if (!trimmed) return
    onEnter(trimmed)
  }

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Welcome to CodeLeap network!</h2>
        <label className={styles.label} htmlFor="username">
          Please enter your username
        </label>
        <input
          id="username"
          className={styles.input}
          type="text"
          placeholder="John doe"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <div className={styles.footer}>
          <button
            className={styles.btnEnter}
            disabled={!username.trim()}
            onClick={handleSubmit}
          >
            ENTER
          </button>
        </div>
      </div>
    </div>
  )
}
