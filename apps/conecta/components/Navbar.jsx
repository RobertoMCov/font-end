"use client"
import { MenuFoldOutlined } from '@ant-design/icons'
import { FormContainer } from '@repo/ui/containers'
import { Button, Flex, Image, Form, Modal, Grid, Row, Col } from 'antd'
import registerForm from '@/constants/NavBar/registerForm'
import React, { useState } from 'react'
const { useBreakpoint } = Grid

const Navbar = () => {
    const [form] = Form.useForm()
    const [openModal, setopenModal] = useState(false)
    const { md } = useBreakpoint()

    const handleRegister = () => {
        setopenModal(false)
    }
    return (
        <>
            {!md ? <Flex align='center' className=' border-slate-600 bg-slate-300 py-1.5' justify='space-between'>
                <Button size='large' type='link' className='text-red-500' icon={<MenuFoldOutlined />}></Button>
                <Image width={40} src='https://i.pinimg.com/originals/2d/db/d0/2ddbd0d41fbb0526cfba8c5373b00ae7.png' />
                <Button size='small' onClick={() => { setopenModal(true) }} type='primary'>Alta Paciente</Button>
            </Flex> :
            <>

                <Row>
                    <Col span={6}>
                        <Image width={70} src='https://i.pinimg.com/originals/2d/db/d0/2ddbd0d41fbb0526cfba8c5373b00ae7.png' />
                    </Col>
                    <Col span={7}>
                        <Flex align='center'>
                            <Image width={10} src='https://images.vexels.com/media/users/3/130187/isolated/preview/5e8d2205ecc8cde3235581fc5ecfa430-icono-de-contorno-de-correo-electronico.png' />
                            <div>
                                <p>Correo Electronico</p>
                                <p>Saludconecta@gmail.com</p>
                            </div>
                        </Flex>
                    </Col>
                    <Col span={7}>
                        <Flex align='center'>
                            <Image width={10} src='https://images.vexels.com/media/users/3/130187/isolated/preview/5e8d2205ecc8cde3235581fc5ecfa430-icono-de-contorno-de-correo-electronico.png' />
                            <div>
                                <p>WhatsApp</p>
                                <p>(+52) 5631403719 </p>
                            </div>
                        </Flex>
                    </Col>
                    <Col className='flex justify-end' span={4}>
                        <Button type='primary'>Alta Paciente</Button>
                    </Col>
                </Row>
                <Flex gap={20} className='text-base'>
                    <p>Inicio</p>
                    <p>Especialidades</p>
                    <p>Estudios</p>
                    <p>Platicas</p>
                    <p>Medicamentos</p>
                </Flex>
                </>}

            <Modal title='Alta Paciente' open={openModal} footer={false} onCancel={() => { setopenModal(false) }}>
                <p className="text-center text-black text-base mt-4">Ingresa datos del paciente</p>
                <Flex>
                    <FormContainer
                        onSubmit={handleRegister}
                        titleButton='Registrar'
                        form={form}
                        arrayData={registerForm({})}
                    />
                </Flex>
            </Modal>
        </>
    )
}

export default Navbar