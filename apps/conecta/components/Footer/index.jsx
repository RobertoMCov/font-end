import { Col, Flex, Image, Row } from 'antd'
import React from 'react'
import Icons from '@/components/Icons'
import { FaWhatsapp } from 'react-icons/fa'
import Link from 'next/link'
const Footer = () => {
    return (
        <Row className='bg-[#6B5594] text-white mt-20 p-5'>
            <Col span={6}>
                <Flex align='center' gap={5} vertical>
                    <Image width={60} preview={false} src='./img/logo.png'/>
                    <p>Estamos aquí para su cuidado.El mejor servicio médico para ti y para su familia</p>
                    <Icons />
                </Flex>
            </Col>
            <Col span={6}>
                <p className='text-lg'>Contactanos</p>
                <hr style={{width:'50%'}} className='mt-2' />
                <p>(+52) 5631403719 </p>
                <p>Saludconecta@gmail.com</p>
                <p>Lunes- Viernes: 7 am - 1 p.m 2 p.m - 5 p.m Sábados: 8 a.m -1 pm</p>
            </Col>
            <Col span={6}>
                <p className='text-lg'>Navega</p>
                <hr className='mt-2' style={{width:'50%'}} />
                <div>
                    <div>
                        <Link href=''>Inicio</Link>
                    </div>
                    <div>
                        <Link href=''>Especialidades</Link>
                    </div>
                    <div>
                        <Link href=''>Estudios</Link>
                    </div>
                    <div>
                        <Link href=''>Platicas</Link>
                    </div>
                    <div>
                        <Link href=''>Medicamentos</Link>
                    </div>
                </div>
            </Col>
            <Col span={6}>
                <p className='text-lg'>Agenda tu cita</p>
                <hr style={{width:'50%'}} className='mt-2' />
                <Flex gap={10} align='center'>
                    <FaWhatsapp size={25} />
                    <div>
                        <p className="font-semibold">WhatsApp</p>
                        <p>(+52) 5631403719 </p>
                    </div>
                </Flex>
                <Flex gap={10} align='center'>
                    <FaWhatsapp size={25} />
                    <div>
                        <p className="font-semibold">WhatsApp</p>
                        <p>(+52) 5514983019 </p>
                    </div>
                </Flex>
            </Col>
        </Row>
    )
}
export default Footer