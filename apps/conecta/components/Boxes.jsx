"use client"
import { Carousel, Flex, Image, Modal, Grid, Row, Col } from 'antd'
import React, { useState } from 'react'
import { cardsSpecialties, cardsStudies } from '@/constants/Boxes/cardsBoxes'

const { useBreakpoint } = Grid

const Boxes = () => {
    const [backgroundColor, setBackgroundColor] = useState(cardsSpecialties[0].colorCard);
    const [backgroundColor2, setBackgroundColor2] = useState(cardsStudies[0].colorCard);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    const { md } = useBreakpoint()

    const handleBeforeChange = (from, color) => {
        setBackgroundColor(cardsSpecialties[color].colorCard)
    };
    const handleBeforeChange2 = (from, color) => {
        setBackgroundColor2(cardsStudies[color].colorCard)
    };

    const showModal = (card) => {
        setSelectedCard(card);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedCard(null);
    };

    return (
        <>
            {!md ? <>
                <p className='text-[#79ACE8] text-3xl font-semibold'>Especialidades</p>
                <div style={{ backgroundColor, transition: 'background-color 0.3s ease', padding: '20px' }}>
                    <Carousel beforeChange={handleBeforeChange} arrows autoplay >
                        {cardsSpecialties.map((e, index) => (
                            <section
                                onClick={() => showModal(e)}
                                key={index}
                                className="w-44 h-40 rounded-xl"
                            >
                                <div>
                                    <div className="flex flex-col items-center">
                                        <div className="w-28">
                                            <Image preview={false} src={e.image} />
                                        </div>
                                        <p className="text-center text-white text-2xl">{e.title}</p>
                                    </div>
                                </div>
                            </section>
                        ))}
                    </Carousel>
                </div>
                <p className='text-[#79ACE8] text-3xl font-semibold'>Estudios</p>
                <div style={{ backgroundColor: backgroundColor2, transition: 'background-color 0.3s ease', padding: '20px' }}>
                    <Carousel beforeChange={handleBeforeChange2} arrows autoplay >
                        {cardsStudies.map((e, index) => (
                            <section
                                onClick={() => showModal(e)}
                                key={index}
                                className="w-44 h-40 rounded-xl cursor-pointer"
                            >
                                <div>
                                    <div className="flex flex-col items-center">
                                        <div className="w-28">
                                            <Image preview={false} src={e.image} />
                                        </div>
                                        <p className="text-center text-white text-2xl">{e.title}</p>
                                    </div>
                                </div>
                            </section>
                        ))}
                    </Carousel>
                </div>
            </> : <>
                <p className='text-[#79ACE8] text-5xl font-semibold text-center mb-10'>Especialidades</p>
                <Row justify={'center'} align={'middle'} gutter={[16, 36]} style={{ margin: '0 auto' }}>
                    {cardsSpecialties.map((card, index) => {
                        return (
                            <Col span={5}
                                key={index}
                                onClick={() => showModal(card)}
                                style={{ backgroundColor: card.colorCard }}
                                className={`w-32 h-40 rounded-xl is-clickable cursor-pointer ml-7`}>
                                <div className="flex flex-col items-center">
                                    <div className="w-28">
                                        <Image preview={false} src={card.image} />
                                    </div>
                                    <p className="text-center text-white text-2xl">{card.title}</p>
                                </div>
                            </Col>
                        )
                    })}

                </Row>
                <p className='text-[#79ACE8] text-5xl font-semibold text-center mb-10'>Estudios</p>
                <Row justify={'center'} align={'middle'} gutter={[16, 36]} style={{ margin: '0 auto', padding: '0 20px' }}>
                    {cardsStudies.map((card, index) => {
                        return (
                            <Col span={5}
                                key={index}
                                onClick={() => showModal(card)}
                                style={{ backgroundColor: card.colorCard }}
                                className={`w-32 h-40 rounded-xl is-clickable cursor-pointer ml-8`}>
                                <div className="flex flex-col items-center">
                                    <div className="w-28">
                                        <Image preview={false} src={card.image} />
                                    </div>
                                    <p className="text-center text-white text-2xl">{card.title}</p>
                                </div>
                            </Col>
                        )
                    })}

                </Row>
            </>
            }
            <Modal
                title={selectedCard ? `Estudio de ${selectedCard.title}` : 'Estudios'}
                visible={isModalVisible}
                onOk={() => { console.log('e') }}
                onCancel={handleCancel}
                okText='Agendar'
            >
                {selectedCard && (
                    <div className="flex flex-col items-center">
                        <Image width={100} preview={false} src={selectedCard.image} />
                        <p className="text-justify text-black text-base mt-4">{selectedCard.description}</p>
                    </div>
                )}
            </Modal>
        </>
    );


}

export default Boxes