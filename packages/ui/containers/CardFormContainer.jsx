'use client'

import React from 'react'
import FormContainer from './FormContainer'
import BackgroundContainer from './BackgroundContainer'
import { Typography, Image, Card } from 'antd'
import businessLogo from '../publicImages/img/covalu-logo.jpg'

const { Title } = Typography

const CardFormContainer = (props) => {
  const { title, nameForm = '', businessName = '', ...restProps } = props

  return (
    <BackgroundContainer>
      <Card className='w-full rounded-none sm:w-4/5 sm:rounded-2xl md:w-3/5 lg:w-2/5'>
        <div className='flex justify-between'>
          <Title level={4}>{title}</Title>
          <Image width={100} src={businessLogo.src} preview={false} alt={`Logo de ${businessName}`} />
        </div>
        {nameForm ? <FormContainer nameForm={nameForm} {...restProps} /> : null}
        {props.children}
      </Card>
    </BackgroundContainer>
  )
}

export default CardFormContainer
