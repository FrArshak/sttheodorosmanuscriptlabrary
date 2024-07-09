export type UserInfoType = {
  success: number,
  type: string,
  message: string,
  authUser: {
    id: number,
    name: string,
    email: string,
    avatar: string | null,
    email_verified_at: string | null,
    created_at: string | null,
    updated_at: string | null
  }
}
