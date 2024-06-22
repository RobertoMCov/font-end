'use client'

import { useEffect, useState, useMemo } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { ModalHelpCapture } from '../../commons'
import buildStringParams from '../fetch/buildStringParam'
import { useGetRequest } from '../fetch/useHookRequest'
import useFiltersData from './useFiltersData'

const resources = { }

// const { useGetRequest, buildStringParams } = useHookRequest

const useFilters = ({ filters = [], title, isClickableRow, autoClose = false, getValueRow }) => {
  const [openModal, setOpenModal] = useState(false)
  const [filterSelected, setFilterSelected] = useState({})
  const [tableValues, setTableValues] = useState([])
  const [catalog, setCatalog] = useState({})
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [selectedRow, setSelectedRow] = useState([])
  const [dataSourceTable, setdataSourceTable] = useState([])
  const [keyWordCatalog, setKeyWordCatalog] = useState({})
  const filtersData = useFiltersData()
  const onSelectRow = (newSelectedRowKeys, recordsSelected) => {
    setSelectedRowKeys(newSelectedRowKeys)
    setSelectedRow(
      recordsSelected.map((item) => ({
        name: item[filterSelected.keyName],
        value: item[filterSelected.keyValue]
      }))
    )
  }

  const paramsCatalogRequest = useMemo(() => {
    let params = filterSelected.takeValues
      ? filterSelected.takeValues?.reduce((acum, item) => {
        if (filtersData.data[item.key]) {
          return {
            ...acum,
            [item.value]: filtersData.data[item.key]
          }
        }
        return {
          ...acum
        }
      }, {})
      : {}

    if (filterSelected.queryParams) {
      params = { ...params, ...filterSelected.queryParams }
    }
    return params
  }, [filterSelected.takeValues, filterSelected.queryParams])
  const reqCatalog = useGetRequest({
    pathUrl: `/catalogo/${catalog?.catalog}${buildStringParams(
      {
        totalRecordsByPage: 80,
        ...catalog?.queryParams,
...paramsCatalogRequest,
...keyWordCatalog
      }
    )}`,
    keyRequest: 'getFilterUser',
    auth: true,
    configGet: {
      enabled: openModal && Boolean(catalog?.catalog)
    }
  })

  const onRow = (record, rowIndex) => {
    return {
      className: 'cursor-pointer',
      onClick: () => {
        const dataRow = {
          ...filterSelected,
          key: filterSelected.keyAliasValue || filterSelected.keyValue,
          alias:
            filterSelected.alias || filterSelected.name || filterSelected.keyValue,
          value: record[filterSelected.keyValue],
          name: record[filterSelected.keyName] || record[filterSelected.keyValue]
        }
        filtersData.handleDataFilters(dataRow)
        getValueRow && getValueRow({ ...record, ...dataRow })
        !autoClose && onHideModal()
      }
    }
  }

  const getValuesSelected = (item) => {
    return (data) => {
      const defaultValue = typeof data === 'object' ? '' : data
      const formatedData = item.formatData ? item.formatData(data) : {}
      if (!data) return
      const content = {
        ...item,
        key: item.keyValue,
        alias: item.alias || item.name || item.keyValue,
        name: data[item.keyName] || data[item.keyValue] || formatedData.value || defaultValue,
        value: data[item.keyValue] || formatedData.value || defaultValue
      }
      filtersData.handleDataFilters(content)
    }
  }

  const handler = (data) => {
    data.handleData({ getValuesSelected })
  }
  const onCallCapture = (item) => {
    item.optionName = item.keyName
    item.optionValue = item.keyValue
    item.handler = handler
    item.onChange = getValuesSelected(item)
    item.onClick = () => {
      clearStateModal()
      const resourceSelected = resources[item.resource] || resources.generic
      setCatalog(resourceSelected)
      setFilterSelected(item)
      item.values && setTableValues(item.values)
      item.columnFormType === 'CustomButton' && onShowModal()
    }
    return item
  }
  const onShowModal = () => setOpenModal(true)

  const clearStateModal = () => {
    setOpenModal(false)
    setSelectedRow([])
    setSelectedRowKeys([])
    setCatalog({})
    setKeyWordCatalog({})
  }
  const onHideModal = () => {
    clearStateModal()
    if (tableValues) setTableValues({})
  }

  const onCloseModal = () => {
    selectedRow.forEach((row) => {
      filtersData.handleDataFilters({
        ...filterSelected,
        key: filterSelected.keyValue,
        alias: filterSelected.alias || filterSelected.name || filterSelected.keyValue,
        value: row.value,
        name: row.name
      })
    })
    onHideModal()
  }

  const filtersApplied = (
    <div className='flex is-jc-between'>
      {filtersData?.dataFilters.map(({ key, alias, values }, indexKey) => (
        <div
          key={`${key}-filters-${indexKey}`}
          className='px-2 py-1 card mr-1'
        >
          <p className='is-capitalized text-xs'>{alias}</p>
          <div className='flex'>
            {values.map(({ value, name }, indexValue) => (
              <span
                key={`${key}-tag-${indexValue}`}
                className='tag is-success is-light mr-1 text-xs'
              >
                {name}
                <CloseOutlined
                  onClick={() => {
                    filtersData.handleDataFilters({
                      key,
                      value,
                      name,
                      remove: true
                    })
                  }}
                />
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )

  useEffect(() => {
    if (tableValues.length) {
      setdataSourceTable(tableValues)
    }
    if (reqCatalog.data?.catalogData) {
      setdataSourceTable(reqCatalog.data?.catalogData)
    }
  }, [tableValues, reqCatalog.data])

  const modalHelpCapture = (
    <>
      <ModalHelpCapture
        title={title}
        open={openModal}
        onCloseModal={onCloseModal}
        onHideModal={onHideModal}
        dataSource={openModal ? dataSourceTable : []}
        columns={catalog?.headers}
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectRow
        }}
        isClickableRow={isClickableRow}
        filtersData={filtersData}
        filterSelected={filterSelected}
        autoClose={autoClose}
        reqCatalog={reqCatalog}
        setKeyWordCatalog={setKeyWordCatalog}
        onRow={onRow}
      />
    </>
  )
  return {
    onCallCapture,
    modalHelpCapture,
    onShowModal,
    onHideModal,
    setCatalog,
    setTableValues,
    filtersApplied,
    filtersData
  }
}

export default useFilters
