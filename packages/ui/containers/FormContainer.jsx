'use client'

import React from 'react'
import { Form, Button } from 'antd'
import BuildForm from '../BuildForm'

const FormContainer = (props) => {
  const {
    onHandleOnRow = () => { },
    formProps = {},
    nameForm = '',
    arrayData = [],
    titleButton = '',
    onSubmit,
    topComponent = null,
    bottomComponent = null,
    isLoadingButton = false,
    form,
    buttonStyle = '',
    classContainerInputs = 'grid grid-cols-12 gap-4'
  } = props
  const { initialValues = {} } = formProps

  const inputsToRender = props.children || <BuildForm arrayData={arrayData} form={form} initialValues={initialValues} onHandleOnRow={onHandleOnRow} />

  const buttonToShow = titleButton
    ? (
      <div className='flex justify-end'>
        <Button type='primary' htmlType='submit' loading={isLoadingButton} className={buttonStyle}>
          {titleButton}
        </Button>
      </div>
      )
    : null

  return (
    <>
      <Form
        name={nameForm}
        form={form}
        layout='vertical'
        onFinish={onSubmit}
        autoComplete='off'
        {...formProps}
      >
        <div className={`mb-4 ${classContainerInputs}`}>
          {inputsToRender}
        </div>
        {topComponent}
        {buttonToShow}
        {bottomComponent}
      </Form>
    </>
  )
}

export default FormContainer
