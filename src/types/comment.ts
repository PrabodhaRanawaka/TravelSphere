export interface CommentUser {
  id: number
  username: string
}

export interface Comment {
  id: number
  body: string
  postId: number
  user: CommentUser
}

export interface CommentResponse {
  comments: Comment[]
  total: number
  skip: number
  limit: number
}
