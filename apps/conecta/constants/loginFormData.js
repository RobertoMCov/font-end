export default [
  {
    name: 'correo',
    type: 'email',
    label: 'Correo electrónico',
    placeholder: 'Ingrese correo electrónico',
    ariaDescribedBy: 'Ingrese correo electrónico',
    rules: [
      {
        required: true,
        message: 'Ingrese un correo electrónico'
      }
    ]
  },
  {
    name: 'contrasena',
    label: 'Contraseña',
    placeholder: 'Ingrese Contraseña',
    ariaDescribedBy: 'Ingrese Contraseña',
    inputType: 'Password',
    rules: [
      {
        required: true,
        message: 'Ingrese una Contraseña'
      }
    ]
  }
]
