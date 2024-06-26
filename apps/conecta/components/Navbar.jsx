"use client"
import { FaTree } from "react-icons/fa";
import React, { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { Drawer, Flex, Modal, Button, Grid, Image } from "antd";
import Link from "next/link";
import { FormContainer } from "@repo/ui/containers";
import { FaWhatsapp } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import Icons from "./Icons";

const { useBreakpoint } = Grid

const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false)
    const [openLogin, setOpenLogin] = useState(false)
    const [openRegister, setOpenRegister] = useState(false)
    const { lg } = useBreakpoint()

    return (
        <>
            <div className="bg-[#6b5594] lg:bg-white py-4 px-6 flex justify-between items-center">
                <GiHamburgerMenu className='text-white text-3xl lg:hidden' onClick={setOpenMenu} />
                <Image preview={false} width={50} src='./img/logo.png'/>
                {lg && <div></div>}
                {lg && <>
                    <Flex gap={30}>
                        <Flex gap={10} align='center'>
                            <TfiEmail size={20} />
                            <div>
                                <p className="font-semibold">Correo Electronico</p>
                                <p>Saludconecta@gmail.com</p>
                            </div>
                        </Flex>
                        <Flex gap={10} align='center'>
                            <FaWhatsapp size={25} />
                            <div>
                                <p className="font-semibold">WhatsApp</p>
                                <p>(+52) 5631403719 </p>
                            </div>
                        </Flex>
                    </Flex>
                    <div className="hidden lg:block">
                        <Button size="large" onClick={setOpenLogin} className="bg-[#DB71A2] text-white">Alta Paciente</Button>
                    </div>
                </>
                }
            </div>
            <div className="hidden lg:flex bg-[#6b5594] justify-between items-center py-4 px-6 gap-4">
                <div className="flex gap-10 text-lg">
                    <Link className="text-white " href={'/'}>Inicio</Link>
                    <Link className="text-white " href={'/'}>Especialidades</Link>
                    <Link className="text-white " href={'/'}>Estudios</Link>
                    <Link className="text-white " href={'/'}>Platicas</Link>
                    <Link className="text-white " href={'/'}>Medicamentos</Link>
                </div>
                <Icons />
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
        </>
    )
}

export default Navbar