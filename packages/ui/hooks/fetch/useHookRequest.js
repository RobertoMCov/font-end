'use client'

import { useContext, useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { fetchPost, fetchGet } from './apiFetch'
import { ErrorContext } from '../../context/ErrorContext'
// import { buildStringParams } from './buildStringParam'
import useLocalStorage from '../useLocalStorage'

const verifyAuthInfo = ({ configGet = {}, token = '', auth = false }) => {
  let enabledRequest = true
  const headersObj = {}

  if (configGet && Object.keys(configGet).length) {
    enabledRequest = configGet.enabled
  }

  if (auth && token) {
    headersObj.Authorization = token
    configGet.enabled = !!(token && enabledRequest)
  }

  return { headersObj, configGetObj: configGet }
}

export const useFetchRequest = ({
  token = '',
  auth = false,
  headers = {},
  mutationEvents = {},
  ...restParams
}) => {
  const { storedValue } = useLocalStorage({ key: 'jwtToken' })
  if (!token) {
    token = storedValue
  }
  const errorContext = useContext(ErrorContext)
  const queryClient = useQueryClient()

  let { headersObj } = verifyAuthInfo({ token, auth })
  headersObj = { ...headersObj, ...headers }

  const fetchData = useMutation(
    async (dataFetch) =>
      await fetchPost({
        dataFetch,
        headersObj,
        ...restParams
      }),
    mutationEvents
  )

  useEffect(() => {
    if (fetchData.isError && fetchData.error) {
      errorContext.setObjError((error) => ({
        ...error,
        ...fetchData
      }))
    }
  }, [fetchData.error, fetchData.isError])

  fetchData.queryClient = queryClient
  return fetchData
}

export const useGetRequest = ({
  keyRequest,
  optionUrl,
  pathUrl,
  configGet = {},
  auth = false,
  token = '',
  optionsRequest,
  arrayKeys = []
}) => {
  const { storedValue } = useLocalStorage({ key: 'jwtToken' })
  if (!token) {
    token = storedValue
  }

  const errorContext = useContext(ErrorContext)
  const queryClient = useQueryClient()
  const { headersObj, configGetObj } = verifyAuthInfo({
    configGet,
    token,
    auth
  })

  const getData = useQuery(
    [keyRequest, ...arrayKeys],
    async () =>
      await fetchGet({
        urlOption: optionUrl,
        pathUrl,
        headersObj,
        optionsRequest
      }),
    {
      refetchOnWindowFocus: false,
      ...configGetObj
    }
  )

  useEffect(() => {
    if (getData.isError && getData.error) {
      errorContext.setObjError((error) => ({
        ...error,
        ...getData
      }))
    }
  }, [getData.error, getData.isError])

  getData.queryClient = queryClient

  return getData
}
