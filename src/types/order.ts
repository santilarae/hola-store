import { IProductCart } from './products'

export interface IOrder {
  id: number
  products: IProductCart[]
  total: number
  date: Date
  status: string
  username: string
}
