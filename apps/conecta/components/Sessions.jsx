import React from 'react'
import { Button, Card, Flex, Grid } from 'antd'
const { Meta } = Card
const { useBreakpoint } = Grid

const Sessions = ({ darkMode = false }) => {
  const { md } = useBreakpoint()

  return (
    <div id='sesiones' className={`${darkMode ? 'background: linear-gradient(90deg, rgba(107,85,148,1) 0%, rgba(0,0,0,1) 32%, rgba(0,0,0,1) 77%, rgba(107,85,148,1) 100%)' : ''}`}>
      <p className={`${!md ? 'text-3xl' : 'text-5xl'} text-center font-medium mb-5`}>Sesiones</p>
      <Flex className={`${darkMode ? 'background: linear-gradient(90deg, rgba(107,85,148,1) 0%, rgba(0,0,0,1) 32%, rgba(0,0,0,1) 77%, rgba(107,85,148,1) 100%)' : ''}`} justify={`${md ? 'space-between' : 'center'}`} align='center' wrap gap={3}>
        <Card
          className={`${darkMode ? 'background: linear-gradient(90deg, rgba(107,85,148,1) 0%, rgba(0,0,0,1) 32%, rgba(0,0,0,1) 77%, rgba(107,85,148,1) 100%)' : ''}`}
          hoverable
          style={{
            width: 270,
            background: `${darkMode ? 'linear-gradient(90deg, rgba(107,85,148,1) 0%, rgba(0,0,0,1) 32%, rgba(0,0,0,1) 77%, rgba(107,85,148,1) 100%)' : 'white'}`,
            color: `${darkMode ? 'white' : 'black'}`
          }}
          cover={<img alt='Quimioterapias' src='https://latina.sharecancersupport.org/wp-content/uploads/2016/07/304F4AB800000578-3405282-Wrapping_the_chemotherapy_drug_paclitaxel_in_containers_made_fro-a-5_1453143750820.jpg' />}
        >
          <Meta style={{ fontSize: '18px' }} title={<span className={`${darkMode ? 'text-white' : 'text-black'} text-2xl`}>Quimioterapias</span>} />
          <p className='text-lg mt-1'>Agenda tu sesión de quimioterapias de las mejor forma</p>
          <Button className='bg-[#DB71A2] text-white text-center mt-5'>Agendar</Button>
        </Card>
        <Card
          hoverable
          style={{
            width: 270,
            background: `${darkMode ? 'linear-gradient(90deg, rgba(107,85,148,1) 0%, rgba(0,0,0,1) 32%, rgba(0,0,0,1) 77%, rgba(107,85,148,1) 100%)' : 'white'}`,
            color: `${darkMode ? 'white' : 'black'}`
          }}
          cover={<img alt='Radiología' src='https://crisa-rx.com/wp-content/uploads/2014/02/radiologia01.jpg' />}
        >
          <Meta style={{ fontSize: '18px' }} title={<span className={`${darkMode ? 'text-white' : 'text-black'} text-2xl`}>Radiología</span>} />
          <p className='text-lg mt-1'>Agenda tu sesión de radiología de las mejor forma</p>
          <Button className='bg-[#DB71A2] text-white text-center mt-5'>Agendar</Button>

        </Card>
        <Card
          hoverable
          style={{
            width: 270,
            background: `${darkMode ? 'linear-gradient(90deg, rgba(107,85,148,1) 0%, rgba(0,0,0,1) 32%, rgba(0,0,0,1) 77%, rgba(107,85,148,1) 100%)' : 'white'}`,
            color: `${darkMode ? 'white' : 'black'}`
          }}
          cover={<img alt='Radioterapia' src='https://hospitalgalenia.com/wp-content/uploads/2024/06/doctor-getting-patient-ready-ct-scan.jpg' />}
        >
          <Meta style={{ fontSize: '18px' }} title={<span className={`${darkMode ? 'text-white' : 'text-black'} text-2xl`}>Radioterapia</span>} />
          <p className='text-lg mt-1'>Agenda tu sesión de radioterapia de las mejor forma</p>
          <Button className='bg-[#DB71A2] text-white text-center mt-5'>Agendar</Button>

        </Card>

      </Flex>
    </div>
  )
}

export default Sessions
