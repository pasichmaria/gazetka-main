export interface Paper {
  id: string
  userId: string
  name: string
  description: string
  image: string
  publisher: string
  group: string
  date: Date
  extra?: string
}
