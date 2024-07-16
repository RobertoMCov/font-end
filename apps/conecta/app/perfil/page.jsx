'use client'

import { FormContainer } from '@repo/ui/containers'
import { useLocalStorage } from '@repo/ui/hooks'
import { Button, Calendar, Modal, Form, Spin, Badge, Tag, Select, Radio, List } from 'antd'
import React, { useState } from 'react'
import dayjs from 'dayjs'
import fieldsDate from './constants/fieldsDate'
import { useHookRequest, useAppAntD } from '@repo/ui/hooks'
import { useQueryClient } from 'react-query'
import { EditOutlined } from '@ant-design/icons'
import Navbar from '@/components/Navbar'
import { Footer } from '../../components'
const { useGetRequest, useFetchRequest } = useHookRequest

const Perfil = () => {
  const [openAgendar, setOpenAgendar] = useState(false)
  const [fieldsDateForm, setFieldsDateForm] = useState(fieldsDate)
  const [optionsDate, setOptionsDate] = useState({})
  const [historicoCitas, setHistoricoCitas] = useState([])
  const userInfo = useLocalStorage({ key: 'userData' })
  const { folio, nombre, apellidoPaterno, sexo, estatusTratamiento, inicioTratamiento } = userInfo.storedValue
  const [form] = Form.useForm()
  const { notification } = useAppAntD()
  const queryClient = useQueryClient()
  const [dateSelected, setDateSelected] = useState('')
  const [citaSelected, setCitaSelected] = useState()

  const citas = useGetRequest({
    keyRequest: 'lascitasalv',
    pathUrl: `/catalogo/conectaCitas?addAllColumns=true&fieldsToSearch=folio&folio=${folio}`,
    configGet: {
      enabled: !!folio,
      onSuccess: ({ catalogData = [] }) => {
        setHistoricoCitas(catalogData)
      }
    }
  })

  useGetRequest({
    keyRequest: 'opcionesCitas',
    pathUrl: '/gmc/conecta/cita',
    configGet: {
      enabled: openAgendar,
      onSuccess: (data) => {
        setOptionsDate(data)
      }
    }
  })

  const registerDate = useFetchRequest({
    pathUrl: '/crud-recurso?modelName=ConectaCitas',
    mutationEvents: {
      onSuccess: (data) => {
        queryClient.invalidateQueries('lascitasalv')
        notification.success({
          message: `Cita ${data.estatus}`,
          description: `Se ha agendado la cita correctamente para el dia ${dayjs(data.fecha).format('DD/MM')} a las ${data.horario} en ${data.servicio}`
        })
        setOpenAgendar(false)
        form.resetFields()
      }
    }
  })

  const editDate = useFetchRequest({
    pathUrl: '/crud-recurso/actualizar/ConectaCitas',
    mutationEvents: {
      onSuccess: ({ dataUpdate = [] }) => {
        const citaUpdated = dataUpdate[0]
        queryClient.invalidateQueries('lascitasalv')
        notification.success({
          message: `Cita ${citaUpdated.estatus}`,
          description: `Se ha reagendado la cita correctamente para el dia ${dayjs(citaUpdated.fecha).format('DD/MM')} a las ${citaUpdated.horario} en ${citaUpdated.servicio}`
        })
        setCitaSelected()
      }
    }
  })

  const canSave = values => {
    const { servicio, folio, ...restValues } = values
    if (servicio) {
      registerDate.mutate({
        folio,
        servicio: `${restValues.tipoCita} - ${servicio}`,
        fecha: dayjs(restValues.fecha).format('YYYY-MM-DD'),
        horario: dayjs(restValues.horaActual).format('HH:mm'),
        estatus: 'Programada'
      })
    } else {
      registerDate.mutate({
        folio,
        servicio: `${restValues.tipoCita}`,
        fecha: dayjs(restValues.fecha).format('YYYY-MM-DD'),
        horario: dayjs(restValues.horaActual).format('HH:mm'),
        estatus: 'Programada'
      })
    }
  }

  const onValuesChange = (currentValue) => {
    const { tipoCita = '' } = currentValue

    if (tipoCita === 'especialidades' || tipoCita === 'estudios' || tipoCita === 'platicas' || tipoCita === 'sesiones') {
      form.setFieldValue('servicio', '')
      setFieldsDateForm([...fieldsDate, {
        name: 'servicio',
        columnFormType: 'CustomSelectForm',
        label: 'Servicio',
        isRequired: true,
        classInput: 'col-span-12',
        size: 'middle',
        placeholder: 'Selecciona un servicio',
        arraySelect: optionsDate[tipoCita].map((item, index) => {
          return {
            name: `${index + 1}-${item.nombre}`,
            value: item.nombre
          }
        }),
        optionValue: 'value',
        optionName: 'name'
      },
      ])
    }

    if (tipoCita === 'Cita médica' || tipoCita === 'Instalación/Limpieza catéter' || tipoCita === 'Entrega de medicamentos/vacunas') {
      setFieldsDateForm(fieldsDate)
    }
  }

  const getListData = (value) => {
    const listData = historicoCitas.filter(item => item.fecha === dayjs(value).format('YYYY-MM-DD'))
    return listData || []
  }

  const dateCellRender = (value) => {
    const listData = getListData(value);
    const estatus = {
      'Programada': 'success',
      'Cancelada': 'error',
      'Realizada': 'processing'
    }
    return (
      <ul>
        {listData.map((item, index) => (
          <li key={index} className='flex flex-col'>
            <Badge status={estatus[item.estatus]} text={item.servicio} className='capitalize' />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <Navbar />
      <div className='container mx-auto py-4'>
        <Spin tip="Obteniendo citas..." spinning={citas.isLoading}>
          <Calendar
            disabledDate={(currentDay) => {
              if (currentDay.isBefore(dayjs().subtract(0, 'day').format('YYYY-MM-DD'))) {
                return true
              }
              return false
            }}
            onSelect={(date) => {
              setDateSelected(dayjs(date).format('YYYY-MM-DD'))
            }}
            cellRender={(current) => {
              return dateCellRender(current)
            }}
            headerRender={({ value, type, onChange, onTypeChange }) => {
              const start = 0;
              const end = 12;
              const monthOptions = [];
              let current = value.clone();
              const localeData = value.localeData();
              const months = [];
              for (let i = 0; i < 12; i++) {
                current = current.month(i);
                months.push(localeData.monthsShort(current));
              }
              for (let i = start; i < end; i++) {
                monthOptions.push(
                  <Select.Option key={i} value={i} className="capitalize">
                    {months[i]}
                  </Select.Option>,
                );
              }
              const year = value.year();
              const month = value.month();
              const options = [];
              for (let i = year - 10; i < year + 10; i += 1) {
                options.push(
                  <Select.Option key={i} value={i} className="capitalize">
                    {i}
                  </Select.Option>,
                );
              }
              return (
                <div
                  style={{
                    padding: 8,
                  }}
                >
                  <div className="flex justify-between items-center">
                    <p className='font-medium text-2xl text-[#593e8d]'>Agenda de citas</p>
                    <div className="flex gap-2">
                      <Radio.Group
                        onChange={(e) => onTypeChange(e.target.value)}
                        value={type}
                      >
                        <Radio.Button value="month">Mes</Radio.Button>
                        <Radio.Button value="year">Año</Radio.Button>
                      </Radio.Group>
                      <Select
                        dropdownMatchSelectWidth={false}
                        value={month}
                        onChange={(newMonth) => {
                          const now = value.clone().month(newMonth);
                          onChange(now);
                        }}
                      >
                        {monthOptions}
                      </Select>
                      <Button type='primary' onClick={() => setOpenAgendar(true)}>Nueva cita</Button>
                    </div>
                  </div>
                </div>
              );
            }}
          />
        </Spin>

        <Modal
          title='Agendar cita'
          open={openAgendar}
          footer={false}
          onCancel={() => { setOpenAgendar(false); setFieldsDateForm(fieldsDate); form.resetFields() }}
          destroyOnClose
          centered
        >
          <div className="flex justify-between items-center px-4 py-2 border border-gray-100 rounded-md font-medium text-base text-gray-700">
            <div className="">
              <p className='capitalize'>{nombre} {apellidoPaterno} - <Tag color="success" className='capitalize'>{estatusTratamiento}</Tag></p>
              <p className='capitalize'>{folio}</p>
            </div>
            <div className="text-right">
              <p className='capitalize'>{sexo}</p>
              <p className='capitalize'>{inicioTratamiento}</p>
            </div>
          </div>
          <FormContainer
            titleButton='Agendar'
            buttonStyle='w-full'
            onSubmit={canSave}
            form={form}
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

        <Modal
          title={`Citas - ${dateSelected}`}
          open={!!dateSelected}
          footer={false}
          onCancel={() => { setDateSelected(''); }}
          destroyOnClose
          centered
        >
          <List
            itemLayout="horizontal"
            dataSource={getListData(dateSelected)}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={<p className='capitalize'>{item.servicio}</p>}
                  description={<p className='capitalize'>{item.servicio} - {item.fecha} - {item.horario}</p>}
                />
                <Button type={'primary'} icon={<EditOutlined />} shape='circle' onClick={() => setCitaSelected(item)} />
              </List.Item>
            )}
          />

        </Modal>

        <Modal
          title='Reagendar cita'
          open={!!citaSelected}
          footer={false}
          onCancel={() => { setCitaSelected(); }}
          destroyOnClose
          centered
        >
          <div className="flex justify-between items-center px-4 py-2 border border-gray-100 rounded-md font-medium text-base text-gray-700 mb-2">
            <div className="">
              <p className='capitalize'>{nombre} {apellidoPaterno} - <Tag color="success" className='capitalize'>{estatusTratamiento}</Tag></p>
              <p className='capitalize'>{folio}</p>
            </div>
            <div className="text-right">
              <p className='capitalize'>{sexo}</p>
              <p className='capitalize'>{inicioTratamiento}</p>
            </div>
          </div>
          <FormContainer
            titleButton='Reagendar'
            buttonStyle='w-full'
            onSubmit={(values) => {
              editDate.mutate(
                {
                  dataUpdate: [
                    {
                      IdCita: citaSelected.IdCita,
                      fecha: dayjs(values.fecha).format('YYYY-MM-DD'),
                      horario: dayjs(values.horaActual).format('HH:mm'),
                      estatus: 'Programada'
                    }
                  ]
                }
              )
            }}
            arrayData={[{
              name: 'fecha',
              label: 'Fecha de cita',
              placeholder: 'Fecha de cita',
              columnFormType: 'CustomDatePicker',
              classInput: 'col-span-6',
              size: 'middle',
              format: 'DD/MM/YYYY',
              isRequired: true
            },
            {
              name: 'horaActual',
              columnFormType: 'CustomTimePicker',
              label: 'Horario',
              isRequired: true,
              classInput: 'col-span-6',
              size: 'middle',
              use12Hours: true,
              format: 'h:mm a'
            }]}
          />
        </Modal>
      </div>
      <Footer />
    </>
  )
}

export default Perfil
