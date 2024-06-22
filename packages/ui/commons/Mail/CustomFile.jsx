import React, { useState } from 'react'
import { Form, Upload } from 'antd'

const CustomFile = (props) => {
  const { ariaDescribedBy, rules = [], setFileList = () => { }, fileList, ...restProps } = props
  const [currentFiles, setCurrentFiles] = useState([])
  const onChange = (currentFile) => {
    setCurrentFiles(currentFile.fileList)
    setFileList(currentFile.fileList)
  }

  const onPreview = async (file) => {
    let src = file.url
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }

  return (
    <Form.Item rules={rules} aria-describedby={ariaDescribedBy} {...restProps} className='is-full-width'>
      <Upload
        listType='picture-card'
        fileList={currentFiles}
        onChange={onChange}
        onPreview={onPreview}
      >
        + Agregar
      </Upload>
    </Form.Item>
  )
}

export default CustomFile
