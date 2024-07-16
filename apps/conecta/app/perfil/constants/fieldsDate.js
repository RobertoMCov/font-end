export default [
  {
    name: 'folio',
    label: 'Número de folio',
    placeholder: 'Número de folio (9 digitos)',
    isRequired: true,
    classInput: 'col-span-12',
    size: 'middle',
    maxLength: '9',
    disabled: true,
    hidden: true
  },
  {
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
  },
  {
    name: 'tipoCita',
    columnFormType: 'CustomSelectForm',
    label: 'Tipo de cita',
    isRequired: true,
    classInput: 'col-span-12',
    size: 'middle',
    placeholder: 'Selecciona un tipo de cita',
    arraySelect: [
      {
        name: 'Cita médica',
        value: 'Cita médica'
      },
      {
        name: 'Instalación/Limpieza de catéter',
        value: 'Instalación/Limpieza catéter'
      },
      {
        name: 'Especialidades',
        value: 'especialidades'
      },
      {
        name: 'Estudios',
        value: 'estudios'
      },
      {
        name: 'Pláticas',
        value: 'platicas'
      },
      {
        name: 'Sesiones',
        value: 'sesiones'
      },
      {
        name: 'Entrega de medicamentos/vacunas',
        value: 'Entrega de medicamentos/vacunas'
      },
    ],
    optionValue: 'value',
    optionName: 'name'
  }
]
