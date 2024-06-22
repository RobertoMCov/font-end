import React from 'react'
import { Select } from 'antd'

const { Option } = Select

const CustomSelectForm = (props) => {
  const {
    arraySelect = [],
    optionName = '',
    optionValue = '',
    ...restProps
  } = props

  return (
    <>
      <Select {...restProps}>
        {arraySelect.map((option) => {
          return (
            <Option key={option[optionValue]} value={option[optionValue]}>
              {option[optionName]}
            </Option>
          )
        })}
      </Select>
    </>
  )
}

export default CustomSelectForm
