import React from 'react'
import { Button, Card, Flex,Grid } from 'antd';
const { Meta } = Card;
const { useBreakpoint } = Grid

const Sessions = () => {
    const { md } = useBreakpoint()

    return (
        <>
            <p className={`${!md ?'text-3xl':'text-5xl'} text-center font-medium mb-5`}>Sesiones</p>
            <Flex justify={`${md ? 'space-between':'center'}`} align='center' wrap>
                <Card
                    hoverable
                    style={{
                        width: 270,
                    }}
                    cover={<img alt="Quimioterapias" src="https://latina.sharecancersupport.org/wp-content/uploads/2016/07/304F4AB800000578-3405282-Wrapping_the_chemotherapy_drug_paclitaxel_in_containers_made_fro-a-5_1453143750820.jpg" />}
                >
                    <Meta style={{ fontSize: '18px' }} title={<span className='text-2xl'>Quimioterapias</span>} description="Agenda tu sesión de quimioterapias de las mejor forma" />
                    <Button className='bg-[#DB71A2] text-white text-center mt-5'>Agendar</Button>
                </Card>
                <Card
                    hoverable
                    style={{
                        width: 270,
                    }}
                    cover={<img alt="Radiología" src="https://crisa-rx.com/wp-content/uploads/2014/02/radiologia01.jpg" />}
                >
                    <Meta style={{ fontSize: '18px' }} title={<span className='text-2xl'>Radiología</span>} description="Agenda tu sesión de radiologia de las mejor forma" />
                    <Button className='bg-[#DB71A2] text-white text-center mt-5'>Agendar</Button>

                </Card>
                <Card
                    hoverable
                    style={{
                        width: 270,
                    }}
                    cover={<img alt="Radioterapia" src="https://hospitalgalenia.com/wp-content/uploads/2024/06/doctor-getting-patient-ready-ct-scan.jpg" />}
                >
                    <Meta style={{ fontSize: '18px' }} title={<span className='text-2xl'>Radioterapia</span>} description="Agenda tu sesión de radiologia de las mejor forma" />
                    <Button className='bg-[#DB71A2] text-white text-center mt-5'>Agendar</Button>

                </Card>

            </Flex>
        </>
    )
}

export default Sessions