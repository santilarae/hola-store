import { useEffect, useState } from 'react'

function useFetchApi<T> (endpoint: string, requestInit?: RequestInit) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const abortController = new AbortController()
    const fetchData = async () => {
      try {
        const res = await fetch('https://api.escuelajs.co/api/v1' + endpoint, {
          signal: abortController.signal,
          ...requestInit,
          method: 'GET'
        })
        if (!res.ok) {
          throw new Error(`${res.status} ${res.statusText}`)
        }
        const data = await res.json()
        setData(data)
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          setError(error)
        }
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    return () => {
      abortController.abort()
    }
  }, [endpoint, requestInit])

  return {
    data,
    loading,
    error
  }
}

export default useFetchApi
