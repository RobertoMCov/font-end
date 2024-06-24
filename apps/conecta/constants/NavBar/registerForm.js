const registerForm = () => {
    return [
        {
            classInput: 'col-span-12',
            name: 'folio',
            label: 'Numero de folio',
            placeholder: 'Numero de folio (9 digitos)',
            ariaDescribedBy: 'Folio'
        },
        {
            classInput: 'col-span-12',
            name: 'name',
            label: 'Nombre Completo',
            placeholder: 'Nombre Completo',
            // ariaDescribedBy: 'Actualiza el Presupuesto',
            rules: []
        },
        {
            classInput: 'col-span-12',
            name: 'apellidos',
            label: 'Apellidos Completo',
            placeholder: 'Apellidos Completo',
            // ariaDescribedBy: 'Actualiza el Presupuesto',
            rules: []
        }

    ]
}

export default registerForm
