import { useCallback, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchPosts, createPost, updatePost, deletePost } from '../api/posts'
import type { Post } from '../api/posts'
import PostCard from './PostCard'
import EditModal from './EditModal'
import DeleteModal from './DeleteModal'
import styles from './MainScreen.module.css'

interface Props {
  username: string
}

export default function MainScreen({ username }: Props) {
  const queryClient = useQueryClient()

  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [deletingPost, setDeletingPost] = useState<Post | null>(null)

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    refetchInterval: 15000,
  })

  const sorted = posts.toSorted(
    (a, b) => new Date(b.created_datetime).getTime() - new Date(a.created_datetime).getTime()
  )

  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      setNewTitle('')
      setNewContent('')
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, title, content }: { id: number; title: string; content: string }) =>
      updatePost(id, { title, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      setEditingPost(null)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      setDeletingPost(null)
    },
  })

  const canCreate = newTitle.trim() && newContent.trim()

  const handleCreate = useCallback(() => {
    if (!newTitle.trim() || !newContent.trim()) return
    createMutation.mutate({ username, title: newTitle.trim(), content: newContent.trim() })
  }, [createMutation, username, newTitle, newContent])

  const handleSave = useCallback(
    (title: string, content: string) => {
      if (!editingPost) return
      updateMutation.mutate({ id: editingPost.id, title, content })
    },
    [editingPost, updateMutation]
  )

  const handleDeleteConfirm = useCallback(() => {
    if (!deletingPost) return
    deleteMutation.mutate(deletingPost.id)
  }, [deletingPost, deleteMutation])

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.headerTitle}>CodeLeap Network</span>
      </header>

      <main className={styles.feed}>
        <div className={styles.createCard}>
          <h3 className={styles.createHeading}>What's on your mind?</h3>
          <label className={styles.label} htmlFor="new-title">Title</label>
          <input
            id="new-title"
            className={styles.input}
            placeholder="Hello world"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <label className={styles.label} htmlFor="new-content">Content</label>
          <textarea
            id="new-content"
            className={styles.textarea}
            placeholder="Content here"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <div className={styles.createFooter}>
            <button
              type="button"
              className={styles.btnCreate}
              disabled={!canCreate || createMutation.isPending}
              onClick={handleCreate}
            >
              {createMutation.isPending ? 'Creating...' : 'Create'}
            </button>
          </div>
        </div>

        {isLoading ? (
          <p className={styles.status}>Loading posts...</p>
        ) : sorted.length === 0 ? (
          <p className={styles.status}>No posts yet. Be the first!</p>
        ) : (
          sorted.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUser={username}
              onEdit={setEditingPost}
              onDelete={setDeletingPost}
            />
          ))
        )}
      </main>

      {editingPost ? (
        <EditModal
          initialTitle={editingPost.title}
          initialContent={editingPost.content}
          onSave={handleSave}
          onCancel={() => setEditingPost(null)}
        />
      ) : null}

      {deletingPost ? (
        <DeleteModal
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeletingPost(null)}
        />
      ) : null}
    </div>
  )
}
