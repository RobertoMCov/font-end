import React from 'react'
import { BackgroundContainer } from '../containers'
import { Image } from 'antd'
import businessImage from '../publicImages/img/covalu-icon.png'

const Custom404Error = () => {
  return (
    <BackgroundContainer>
      <div>
        <p className='text-center text-5xl text-white'>
          Oops! Página no encontrada
        </p>
        <div className='flex justify-center items-center mt-8'>
          <p className='text-white text-9xl'>4</p>
          <Image
            width={140}
            height={140}
            alt='Página no encontrada'
            src={businessImage.src}
            preview={false}
          />
          <p className='text-white text-9xl'>4</p>
        </div>
      </div>
    </BackgroundContainer>
  )
}

export default Custom404Error
