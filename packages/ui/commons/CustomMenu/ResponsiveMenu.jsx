import React from 'react'
import { Drawer, Layout, Menu } from 'antd'

const { Sider } = Layout

const ResponsiveMenu = ({ chooseOption = () => { }, allOptionsMenu = [], collapsed = false, selectedKeys = [], expandedMenu = {}, setCollapsed = () => { } }) => {
  const menu = (
    <Menu
      className='mt-5 section-scrollbar'
      theme='dark'
      selectedKeys={selectedKeys}
      style={{ overflowY: 'auto', height: '90vh' }}
      mode='inline'
      onClick={chooseOption}
      items={allOptionsMenu.map(({ pathMenu, ...restData }) => restData)}
    />
  )

  return (
    <>
      <Sider
        collapsedWidth='60'
        className='rounded-3xl hidden md:m-3 md:block'
        collapsed={collapsed}
      >
        {menu}
      </Sider>
      <Drawer
        title='Menú'
        onClose={() => {
          setCollapsed(!collapsed)
          expandedMenu.setValue(!collapsed)
        }}
        open={collapsed}
        placement='right'
        width='100vw'
        size='large'
        rootClassName='sm:block md:hidden '
      >
        {menu}
      </Drawer>
    </>
  )
}

export default ResponsiveMenu
