'use client'
import { TbLogout, TbMedicineSyrup } from 'react-icons/tb'
import React, { useState, useRef } from 'react'
import { GiHamburgerMenu, GiMedicalDrip } from 'react-icons/gi'
import { Drawer, Flex, Modal, Button, Grid, Image, Tour } from 'antd'
import Link from 'next/link'
import { FormContainer } from '@repo/ui/containers'
import Icons from './Icons'
import { useHookRequest, useLocalStorage } from '@repo/ui/hooks'

import { TfiEmail } from 'react-icons/tfi'
import { FaWhatsapp, FaHome, FaBookMedical, FaUser } from 'react-icons/fa'
import { IoMdLogIn } from 'react-icons/io'
import { useRouter } from 'next/navigation'
import { LuHelpingHand } from "react-icons/lu";

import { PiUsersFourFill } from 'react-icons/pi'
const { useFetchRequest, useGetRequest } = useHookRequest
const { useBreakpoint } = Grid

const Navbar = ({ darkMode = false }) => {
  const [openMenu, setOpenMenu] = useState(false)
  const [openLogin, setOpenLogin] = useState(false)
  const [openRegister, setOpenRegister] = useState(false)
  const { lg } = useBreakpoint()
  const [userLogged, setUserLogged] = useState('')
  const userInfo = useLocalStorage({ key: 'userData' })
  const { folio } = userInfo.storedValue
  const router = useRouter()
  /// /////////////////
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const ref3 = useRef(null)
  const ref4 = useRef(null)
  const ref5 = useRef(null)
  const ref6 = useRef(null)
  const ref7 = useRef(null)
  const [open, setOpen] = useState(false)

  const steps = [
    {
      title: 'Iniciar sesión',
      description: 'Iniciar sesión para acceder a tu perfil y agendar o ver tu citas',
      target: () => ref1.current,
      nextText: 'Siguiente',
    },
    {
      title: 'Especialidades',
      description: 'Navega atraves de las diferentes especialidades y agenda tu cita',
      target: () => ref2.current,
      
    },
    {
      title: 'Estudios',
      description: 'Agenda el estudio que deseas realizarte',
      target: () => ref3.current
    },
    {
      title: 'Platicas',
      description: 'Revisa que platicas se encuentran disponibles y agenda la tuya',
      target: () => ref4.current
    },
    {
      title: 'Medicamentos',
      description: 'Revisa las fechas disponibles para la entrega de tus medicamentos',
      target: () => ref5.current
    },
    {
      title: 'Sesiones',
      description: 'Revisa que tipo de sesión deseas agendar',
      target: () => ref6.current
    },
    {
      title: 'Redes Sociales',
      description: 'Revisa nuestras redes sociales para avisos importantes',
      target: () => ref7.current
    },
  ]
  /// ////////////

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
      fechaNacimiento: values.fechaNacimiento.format('DD/MM/YYYY'),
      inicioTratamiento: values.inicioTratamiento.format('DD/MM/YYYY')
    }
    registerUser.mutate({
      ...newValues,
      estatusTratamiento: 'alta',
      tipoUsuario: 'paciente'
    })
  }

  return (
    <>
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
      <div className={`${darkMode ? ' background: linear-gradient(90deg, rgba(107,85,148,1) 0%, rgba(0,0,0,1) 32%, rgba(0,0,0,1) 77%, rgba(107,85,148,1) 100%) text-white' : 'lg:bg-white bg-white'}  `}>
        <div className='py-4 px-6 flex justify-between items-center container mx-auto'>
          <GiHamburgerMenu className='text-black text-3xl lg:hidden' onClick={setOpenMenu} />
          <Image preview={false} width={50} src='./img/logo.png' />
          {lg && <div />}
          {lg && <>
            <Flex gap={30}>
              <Flex gap={10} align='center'>
                <TfiEmail size={20} />
                <div>
                  <p className='font-semibold'>Correo Electronico</p>
                  <p>institutoNacionalC@gmail.com</p>
                </div>
              </Flex>
              <Flex gap={10} align='center'>
                <FaWhatsapp size={25} />
                <div>
                  <p className='font-semibold'>WhatsApp</p>
                  <p>(+52) 5631403719 </p>
                </div>
              </Flex>
            </Flex>
            <div className='hidden lg:block'>
              {folio
                ? <div className='flex items-center gap-2'>
                  <button onClick={() => router.push('/perfil')} className='flex items-center gap-2'>
                    <p>Mi Perfil</p>
                  </button>
                  <button onClick={closeSession} className='flex items-center gap-2'>
                    <p>Cerrar sesión</p>
                    <TbLogout className='text-xl text-red-600' />
                  </button>
                </div>
                : <button ref={ref1} onClick={setOpenLogin} className='flex items-center gap-2'>
                  <p>Iniciar sesión</p>
                  <IoMdLogIn className='text-xl' />
                </button>}
              <button onClick={() => setOpen(true)} className='flex items-center gap-2'>
                <p>Tutorial</p>
                <LuHelpingHand className='text-xl' />
              </button>
            </div>
          </>}
        </div>
      </div>

      <div className={`${darkMode ? ' background: linear-gradient(90deg, rgba(107,85,148,1) 0%, rgba(0,0,0,1) 32%, rgba(0,0,0,1) 77%, rgba(107,85,148,1) 100%)' : ' bg-[#6b5594]'}`}>
        <div className='hidden lg:flex justify-between items-center py-4 px-6 gap-4 container mx-auto'>
          <div className='flex gap-12 text-lg'>
            <Link className='text-white ' href='/#'>Inicio</Link>
            <Link ref={ref2} className='text-white ' href='/#especialidades'>Especialidades</Link>
            <Link ref={ref3} className='text-white ' href='/#estudios'>Estudios</Link>
            <Link ref={ref4} className='text-white ' href='/#platicas'>Platicas</Link>
            <Link ref={ref5} className='text-white ' href='/#entregas'>Medicamentos</Link>
            <Link ref={ref6} className='text-white ' href='/#sesiones'>Sesiones</Link>
          </div>
          <div ref={ref7}>
            <Icons />
          </div>
        </div>
      </div>

      <Drawer
        onClose={() => setOpenMenu(false)}
        title={<p className='text-white'>MENU</p>}
        open={openMenu}
        placement='left'
        style={{ backgroundColor: 'white' }}
      >
        <Flex className='text-2xl text-white divide-y  divide-blue-400' vertical gap={20}>
          <Flex onClick={setOpenLogin}>
            <IoMdLogIn className='text-[#6b5594]' size={30} />
            <p className='text-black '>Iniciar sesión</p>
          </Flex>
          <Flex className=''>
            <FaUser className='text-[#6b5594]' size={30} />
            <Link className='text-black ' href='/'>Perfil</Link>
          </Flex>
          <Flex align='center ' gap={5}>
            <FaHome className='text-[#6b5594]' size={30} />
            <Link className='text-black ' href='/'>Inicio</Link>
          </Flex>
          <Flex align='center' gap={5}>
            <FaBookMedical className='text-[#6b5594]' size={28} />
            <Link className='text-black ' href='/#especialidades'>Especialidades</Link>
          </Flex>
          <Flex align='center ' gap={5}>
            <GiMedicalDrip className='text-[#6b5594]' size={30} />
            <Link className='text-black ' href='/#estudios'>Estudios</Link>
          </Flex>
          <Flex align='center ' gap={5}>
            <PiUsersFourFill className='text-[#6b5594]' size={30} />
            <Link className='text-black ' href='/#platicas'>Platicas</Link>
          </Flex>
          <Flex align='center ' gap={5}>
            <TbMedicineSyrup className='text-[#6b5594] ' size={30} />
            <Link onClick={() => { setOpenMenu(false) }} className='text-black ' href='/#sesiones'>Medicamentos</Link>
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
              maxLength: '9',
              charactersMin: 9
            }
          ]}
          topComponent={
            <div className=''>
              <p>¿No estás registrado? <button className='text-[#6b5594]' onClick={() => { setOpenLogin(false); setOpenRegister(true) }}>Registrate</button></p>
              <Button
                type='primary'
                htmlType='submit'
                className='w-full mt-3'
                loading={login.isLoading}
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
              maxLength: '9',
              charactersMin: 9
            },
            {
              name: 'nombre',
              label: 'Nombre (s)',
              placeholder: 'Nombre (s)',
              isRequired: true,
              classInput: 'col-span-6',
              size: 'middle'
            },
            {
              name: 'apellidoPaterno',
              label: 'Apellido paterno',
              placeholder: 'Apellido paterno',
              isRequired: true,
              classInput: 'col-span-6',
              size: 'middle'
            },
            {
              name: 'apellidoMaterno',
              label: 'Apellido materno',
              placeholder: 'Apellido materno',
              classInput: 'col-span-6',
              size: 'middle'
            },
            {
              name: 'fechaNacimiento',
              label: 'Fecha de nacimiento',
              placeholder: 'Fecha de nacimiento',
              columnFormType: 'CustomDatePicker',
              classInput: 'col-span-6',
              size: 'middle',
              format: 'DD/MM/YYYY',
              isRequired: true
            },
            {
              name: 'inicioTratamiento',
              label: 'Inicio del tratamiento',
              placeholder: 'Inicio del tratamiento',
              columnFormType: 'CustomDatePicker',
              classInput: 'col-span-6',
              size: 'middle',
              isRequired: true
            },
            {
              name: 'estado',
              label: 'Estado',
              placeholder: 'Estado',
              classInput: 'col-span-6',
              size: 'middle',
              isRequired: true
            },
            {
              name: 'municipio',
              label: 'Alcaldía/Municipio',
              placeholder: 'Alcaldía/Municipio',
              classInput: 'col-span-6',
              size: 'middle',
              isRequired: true
            },
            {
              name: 'sexo',
              label: 'Sexo',
              placeholder: 'Sexo',
              columnFormType: 'CustomSegmentedForm',
              options: [{ label: 'Masculino', value: 'masculino' }, { label: 'Femenino', value: 'femenino' }],
              classInput: 'col-span-5',
              size: 'middle',
              isRequired: true
            }
          ]}
        />
      </Modal>
    </>
  )
}

export default Navbar
