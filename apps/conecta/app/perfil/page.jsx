'use client'

import { FormContainer } from '@repo/ui/containers'
import { useLocalStorage } from '@repo/ui/hooks'
import { Button, Calendar, Modal } from 'antd'
import React, { useState } from 'react'
import dayjs from 'dayjs';
import fieldsDate from './constants/fieldsDate'
import optionsDate from './constants/optionsDate'

const Perfil = () => {
    const [openAgendar, setOpenAgendar] = useState(false)
    const [fieldsDateForm, setFieldsDateForm] = useState(fieldsDate)
    const userInfo = useLocalStorage({ key: 'userData' })
    const { folio } = userInfo.storedValue
    // const [value, setValue] = useState(() => dayjs('2024-07-26'));
    // const [value2, setValue2] = useState(() => dayjs('2025-01-25'));

    const canSave = values => {
        console.log(values);
    }

    const onValuesChange = (currentValue, allValues) => {
        // setFormSelected((prevState) => ({ ...prevState, ...allValues }))
        const { tipoCita = '' } = currentValue
        // const { modulo = '' } = allValues

        if (tipoCita) {
            setFieldsDateForm((prev) => {
                return [
                    ...prev,
                    {
                        name: 'tipoCita',
                        columnFormType: 'CustomSelectForm',
                        label: 'Especialidades',
                        isRequired: true,
                        classInput: 'col-span-6',
                        size: 'middle',
                        arraySelect: optionsDate[tipoCita]
                    }
                ]
            })
        }
        // if (idXpCovGMCEmpresaUsuario) {
        //   setDataForm((prevData) => {
        //     prevData[1].arraySelect = allModules[idXpCovGMCEmpresaUsuario]
        //     return prevData
        //   })
        //   setCurrentModule(allModules[idXpCovGMCEmpresaUsuario])
        //   // form.setFieldsValue({
        //   //   modulo: ''
        //   // })
        //   setFormSelected((prevState) => ({ ...prevState, modulo: '' }))
        //   setAllComponents([])
        // }

        // if (modulo) {
        //   setFetchRequestViews((prevData) => ({
        //     ...prevData,
        //     getComponents: true
        //   }))
        // }
    }

    return (
        <div className='container mx-auto py-4'>
            <Button type='primary' onClick={setOpenAgendar}>Nueva cita</Button>
            <Calendar
                disabledDate={(currentDay) => {
                    if (currentDay.isBefore(dayjs())) {
                        return true
                    }
                    return false
                }}
                onSelect={(date, info) => {
                    console.log(date, info);
                }}
            // headerRender={()=><p>dasd</p>}
            // validRange={[value, value2]}
            // value={value}
            />

            <Modal
                title='Agendar cita'
                open={openAgendar}
                footer={false}
                onCancel={() => { setOpenAgendar(false) }}
                destroyOnClose
                centered
            >
                <FormContainer
                    titleButton='Agendar'
                    buttonStyle='w-full'
                    onSubmit={canSave}
                    // isLoadingButton={registerUser.isLoading}
                    formProps={{
                        onValuesChange,
                        initialValues: {
                            folio
                        }
                    }}
                    arrayData={fieldsDateForm}
                />
            </Modal>
        </div>
    )
}

export default Perfil
