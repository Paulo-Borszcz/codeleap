import { memo } from 'react'
import type { Post } from '../api/posts'
import styles from './PostCard.module.css'

interface Props {
  post: Post
  currentUser: string
  onEdit: (post: Post) => void
  onDelete: (post: Post) => void
}

function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (diff < 60) return `${diff} seconds ago`
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`
  return `${Math.floor(diff / 86400)} days ago`
}

const TRASH_ICON = (
  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2 4h12M5.3 4V2.7h5.3V4M6.7 7.3v4M9.3 7.3v4M3.3 4l.7 9.3h8L12.7 4H3.3z"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const EDIT_ICON = (
  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M11.3 2a1.9 1.9 0 0 1 2.7 2.7L4.7 14H2v-2.7L11.3 2z"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const PostCard = memo(function PostCard({ post, currentUser, onEdit, onDelete }: Props) {
  const isOwner = post.username === currentUser

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>{post.title}</span>
        {isOwner && (
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.iconBtn}
              onClick={() => onDelete(post)}
              aria-label="Delete post"
            >
              {TRASH_ICON}
            </button>
            <button
              type="button"
              className={styles.iconBtn}
              onClick={() => onEdit(post)}
              aria-label="Edit post"
            >
              {EDIT_ICON}
            </button>
          </div>
        )}
      </div>
      <div className={styles.meta}>
        <span className={styles.username}>@{post.username}</span>
        <span className={styles.time}>{timeAgo(post.created_datetime)}</span>
      </div>
      <p className={styles.content}>{post.content}</p>
    </div>
  )
})

export default PostCard
