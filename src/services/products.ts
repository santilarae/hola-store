import { API_URL } from "."

export const getProducts = async <T>(qParams?: string) => {
  const qP = qParams ? qParams : ''
  const res = await fetch(API_URL + '/products' + qP)
  if (!res.ok) {
    throw new Error(res.statusText)
  }
  const data: T = await res.json()
  return data
}
