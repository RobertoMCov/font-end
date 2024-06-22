import React, { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppAntD } from '../hooks'

export const ErrorContext = createContext()

export const ProviderError = (props) => {
  const { notification } = useAppAntD()
  const router = useRouter()
  const [objError, setObjError] = useState({
    error: '',
    isError: false
  })

  useEffect(() => {
    if (objError.isError) {
      const messageEndpoint = objError.error?.message?.procName || objError.error?.message

      notification.error({
        message: 'Error Desconocido',
        description: messageEndpoint || 'Error desconocido'
      })

      if (['sessionExpired', 'unauthorized'].includes(objError.error.name)) {
        router.replace('/')
      }
    }
  }, [objError.isError, objError.error])

  return (
    <ErrorContext.Provider
      value={{
        objError,
        setObjError
      }}
    >
      {props.children}
    </ErrorContext.Provider>
  )
}

export default ProviderError
