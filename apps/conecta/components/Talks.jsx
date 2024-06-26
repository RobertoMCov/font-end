"use client"
import { Button, Col, Image, Row, Grid, Flex, Drawer } from 'antd'
import React, { useState } from 'react'

const { useBreakpoint } = Grid

const Talks = () => {
    const { md } = useBreakpoint()
    const [openTalks, setopenTalks] = useState(false)

    return (
        <>
            <div className='mt-5 p-3'>
                <p className={`${!md ? 'text-3xl' : 'text-5xl'} text-center font-medium mb-5`}>Pláticas Informativas</p>
                <Row gutter={10}>
                    <Col span={!md ? 12 : 9}>
                        <p className='text-3xl text-[#DB71A2] font-medium'>Cancer de Mama</p>
                        <p className={`${md && 'text-xl'} text-justify `}>Con el objetivo de contribuir a la detección oportuna del cáncer de mama en la población femenina la brigada universitaria región Veracruz acudió al Centro de Distribución de la empresa Chedraui en la ciudad de Veracruz a impartir una plática informativa.</p>
                        <Button onClick={() => { setopenTalks(true) }} className='bg-[#DB71A2] text-white text-center mt-5'>Agendar</Button>
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
            <Drawer title="Platicas Informativas" onClose={() => setopenTalks(false)} open={openTalks}>
                <p>Las pláticas informativas sobre el cáncer son una herramienta valiosa para educar a la población sobre esta enfermedad, con el objetivo de:
                    <br></br>
                    <span className='text-lg'>Aumentar el conocimiento:</span><br></br>

                    Brindar información precisa y actualizada sobre los diferentes tipos de cáncer, sus causas, factores de riesgo, síntomas, diagnóstico, tratamiento y opciones de cuidado paliativo.
                    Desmitificar ideas erróneas y creencias falsas sobre el cáncer.<br></br>
                    <span className='text-lg'>
                        Promover la detección temprana:
                    </span><br></br>

                    Enfatizar la importancia de la detección temprana para mejorar las probabilidades de un tratamiento exitoso.
                    Informar sobre las pruebas de detección disponibles para diferentes tipos de cáncer, como la mamografía, la citología cervical y la colonoscopia.
                    Motivar a las personas a realizarse las pruebas de detección según las recomendaciones para su edad y grupo de riesgo.
                    <br></br><span className='text-lg'>
                        Fomentar estilos de vida saludables:
                    </span><br></br>

                    Crear conciencia sobre los factores de riesgo del cáncer que se pueden modificar, como el tabaquismo, el consumo excesivo de alcohol, la dieta poco saludable y la falta de actividad física.
                    Educar sobre la importancia de adoptar hábitos saludables como una alimentación balanceada, ejercicio regular, mantener un peso adecuado y evitar el consumo de tabaco y alcohol en exceso para reducir el riesgo de cáncer.</p>

            </Drawer>
        </>
    )
}

export default Talks