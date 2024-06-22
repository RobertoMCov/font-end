'use client'

import React from 'react'
import { Table } from 'antd'
// import { GeneralContext } from '@repo/ui/context'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

const CustomTable = (props) => {
  const {
    //  keyLSColumns = '',
    keyToRenderTable = '',
    infoTableToRender = {},
    tableProps = {},
    columnsToRender = null
    // hasAdditionalColumns = false
  } = props
  const { catalogData = [], totalRecords = 0 } = infoTableToRender
  // const { lsData = {}, additionalInfoTable = {} } = useContext(GeneralContext)
  // const currentColumns = columnsToRender || lsData[keyLSColumns] || []
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const pageNumber = searchParams.get('page') || 1
  const pageSize = searchParams.get('totalRecordsByPage') || 10
  const { replace } = useRouter()

  // const renderColumns = useMemo(() => currentColumns.map(({ columnName = '', keyBackEnd, columnType = 'column', renderOption = '' }) => {

  //   if (!hasAdditionalColumns && currentColumns.length) return { title: columnName, dataIndex: keyBackEnd, key: keyBackEnd }
  //   else if (hasAdditionalColumns && Object.keys(additionalInfoTable).length && currentColumns.length) {
  //     if (columnType === 'component') {
  //       const currentAction = additionalInfoTable[renderOption] || (() => { })

  //       return {
  //         dataIndex: keyBackEnd,
  //         key: keyBackEnd,
  //         render: currentAction
  //       }
  //     }

  //     return { title: columnName, dataIndex: keyBackEnd, key: keyBackEnd }
  //   }
  // }), [currentColumns, additionalInfoTable])

  const dataResourceToRender = catalogData.map((item) => {
    item.key = item[keyToRenderTable]
    return item
  })

  const onChange = (currentPage, currentSize) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', currentPage.toString())
    params.set('totalRecordsByPage', currentSize.toString())
    replace(`${pathName}?${params.toString()}`)
  }

  const pageSizeProperties = {
    showSizeChanger: true,
    total: totalRecords,
    showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} Registros`,
    onChange,
    current: pageNumber,
    defaultPageSize: pageSize
  }

  return (
    <>
      {
        // !hasAdditionalColumns || (hasAdditionalColumns && Object.keys(additionalInfoTable).length && currentColumns.length) ?
        columnsToRender.length
          ? <Table
              className='custom-table'
              scroll={{
                x: '500px',
                y: '65vh'
              }} columns={columnsToRender}
              dataSource={dataResourceToRender}
              pagination={totalRecords ? pageSizeProperties : false}
              {...tableProps}
            />
          : null
      }
    </>
  )
}

export default CustomTable
