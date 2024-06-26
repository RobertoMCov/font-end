"use client"
import React from 'react'
import { Boxes, HomeView, Talks, Footer,Sessions } from '../components'
import { Grid } from 'antd'

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

    </>
  )
}

export default Login
