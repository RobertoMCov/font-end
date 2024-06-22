'use client'

import React, { useState } from 'react'
import { ColorPicker } from 'antd'

const CustomColorPicker = (props = {}) => {
  const [open, setOpen] = useState(false)
  const { name = '', form = {}, ...restProps } = props

  const changeColor = (_, newHexColor) => {
    form.setFieldsValue({
      [name]: newHexColor
    })
  }

  return (
    <ColorPicker
      open={open}
      onOpenChange={setOpen}
      showText={(color) => <span>({color.toHexString()})</span>}
      {...restProps}
      onChange={changeColor}
    />
  )
}

export default CustomColorPicker
