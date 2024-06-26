"use client"
import { Button, Col, Image, Row, Grid, Flex } from 'antd'
import React from 'react'

const { useBreakpoint } = Grid

const Talks = () => {
    const { md } = useBreakpoint()

    return (
        <div className='mt-5 p-3'>
            <p className={`${!md ?'text-3xl':'text-5xl'} text-center font-medium mb-5`}>Pláticas Informativas</p>
            <Row gutter={10}>
                <Col span={!md ? 12 : 9}>
                    <p className='text-3xl text-[#DB71A2] font-medium'>Cancer de Mama</p>
                    <p className={`${md && 'text-xl'} text-justify `}>Con el objetivo de contribuir a la detección oportuna del cáncer de mama en la población femenina la brigada universitaria región Veracruz acudió al Centro de Distribución de la empresa Chedraui en la ciudad de Veracruz a impartir una plática informativa.</p>
                    <Button className='bg-[#DB71A2] text-white text-center mt-5'>Agendar</Button>
                </Col>
                <Col span={!md ? 12 : 9}>
                    <Image src='https://upaep.mx/images/accesos/colaboradores/correodeldia/2019/OCT-19/29/Cancer-mama-2019.jpg' />
                </Col>
                {md && <Col span={6}>
                    <Flex vertical gap={20}>
                        <p className='text-3xl font-medium'>Temas</p>
                        <p className='text-2xl text-[#FED204]'>Prevención y reducción del riesgo </p>
                        <p className='text-2xl text-[#37BA9A]'>Conciencia </p>
                        <p className='text-2xl text-[#F5577D]'>Acción y responsabilidad de los gobiernos</p>
                    </Flex>
                </Col>}
            </Row>
        </div>
    )
}

export default Talks