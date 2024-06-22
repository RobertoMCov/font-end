import React, { Suspense, memo } from 'react'
import { fetchGet } from '../hooks/fetch/apiFetch'
import CustomTable from './CustomTable'
import SkeletonTable from '../skeletons/SkeletonTable'
import { SearchBar } from '@repo/ui/commons'

const RequestCustomTable = async (props) => {
  const { pathUrl = '', searchParams = {}, ...restProps } = props
  const { wordToSearch = '', page = '1', totalRecordsByPage = '10' } = searchParams

  const infoTableToRender = await fetchGet({
    pathUrl: `${pathUrl}&keyWord=${wordToSearch}&page=${page}&totalRecordsByPage=${totalRecordsByPage}`
  })

  return (
    <>
      <CustomTable
        infoTableToRender={infoTableToRender}
        {...restProps}
      />
    </>
  )
}

const SSRCustomTable = (props) => {
  const { searchParams = {} } = props
  const { wordToSearch = '', page = '1', totalRecordsByPage = '10' } = searchParams

  return (
    <>
      <SearchBar />
      <Suspense key={wordToSearch + page + totalRecordsByPage} fallback={<SkeletonTable />}>
        <RequestCustomTable
          {...props}
        />
      </Suspense>
    </>
  )
}

export default memo(SSRCustomTable)
