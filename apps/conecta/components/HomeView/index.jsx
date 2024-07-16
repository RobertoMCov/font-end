'use client'
import { Button, Col, Flex, Image, Row, Grid, notification } from 'antd'
import React from 'react'

const { useBreakpoint } = Grid

const HomeView = ({ darkMode = false }) => {
    const { md } = useBreakpoint()
    const [api, contextHolder] = notification.useNotification()

    const finishForm = (text) => {
        api.warning({
            message: text
        })
    }
    return (
        <>
            {contextHolder}
            <Row justify='center' align='middle' className={`${darkMode ? ' background: linear-gradient(90deg, rgba(107,85,148,1) 0%, rgba(0,0,0,1) 32%, rgba(0,0,0,1) 77%, rgba(107,85,148,1) 100%) text-white' : 'bg-[#6B5594]'}  h-68 `}>
                <Col className='p-5 text-center' span={14}>
                    <p className={`${md ? 'text-6xl mb-10' : 'text-3xl'} text-white font-medium text-center`}>SALUD CONECTA</p>
                    <p className={` ${md ? 'text-4xl mb-10' : 'text-xl'}  text-white text-center`}>Instituto Nacional de Cancerología</p>
                    {md && <p className='text-white font-medium text-center'>Sitio web del Instituto Nacional de Cancerología brindando aguilización en sus servicios <br />Estamos aquí para su cuidado</p>}
                    <Button onClick={() => { finishForm('Debes iniciar sesión para poder agendar una cita') }} className='bg-[#DB71A2] text-white mt-5'>Agendar</Button>
                </Col>
                <Col span={10}>
                    <Flex justify='end'>
                        <Image preview={false} width={md ? '100%' : '100%'} src='https://png.pngtree.com/png-clipart/20230918/ourmid/pngtree-photo-men-doctor-physician-chest-smiling-png-image_10132895.png' />

                    </Flex>

                </Col>
            </Row>
        </>
    )
}

export default HomeView
