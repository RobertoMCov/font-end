const { useState, useEffect } = require('react')

const FiltersData = () => {
  const [dataFilters, setDataFilters] = useState([])
  const [data, setData] = useState({})

  const handleData = ({ value, name, dataExists = [], remove, onlyOne }) => {
    onlyOne && (dataExists = [])
    // si se elimina
    if (remove) return dataExists.filter((currentData) => currentData.value !== value)

    // si se quiere agregar
    return dataExists.find((item) => item.value === value)
      ? dataExists
      : [...dataExists, { name, value }]
  }

  const handleDataFilters = ({ key, value, name, alias, remove, onlyOne, ...restParams }) => {
    const handleUpdateData = (beforeData) => {
      const findFilter = (filter) => filter.key === key
      const copyDataFilters = [...beforeData]
      const currentFilter = copyDataFilters.find(findFilter)
      const dataCleaned = handleData({
        value,
        name,
        dataExists: currentFilter?.values,
        remove,
        onlyOne
      })

      const indexFilter = copyDataFilters.findIndex(findFilter)
      if (indexFilter > -1) {
        if (!dataCleaned.length) {
          return copyDataFilters.filter((filter) => filter.key !== key)
        }
        copyDataFilters[indexFilter] = { ...currentFilter, values: dataCleaned }
        return copyDataFilters
      }
      const content = [...copyDataFilters, { ...restParams, key, alias, values: dataCleaned }]

      return content
    }
    setDataFilters(handleUpdateData)
  }

  useEffect(() => {
    const dataToProcess = dataFilters.reduce((finalData, { key, values }) => {
      const value = values.map(({ value }) => value).join('||')
      if (!value) {
        delete finalData[key]
        return finalData
      }
      return { ...finalData, [key]: value }
    }, {})
    setData(() => dataToProcess)
    if (!dataFilters.length) setData({})
  }, [dataFilters])
  return { handleDataFilters, dataFilters, data }
}

module.exports = FiltersData
