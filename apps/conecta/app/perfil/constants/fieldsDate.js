export default [
    {
        name: 'folio',
        label: 'Número de folio',
        placeholder: 'Número de folio (9 digitos)',
        isRequired: true,
        classInput: 'col-span-6',
        size: 'middle',
        maxLength: '9',
        disabled: true
    },
    {
        name: 'fecha',
        label: 'Fecha de cita',
        placeholder: 'Fecha de cita',
        columnFormType: 'CustomDatePicker',
        classInput: 'col-span-6',
        size: 'middle',
        format: 'DD/MM/YYYY',
        isRequired: true,
    },
    {
        name: 'horaActual',
        columnFormType: 'CustomTimePicker',
        label: 'Horario',
        isRequired: true,
        classInput: 'col-span-6',
        size: 'middle',
        use12Hours: true,
        format: "h:mm a"
    },
    {
        name: 'tipoCita',
        columnFormType: 'CustomSelectForm',
        label: 'Servicios',
        isRequired: true,
        classInput: 'col-span-6',
        size: 'middle',
        arraySelect: [
            {
                name: 'Cita médica',
                value: 'Cita médica'
            },
            {
                name: 'Instalación catéter',
                value: 'Instalación catéter'
            },
            {
                name: 'Limpieza catéter',
                value: 'Limpieza catéter'
            },
            {
                name: 'Especialidades',
                value: 'Especialidades'
            },
            {
                name: 'Plática',
                value: 'Plática'
            },
            {
                name: 'Entrega de medicamentos',
                value: 'Entrega de medicamentos'
            },
            {
                name: 'Entrega de vacunas',
                value: 'Entrega de vacunas'
            },
            {
                name: 'Sesiones',
                value: 'Sesiones'
            },
        ],
        optionValue: 'value',
        optionName: 'name'
    },
]