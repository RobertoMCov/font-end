'use client'

import React, { useState } from 'react'
import { Drawer } from 'antd'

const NewVisit = ({ children, title = 'Detalle', ...props }) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState()

  const onVisibleDrawer = () => {
    setIsOpenDrawer(!isOpenDrawer)
  }
  const drawer = (
    <div>
      <Drawer
        title={title}
        placement='right'
        onClose={onVisibleDrawer}
        open={isOpenDrawer}
        size='large'
        {...props}
      >
        {children}
      </Drawer>
    </div>
  )

  return { drawer, onVisibleDrawer, isOpenDrawer }
}

export default NewVisit
