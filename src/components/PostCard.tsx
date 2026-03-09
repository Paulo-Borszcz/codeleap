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
              <TrashIcon />
            </button>
            <button
              type="button"
              className={styles.iconBtn}
              onClick={() => onEdit(post)}
              aria-label="Edit post"
            >
              <EditIcon />
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

function TrashIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
      <path d="M2 4h12M5.333 4V2.667h5.334V4M6.667 7.333v4M9.333 7.333v4M3.333 4l.667 9.333h8L12.667 4H3.333z"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function EditIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
      <path d="M11.333 2a1.886 1.886 0 0 1 2.667 2.667L4.667 14H2v-2.667L11.333 2z"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
