'use client'

import React, { useContext } from 'react'
import {
  DoubleRightOutlined,
  DoubleLeftOutlined
} from '@ant-design/icons'
import { Layout, Button, Typography } from 'antd'
import { useLocalStorage } from '@repo/ui/hooks'
import UserInfo from '../commons/CustomMenu/UserInfo'
import { GeneralContext } from '../context/GeneralContext'

const { Content } = Layout
const { Title } = Typography

const HeaderView = ({ actionButton = null, titlePage = '', titleButton = 'Guardar', rightComponent = null, externalClass = '', ...restProps }) => {
  const { storedValue: configApp } = useLocalStorage({ key: 'configApp' })
  const { nombreEmpresa = '' } = configApp
  const { storedValue: userData = {} } = useLocalStorage({ key: 'userData' })
  const expandedMenu = useLocalStorage({ key: 'expandedMenu' })
  const { collapsed = false, setCollapsed = () => { } } = useContext(GeneralContext)
  const { completeName = '' } = userData
  const firstName = completeName.split(' ').slice(0, 1)[0] || ''

  return (
    <Layout className='site-layout'>
      <Content className='py-1'>
        <div className='h-screen overflow-y-auto'>
          <div className='p-1 flex justify-between'>
            <div className='flex justify-center items-center'>
              <Button
                type='primary'
                shape='circle'
                size='small'
                className='mr-2'
                icon={collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
                onClick={() => {
                  setCollapsed(!collapsed)
                  expandedMenu.setValue(!collapsed)
                }}
              />
              <Title className='mr-3 !mb-0' level={3}>{titlePage}</Title>
              {actionButton ? <Button type='primary' shape='round' size='small' onClick={actionButton}>{titleButton}</Button> : null}
              {rightComponent}
            </div>
            <div className='flex justify-between items-center pr-1'>
              <div className='flex items-center bg-white shadow my-1 rounded-3xl'>
                <p className='font-medium px-1 text-xs'>{firstName} | {nombreEmpresa}</p>
                <UserInfo firstName={firstName} />
              </div>
            </div>
          </div>
          <div style={{ height: '90vh', overflowY: 'auto', overflowX: 'hidden' }} className={`${externalClass}`}>
            {restProps.children}
          </div>
        </div>
      </Content>
    </Layout>
  )
}

export default HeaderView
