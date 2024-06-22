import { fetchPost, fetchGet } from './fetch/apiFetch'
import buildStringParams from './fetch/buildStringParam'
import useDrawer from './useDrawer'
import useFilters from './filter/useFilters'
import { useFetchRequest, useGetRequest } from './fetch/useHookRequest'
import useLocalStorage from './useLocalStorage'
import useGetSize from './useGetSize'
import useModal from './useModal'
import useAppAntD from './useAppAntD'

const useHookRequest = {
  useFetchRequest,
  useGetRequest
}

const apiFetch = {
  fetchPost,
  fetchGet
}

export {
  apiFetch,
  useDrawer,
  useFilters,
  useHookRequest,
  useLocalStorage,
  useGetSize,
  useModal,
  useAppAntD,
  buildStringParams
}
