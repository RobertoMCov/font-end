'use client'

import React, { useState } from 'react'
import { Upload, Image } from 'antd'

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

const CustomFile = (props) => {
  const { name = '', form = {}, title = '+ Agregar', ...restProps } = props
  const [fileList, setFileList] = useState([])
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')

  const onChangeFileList = (currentFile) => {
    const filesToUpload = currentFile.fileList

    setFileList(filesToUpload)
    form.setFieldsValue({
      [name]: filesToUpload
    })
  }

  const onPreview = async (file) => {
    const { type = '' } = file

    if (type.includes('image')) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      setPreviewImage(file.url || file.preview)
      setPreviewOpen(true)
    }
  }

  return (
    <>

      <Upload
        listType='picture-card'
        onPreview={onPreview}
        {...restProps}
        onChange={onChangeFileList}
        fileList={fileList}
      >
        {title}
      </Upload>
      <Image
        wrapperStyle={{
          display: 'none'
        }}
        preview={{
          visible: previewOpen,
          onVisibleChange: (visible) => setPreviewOpen(visible),
          afterOpenChange: (visible) => !visible && setPreviewImage('')
        }}
        src={previewImage}
      />
    </>
  )
}

export default CustomFile
