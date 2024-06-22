import React from 'react'
import objInput from './InputsForm'
import { Form } from 'antd'

const BuildForm = ({ arrayData, setFileList = () => { }, fileList = [], form = {}, initialValues = {}, onHandleOnRow }) => {
  const list = arrayData.map((input) => {
    const {
      name = '',
      columnFormType = 'InputForm',
      label = '',
      hidden = false,
      charactersMin = null,
      charactersMax = null,
      titleForm = '',
      isRequired = false,
      isDisabled = false,
      arraySelect = [],
      optionName = '',
      optionValue = '',
      prefix = null,
      suffix = null,
      classInput = 'col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-3',
      ...restData
    } = input

    const inputsToAddInitialValues = ['HelpInCapture']

    let rules = []
    const customProperties = {
      CustomDatePicker: {
        allowClear: true
      },
      CustomTimePicker: {
        format: 'HH:mm'
      }
    }

    const InputOption = objInput[columnFormType] || null
    const additionalProperties = customProperties[columnFormType] || {}

    if (columnFormType === 'CustomSelectForm') {
      restData.arraySelect = arraySelect
      restData.optionName = optionName
      restData.optionValue = optionValue
    }

    if (columnFormType === 'CustomFile') {
      restData.setFileList = setFileList
      restData.fileList = fileList
    }

    if (columnFormType === 'DividerTitle') restData.titleForm = titleForm

    restData.prefix = restData.prefix ? <span /> : prefix
    restData.suffix = restData.suffix ? <span /> : suffix

    if (isRequired) {
      rules = [
        ...rules,
        {
          required: true,
          message: `${label} es requerido`
        }
      ]
    }

    if (charactersMin !== null && charactersMax !== null) {
      rules = [
        ...rules,
        {
          min: charactersMin,
          max: charactersMax,
          message: `${label} mínimo de ${charactersMin} y máximo de ${charactersMax}`
        }
      ]
    } else if (charactersMin !== null) {
      rules = [
        ...rules,
        {
          min: charactersMin,
          message: `${label} mínimo de ${charactersMin} characters`
        }
      ]
    }

    if (charactersMax !== null) {
      rules = [
        ...rules,
        {
          max: charactersMax,
          params: [charactersMax, `${label} máximo de ${charactersMax} characters`]
        }
      ]
    }

    if (isDisabled) restData.disabled = isDisabled

    if (inputsToAddInitialValues.includes(columnFormType)) {
      additionalProperties.initialValues = initialValues
      additionalProperties.onHandleOnRow = onHandleOnRow
    }

    const inputToRender = columnFormType !== 'DividerTitle'
      ? (
        <Form.Item
          rules={rules} label={label} hidden={hidden} name={name}
        >
          <InputOption className='w-full' size='small' aria-describedby={label} name={name} form={form} {...restData} {...additionalProperties} />
        </Form.Item>
        )
      : <InputOption className='w-full' size='small' {...restData} />

    return (
      <div key={name} className={classInput}>
        {inputToRender}
      </div>
    )
  })

  return <>{list.length ? list : null}</>
}

export default BuildForm
