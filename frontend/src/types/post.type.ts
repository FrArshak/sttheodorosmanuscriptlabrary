export type PostType = {
  success: number,
  type: string,
  totalPost?: number
  posts?: PostItemType[]
  post?: PostItemType

}

export  type PostItemType = {

  id: number,
  post_type: string,
  post_en: {
    title: string,
    paragraph: string
  },
  post_am: {
    title: string,
    paragraph: string
  },
  image: string
  created_by?: number,
  created_at?: string,
  updated_at?: string

}
