import React from 'react'
import { Input } from 'antd'

const InputForm = (props) => {
  const { inputType = '', ...restProps } = props

  const InputComponent = inputType ? Input[inputType] : Input

  return (
    <>
      <InputComponent {...restProps} />
    </>
  )
}

export default InputForm
