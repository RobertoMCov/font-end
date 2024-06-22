import React from 'react'
import { Flex, Button } from 'antd'

const Login = () => {
  return (
    <>
      <Flex gap='small' wrap='wrap'>
        <Button type='primary'>Primary Button</Button>
        <Button>Default Button</Button>
        <Button type='dashed'>Dashed Button</Button>
        <Button type='text'>Text Button</Button>
        <Button type='link'>Link Button</Button>
      </Flex>
      <div className='p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4'>
        <div className='shrink-0'>
          <img className='h-12 w-12' src='/img/logo.svg' alt='ChitChat Logo' />
        </div>
        <div>
          <div className='text-xl font-medium text-black'>ChitChat</div>
          <p className='text-slate-500'>You have a new message!</p>
        </div>
      </div>
    </>
  )
}

export default Login
