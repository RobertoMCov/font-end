"use client"
import { FaTree } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import React, { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { Drawer, Flex, Modal, Button, Grid, Image } from "antd";
import { IoMdLogIn } from "react-icons/io";
import Link from "next/link";
import { FormContainer } from "@repo/ui/containers";
import { FaWhatsapp, FaHome, FaBookMedical, FaUser } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import Icons from "./Icons";
import { useHookRequest, useLocalStorage } from "@repo/ui/hooks";
import { useRouter } from 'next/navigation'
import { GiMedicalDrip } from "react-icons/gi";
import { TbMedicineSyrup } from "react-icons/tb";
import { PiUsersFourFill } from "react-icons/pi";
const { useFetchRequest, useGetRequest } = useHookRequest
const { useBreakpoint } = Grid

const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false)
    const [openLogin, setOpenLogin] = useState(false)
    const [openRegister, setOpenRegister] = useState(false)
    const { lg } = useBreakpoint()
    const [userLogged, setUserLogged] = useState('')
    const userInfo = useLocalStorage({ key: 'userData' })
    const { folio } = userInfo.storedValue
    const router = useRouter()

    const login = useGetRequest({
        keyRequest: 'elloginalaverga',
        pathUrl: `/catalogo/conectaUsuarios?addAllColumns=true&fieldsToSearch=folio&folio=${userLogged}`,
        configGet: {
            enabled: !!userLogged,
            onSuccess: ({ catalogData = [] }) => {
                if (catalogData[0]) {
                    console.log('si hay')
                    userInfo.setValue(catalogData[0])
                    setOpenLogin(false)
                    router.push('/perfil')
                }
                console.log('notificacion error')
                setUserLogged('')
            }
        }
    })

    const registerUser = useFetchRequest({
        pathUrl: '/crud-recurso?modelName=ConectaUsuarios',
        mutationEvents: {
            onSuccess: (data) => {
                userInfo.setValue({
                    ...data
                })
                setOpenRegister(false)
                router.push('/perfil')
            }
        }
    })

    const closeSession = () => {
        router.push('/')
        userInfo.setValue({})
    }

    const canSave = (values) => {
        const newValues = {
            ...values,
            'fechaNacimiento': values['fechaNacimiento'].format('DD/MM/YYYY'),
            'inicioTratamiento': values['inicioTratamiento'].format('DD/MM/YYYY'),
        }
        registerUser.mutate({
            ...newValues,
            estatusTratamiento: 'alta',
            tipoUsuario: 'paciente',
        })
    }

    return (
        <>
            <div className="bg-[#6b5594] lg:bg-white">
                <div className="py-4 px-6 flex justify-between items-center container mx-auto">
                    <GiHamburgerMenu className='text-white text-3xl lg:hidden' onClick={setOpenMenu} />
                    <Image preview={false} width={50} src='./img/logo.png' />
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
                            {folio ? <div className="flex items-center gap-2">
                                <button onClick={() => router.push('/perfil')} className="flex items-center gap-2">
                                    <p>Mi Perfil</p>
                                </button>
                                <button onClick={closeSession} className="flex items-center gap-2">
                                    <p>Cerrar sesión</p>
                                    <TbLogout className="text-xl text-red-600" />
                                </button>
                            </div> : <button onClick={setOpenLogin} className="flex items-center gap-2">
                                <p>Iniciar sesión</p>
                                <IoMdLogIn className="text-xl" />
                            </button>}
                        </div>
                    </>
                    }
                </div>
            </div>

            <div className="bg-[#6b5594]">
                <div className="hidden lg:flex justify-between items-center py-4 px-6 gap-4 container mx-auto">
                    <div className="flex gap-13 text-lg">
                        <Link className="text-white " href={'/'}>Inicio</Link>
                        <Link className="text-white " href={'/'}>Especialidades</Link>
                        <Link className="text-white " href={'/'}>Estudios</Link>
                        <Link className="text-white " href={'/'}>Platicas</Link>
                        <Link className="text-white " href={'/'}>Medicamentos</Link>
                    </div>
                    <Icons />
                </div>
            </div>

            <Drawer
                onClose={() => setOpenMenu(false)}
                title='Menu'
                open={openMenu}
                placement='left'
            // width={'40%'}
            >
                <Flex className="text-2xl" vertical gap={20} >
                    <Flex onClick={setOpenLogin} >
                        <IoMdLogIn size={30} />
                        <p>Iniciar sesión</p>
                    </Flex>
                    <Flex onClick={setOpenLogin} className="mb-10">
                        <FaUser size={30} />
                        <p>Perfil</p>
                    </Flex>
                    <Flex align="center " gap={5}>
                        <FaHome size={30} />
                        <Link className="text-black " href={'/'}>Inicio</Link>
                    </Flex>
                    <Flex align="center " gap={5}>
                        <FaBookMedical size={30} />
                        <Link className="text-black " href={'/'}>Especialidades</Link>
                    </Flex>
                    <Flex align="center " gap={5}>
                        <GiMedicalDrip size={30} />
                        <Link className="text-black " href={'/'}>Estudios</Link>
                    </Flex>
                    <Flex align="center " gap={5}>
                        <PiUsersFourFill size={30} />
                        <Link className="text-black " href={'/'}>Platicas</Link>
                    </Flex>
                    <Flex align="center " gap={5}>
                        <TbMedicineSyrup size={30} />
                        <Link className="text-black " href={'/'}>Medicamentos</Link>
                    </Flex>
                </Flex>
            </Drawer>

            <Modal
                title='Inicio de sesión'
                open={openLogin}
                footer={false}
                onCancel={() => { setOpenLogin(false) }}
                width={460}
                destroyOnClose
            >
                <FormContainer
                    onSubmit={(values) => setUserLogged(values.folio)}
                    // form={form}
                    arrayData={[
                        {
                            name: 'folio',
                            label: 'Número de folio',
                            placeholder: 'Número de folio (9 digitos)',
                            isRequired: true,
                            classInput: 'col-span-12',
                            size: 'middle',
                            maxLength: '9'
                        },
                    ]}
                    topComponent={
                        <div className="">
                            <p>¿No estás registrado? <button className="text-[#6b5594]" onClick={() => { setOpenLogin(false); setOpenRegister(true) }}>Registrate</button></p>
                            <Button
                                type='primary'
                                htmlType='submit'
                                className='w-full mt-3'
                                loading={login.isLoading}
                            // onClick={onClickUpdateComponent}
                            >
                                Iniciar sesión
                            </Button>
                        </div>
                    }
                />
            </Modal>

            <Modal
                title='Registro de paciente'
                open={openRegister}
                footer={false}
                onCancel={() => { setOpenRegister(false) }}
                destroyOnClose
                centered
            >
                <FormContainer
                    titleButton='Registrar'
                    buttonStyle='w-full'
                    onSubmit={canSave}
                    isLoadingButton={registerUser.isLoading}
                    formProps={{
                        initialValues: {
                            sexo: 'masculino'
                        }
                    }}
                    arrayData={[
                        {
                            name: 'folio',
                            label: 'Número de folio',
                            placeholder: 'Número de folio (9 digitos)',
                            isRequired: true,
                            classInput: 'col-span-6',
                            size: 'middle',
                            maxLength: '9'
                        },
                        {
                            name: 'nombre',
                            label: 'Nombre (s)',
                            placeholder: 'Nombre (s)',
                            isRequired: true,
                            classInput: 'col-span-6',
                            size: 'middle',
                        },
                        {
                            name: 'apellidoPaterno',
                            label: 'Apellido paterno',
                            placeholder: 'Apellido paterno',
                            isRequired: true,
                            classInput: 'col-span-6',
                            size: 'middle',
                        },
                        {
                            name: 'apellidoMaterno',
                            label: 'Apellido materno',
                            placeholder: 'Apellido materno',
                            classInput: 'col-span-6',
                            size: 'middle',
                        },
                        {
                            name: 'fechaNacimiento',
                            label: 'Fecha de nacimiento',
                            placeholder: 'Fecha de nacimiento',
                            columnFormType: 'CustomDatePicker',
                            classInput: 'col-span-6',
                            size: 'middle',
                            format: 'DD/MM/YYYY',
                            isRequired: true,
                        },
                        {
                            name: 'inicioTratamiento',
                            label: 'Inicio del tratamiento',
                            placeholder: 'Inicio del tratamiento',
                            columnFormType: 'CustomDatePicker',
                            classInput: 'col-span-6',
                            size: 'middle',
                            isRequired: true,
                        },
                        {
                            name: 'estado',
                            label: 'Estado',
                            placeholder: 'Estado',
                            classInput: 'col-span-6',
                            size: 'middle',
                            isRequired: true,
                        },
                        {
                            name: 'municipio',
                            label: 'Alcaldía/Municipio',
                            placeholder: 'Alcaldía/Municipio',
                            classInput: 'col-span-6',
                            size: 'middle',
                            isRequired: true,
                        },
                        {
                            name: 'sexo',
                            label: 'Sexo',
                            placeholder: 'Sexo',
                            columnFormType: 'CustomSegmentedForm',
                            options: [{ label: 'Masculino', value: 'masculino' }, { label: 'Femenino', value: 'femenino' }],
                            classInput: 'col-span-5',
                            size: 'middle',
                            isRequired: true,
                        },
                    ]}
                />
            </Modal>
        </>
    )
}

export default Navbar