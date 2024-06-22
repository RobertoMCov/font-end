import React from 'react'
import { Button, Drawer } from 'antd'

const DrawerCustom = ({
  titleDrawer = '',
  openCloseDrawer = () => { },
  visibleDrawer = false,
  titleButton = '',
  iconButton,
  onClickButtonDrawer,
  size = 'large',
  disabledButton = false,
  width = {},
  ...props
}) => {
  return (
    <Drawer
      title={titleDrawer}
      placement='right'
      onClose={openCloseDrawer}
      open={visibleDrawer}
      width={width}
      size='large'
      extra={
        <div>
          {titleButton &&
            <Button
              type='primary'
              icon={iconButton}
              onClick={onClickButtonDrawer}
              disabled={disabledButton}
            >
              {titleButton}
            </Button>}
        </div>
      }
    >
      {props.children}
    </Drawer>
  )
}

export default DrawerCustom
