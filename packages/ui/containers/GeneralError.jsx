import React from 'react'
import { BackgroundContainer } from '.'

const GeneralError = () => {
  return (
    <BackgroundContainer>
      <div>
        <p className='text-center text-white text-5xl'>
          Error Interno de Servidor
        </p>
        <div className='flex justify-center mt-8'>
          <p className='text-white text-9xl'> 5 </p>
          <p className='text-white text-9xl'> 0 </p>
          <p className='text-white text-9xl'> 0 </p>
        </div>
      </div>
    </BackgroundContainer>
  )
}

export default GeneralError
