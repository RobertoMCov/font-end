"use client"
import { FaTree } from "react-icons/fa";
import React, { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { Drawer, Modal } from "antd";
import Link from "next/link";
import { FormContainer } from "@repo/ui/containers";

const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false)
    const [openLogin, setOpenLogin] = useState(false)
    const [openRegister, setOpenRegister] = useState(false)

    return (
        <>
            <div className="bg-[#6b5594] lg:bg-white py-4 px-6 flex justify-between items-center">
                <GiHamburgerMenu className='text-white text-3xl lg:hidden' onClick={setOpenMenu} />
                <FaTree />
                <div className="hidden lg:block">
                    redes
                </div>
                <div className="hidden lg:block">
                    <button onClick={setOpenLogin}>openlogin</button>
                </div>
            </div>
            <div className="hidden lg:flex bg-[#6b5594] justify-between items-center py-4 px-6 gap-4">
                <div className="flex gap-6">
                    <Link className="text-white" href={'/'}>Inicio</Link>
                    <Link className="text-white" href={'/'}>Inicio</Link>
                    <Link className="text-white" href={'/'}>Inicio</Link>
                </div>
                <div className="flex gap-4">
                    <p className="text-white">redes</p>
                    <p className="text-white">redes</p>
                </div>
            </div>

            <Drawer
                onClose={() => setOpenMenu(false)}
                open={openMenu}
                placement='left'
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>

            <Modal
                title='Inicio de sesión'
                open={openLogin}
                footer={false}
                onCancel={() => { setOpenLogin(false) }}
            >
                <button onClick={setOpenRegister}>registro</button>
                <p className="text-center text-black text-base mt-4">Ingresa datos del paciente</p>
                {/* <FormContainer
                        onSubmit={handleRegister}
                        titleButton='Registrar'
                        form={form}
                        arrayData={registerForm({})}
                    /> */}
            </Modal>

            <Modal
                title='Registro'
                open={openRegister}
                footer={false}
                onCancel={() => { setOpenRegister(false) }}
            >
                <p className="text-center text-black text-base mt-4">Ingresa datos del paciente</p>
                <FormContainer
                    titleButton='Registrar'
                    buttonStyle='w-full'
                    arrayData={[
                        {
                            name: 'nombre',
                            label: 'Nombre',
                            classInput: 'col-span-6',
                            isRequired: true
                        },
                        {
                            name: 'nombre',
                            label: 'Nombre',
                            classInput: 'col-span-6',
                            isRequired: true
                        }
                    ]}
                />
            </Modal>

            {/* {!md ? <Flex align='center' className=' border-slate-600 bg-slate-300 py-1.5' justify='space-between'>
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
            </Modal> */}
        </>
    )
}

export default Navbar