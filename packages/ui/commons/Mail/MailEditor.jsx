import FormContainer from '@components/containers/FormContainer'
import { Button, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { useQuill } from 'react-quilljs'
import { inputsFormMail } from './constants/inputsFormMail'
import 'quill/dist/quill.snow.css'

const MailEditor = ({ initialValues = {}, from = '', classContainer = '', styleContainer = {}, onSubmitMail }) => {
  const [form] = Form.useForm()
  const { quill, quillRef } = useQuill()
  const [bodyMail, setBodyMail] = useState('')
  const [bodyMailText, setBodyMailText] = useState('')

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        setBodyMail(quill.root.innerHTML)
        setBodyMailText(quill.getText())
      })
    }
  }, [quill])

  const onSubmitForm = (dataForm) => {
    dataForm.bodyText = bodyMailText
    dataForm.bodyHTML = bodyMail
    onSubmitMail && onSubmitMail(dataForm)
  }

  return (
    <div className={`p-4 ${classContainer}`} style={styleContainer}>
      <p className='mb-3'>De : <span className='font-semibold'>{from}</span></p>
      <FormContainer
        initialValues={initialValues}
        form={form}
        topComponent={<div className='my-2 w-full h-full'><div ref={quillRef} /></div>}
        arrayData={inputsFormMail}
        onSubmit={onSubmitForm}
        bottomComponent={
          <div className='flex justify-between items-center'>
            <Button size='small' onClick={() => form.resetFields()} type='primary' ghost className=''>Limpiar</Button>
            <Button type='primary' size='small' htmlType='submit' className='mt-5'>
              Enviar
            </Button>
          </div>
        }
      />
    </div>
  )
}

export default MailEditor
