import * as Yup from 'yup'

const formSchema = Yup.object().shape({
  nombre: Yup.string()
    .required('El nombre es obligatorio')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre debe tener como máximo 50 caracteres'),
  descripcion: Yup.string()
    .required('La descripción es obligatoria')
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(100, 'La descripción debe tener como máximo 100 caracteres'),
  precio: Yup.number()
    .required('El precio es obligatorio')
    .positive('El precio debe ser un número positivo')
    .min(1, 'El precio debe ser como mínimo 1')
    .max(100000, 'El precio debe ser como máximo 100000')
    .test(
      'precio',
      'El precio debe ser como mínimo 1',
      (value) => value >= 1 && value <= 100000
    ),
  stock: Yup.number()
    .required('El stock es obligatorio')
    .integer('El stock debe ser un número entero')
    .positive('El stock debe ser un número positivo')
    .min(1, 'El stock debe ser como mínimo 1')
    .max(1000, 'El stock debe ser como máximo 1000')
    .test(
      'stock',
      'El stock debe ser como mínimo 1',
      (value) => value >= 1 && value <= 1000
    ),
})

export default formSchema
