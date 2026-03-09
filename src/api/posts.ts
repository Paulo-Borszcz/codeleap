const BASE_URL = 'https://dev.codeleap.co.uk/careers/'

export interface Post {
  id: number
  username: string
  created_datetime: string
  title: string
  content: string
}

interface ListResponse {
  results: Post[]
}

export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch(BASE_URL)
  if (!res.ok) throw new Error('Failed to fetch posts')
  const data: ListResponse = await res.json()
  return data.results
}

export async function createPost(payload: { username: string; title: string; content: string }): Promise<Post> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Failed to create post')
  return res.json()
}

export async function updatePost(id: number, payload: { title: string; content: string }): Promise<Post> {
  const res = await fetch(`${BASE_URL}${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Failed to update post')
  return res.json()
}

export async function deletePost(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}${id}/`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete post')
}
