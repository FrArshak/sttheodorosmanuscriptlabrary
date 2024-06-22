export type LoginType = {
  success: number,
  type: number,
  message: number,
  authUser: {
    id: 1,
    name: string,
    email: string,
    avatar: string | null,
    email_verified_at: string | null,
    created_at: string | null,
    updated_at: string | null
  },
  token: string
}
