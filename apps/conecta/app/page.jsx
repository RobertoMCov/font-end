'use client'
import React from 'react'
import { Boxes, HomeView, Talks, Footer, Sessions } from '../components'
import { Grid, FloatButton } from 'antd'
import { CaretUpOutlined } from '@ant-design/icons'
const { useBreakpoint } = Grid

const Login = () => {
  const { md } = useBreakpoint()

  return (
    <>
      <HomeView />
      <Boxes />
      <Talks />
      <Sessions />
      {md && <Footer />}
      <FloatButton.BackTop type='primary' className='bg-red-600' icon={<CaretUpOutlined />} />

    </>
  )
}

export default Login
