export const inputsFormMail = [
  {
    name: 'para',
    label: 'Para',
    placeholder: 'Para',
    classInput: 'is-12 p-0',
    classNameFormItem: 'mx-2 m-0',
    columnFormType: 'ListTag',
    rules: [
      {
        required: true,
        message: 'Ingrese destinatarios'
      }
    ]
  },
  {
    name: 'cc',
    label: 'CC',
    placeholder: 'CC',
    classInput: 'is-12 p-0',
    classNameFormItem: 'mx-2 m-0',
    columnFormType: 'ListTag'
  },
  {
    name: 'cco',
    label: 'CCO',
    placeholder: 'CCO',
    classInput: 'is-12 p-0',
    classNameFormItem: 'mx-2 m-0',
    columnFormType: 'ListTag'
  },
  {
    name: 'asunto',
    label: 'Asunto',
    placeholder: '',
    classInput: 'is-12-desktop is-12-mobile is-3-tablet',
    rules: [
      {
        required: true,
        message: 'Introduzca su apellido materno'
      }
    ],
    size: 'middle'
  },
  {
    name: 'adjuntos',
    label: 'Archivos Adjuntos',
    columnFormType: 'CustomFile',
    classInput: 'is-12'
  }

]
