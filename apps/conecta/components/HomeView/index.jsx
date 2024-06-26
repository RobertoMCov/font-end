"use client"
import { Button, Col, Flex, Image, Row, Grid } from 'antd'
import React from 'react'

const { useBreakpoint } = Grid

const HomeView = () => {
    const { md } = useBreakpoint()

    return (
        <>
            <Row justify={'center'} align={'middle'} className='bg-[#6B5594] h-68'>
                <Col className='p-5 text-center' span={14}>
                    <p className={`${md ? 'text-6xl mb-10' : 'text-2xl'} text-white font-medium text-center`}>SALUD CONECTA</p>
                    <p className={` ${md ? 'text-4xl mb-10' : 'text-xl'}  text-white text-center`}>Instituto Nacional de Cancerología</p>
                    {md && <p className='text-white font-medium text-center'>Sitio web del Instituto Nacional de Cancerología brindando aguilizacion en sus servicios <br></br>Estamos aqui para su cuidado</p>}
                    <Button className='bg-[#DB71A2] text-white mt-5'>Agendar</Button>
                </Col>
                <Col span={10}>
                    <Flex justify='end'>
                        <Image preview={false} width='60%' src='https://i0.wp.com/millenniumpathologylab.com/wp-content/uploads/2022/06/medical-doctor-image.png?w=693&ssl=1' />

                    </Flex>

                </Col>
            </Row>
        </>
    )
}

export default HomeView