'use client'

import React, { useState } from 'react'
import { Drawer, Input, Button } from 'antd'
import { OrderedListOutlined } from '@ant-design/icons'
import { CustomTable, SearchBar } from '../../commons'
import { useGetRequest } from '../../hooks/fetch/useHookRequest'
import { useDebounce } from 'use-debounce'

const HelpInCapture = (props) => {
  const { name = '', titleDrawer = '', pathUrlRequest = '', keyRequest = '', columnsToRender = [], keyToRenderTable = '', form = {}, initialValues = {}, inputKeyToShowTable = '', onHandleOnRow = () => { }, takeValues = [], ...restProps } = props
  const [openDrawer, setOpenDrawer] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [wordToSearch, setWordToSearch] = useState('')
  const [requestInfo, setRequestInfo] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState(initialValues[name] ? [initialValues[name]] : [])
  const [valueToShowHelpInCapture, setValueToShowHelpInCapture] = useState(initialValues[inputKeyToShowTable] || '')
  const [valueToSearch] = useDebounce(wordToSearch, 1000)
  const [currentSelectedRow, setCurrentSelectedRow] = useState('')
  const { catalogData = [], totalRecords = 0 } = requestInfo

  const rowSelection = {
    type: 'radio',
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setCurrentSelectedRow(selectedRows[0])
      setSelectedRowKeys(selectedRowKeys)
    }
  }

  const onClickHelpInCapture = () => setOpenDrawer(!openDrawer)

  const onCloseAccept = () => {
    if (takeValues.length) {
      takeValues.forEach(({ keyName, keyValue }) => {
        form.setFieldsValue({
          [keyName]: currentSelectedRow[keyValue]
        })
      })
    } else {
      form.setFieldsValue({
        [name]: selectedRowKeys[0]
      })
    }

    onHandleOnRow({ keyName: name, value: selectedRowKeys[0], currentSelectedRow })
    setValueToShowHelpInCapture(currentSelectedRow[inputKeyToShowTable])
    setOpenDrawer(false)
  }

  const drawerRequest = useGetRequest({
    pathUrl: `${pathUrlRequest}&keyWord=${valueToSearch}&page=${currentPage}&totalRecordsByPage=${pageSize}`,
    keyRequest,
    arrayKeys: [valueToSearch, pageSize, currentPage],
    auth: true,
    configGet: {
      enabled: Boolean(pathUrlRequest && keyRequest),
      onSuccess: (payload) => {
        setRequestInfo(payload)
      }
    }
  })

  const onShowSizeChange = (current, pageSize) => {
    setCurrentPage(current)
    setPageSize(pageSize)
  }

  return (
    <div className='flex'>
      <Input disabled {...restProps} value={valueToShowHelpInCapture} />
      <OrderedListOutlined onClick={onClickHelpInCapture} className='px-2 border-0' />
      <Drawer
        title={titleDrawer}
        onClose={onClickHelpInCapture}
        open={openDrawer}
        loading={drawerRequest.isLoading}
      >
        <SearchBar externalOnChange={(wordToSearch) => setWordToSearch(wordToSearch)} value={wordToSearch} />
        <CustomTable
          columnsToRender={columnsToRender}
          infoTableToRender={{
            catalogData
          }}
          keyToRenderTable={keyToRenderTable}
          tableProps={{
            rowSelection,
            loading: drawerRequest.isLoading,
            pagination: { total: totalRecords, showTotal: total => `Total ${total} registros`, onChange: onShowSizeChange, current: currentPage, pageSize }
          }}
        />
        <div className='mt-4 flex justify-end'>
          <Button className='mr-2' type='primary' onClick={onCloseAccept}>Aceptar</Button>
          <Button onClick={onClickHelpInCapture}>Cancelar</Button>
        </div>
      </Drawer>
    </div>
  )
}

export default HelpInCapture
