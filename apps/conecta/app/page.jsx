'use client'
import React, { useState } from 'react'
import { Boxes, HomeView, Talks, Footer, Sessions } from '../components'
import Navbar from '@/components/Navbar'
import { Grid, FloatButton } from 'antd'
import { CaretUpOutlined } from '@ant-design/icons'
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import './styles/main.css'
const { useBreakpoint } = Grid

const Login = () => {
  const { md } = useBreakpoint()
  const [darkMode, setdarkMode] = useState(false)

  return (
    <div className={`${darkMode ? 'darkMode' : ''}`}>
      {!darkMode ? <MdDarkMode onClick={() => { setdarkMode(true) }} className='text-2xl fixed top-0 right-0 mt-2 mr-3 z-40' /> :
        <CiLight onClick={() => { setdarkMode(false) }} className='text-2xl fixed top-0 right-0 text-white mt-2 mr-3 z-40' />
      }
      <Navbar darkMode={darkMode} className={`${darkMode && 'darkMode'}`} />
      <HomeView darkMode={darkMode} className={`${darkMode && 'darkMode'}`} />
      <Boxes darkMode={darkMode} className={`${darkMode && 'darkMode'}`} />
      <Talks className={`${darkMode && 'darkMode'}`} />
      <Sessions darkMode={darkMode} className={`${darkMode && 'darkMode'}`} />
      {md && <Footer className={`${darkMode && 'darkMode'}`} darkMode={darkMode} />}
      <FloatButton.BackTop type='primary' className='bg-red-600' icon={<CaretUpOutlined />} />

    </div>
  )
}

export default Login
