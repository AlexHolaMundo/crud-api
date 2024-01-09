import { BASE_URL } from '../../consts/const'
import { useFormik } from 'formik'
import formSchema from '../../schemas/formSchema'
import { useEffect } from 'react'

const FormProducts = ({ setProductos, setProductEdit, productedit }) => {
  const initialDataForm = {
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
  }

  const formik = useFormik({
    initialValues: initialDataForm,
    validationSchema: formSchema,
    onSubmit: async (values) => {
      try {
        const url = productedit ? `${BASE_URL}/${productedit.id}` : BASE_URL
        const method = productedit ? 'PUT' : 'POST'

        const response = await fetch(url, {
          method,
          body: JSON.stringify(values),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })

        if (!response.ok) {
          throw new Error('Error en la solicitud')
        }

        const data = await response.json()
        if (productedit) {
          setProductos((prevProducts) =>
            prevProducts.map((producto) =>
              producto.id === productedit.id ? data.producto : producto
            )
          )
          setProductEdit(null)
        } else {
          setProductos((prevProducts) => [...prevProducts, data.producto])
        }

        formik.resetForm()
      } catch (error) {
        console.error('Error en la solicitud:', error.message)
        alert('No se pudo procesar la solicitud')
      }
    },
  })

  useEffect(() => {
    if (productedit) {
      formik.setValues(productedit)
    } else {
      formik.setValues(initialDataForm)
    }
  }, [productedit])

  const handleCancel = () => {
    setProductEdit(null)
    formik.resetForm()
  }

  return (
    <>
      <div className="container px-4 m-5">
        <h1 className="text-center font-semibold text-2xl leading-10 text-white">
          {productedit ? 'Actualizar Producto' : 'Registrar Producto'}
        </h1>
        <form
          onSubmit={formik.handleSubmit}
          className="rounded border p-4 bg-white"
        >
          <div className="space-y-12">
            <div className=" pb-0">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-5 ">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="nombre"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Nombre
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="text"
                      name="nombre"
                      id="nombre"
                      value={formik.values.nombre}
                      placeholder="Monitor ASUS xg 25'"
                      className={`block w-full p-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                        formik.errors.nombre && formik.touched.nombre
                          ? 'is-invalid'
                          : ''
                      }`}
                    />
                    {formik.errors.nombre && formik.touched.nombre && (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.nombre}
                      </div>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="descripcion"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Descripcion
                  </label>
                  <div className="mt-2">
                    <textarea
                      onChange={(e) => formik.handleChange(e)}
                      onBlur={formik.handleBlur}
                      value={formik.values.descripcion}
                      name="descripcion"
                      placeholder="Monitor de 25' apto para gamers de alta gama"
                      id="descripcion"
                      rows="3"
                      className={`block w-full p-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                        formik.errors.descripcion && formik.touched.descripcion
                          ? 'is-invalid'
                          : ''
                      }`}
                    />
                    {formik.errors.descripcion &&
                      formik.touched.descripcion && (
                        <div className="text-red-500 text-xs mt-1">
                          {formik.errors.descripcion}
                        </div>
                      )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="precio"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Precio
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={(e) => formik.handleChange(e)}
                      onBlur={formik.handleBlur}
                      id="precio"
                      value={formik.values.precio}
                      name="precio"
                      type="number"
                      placeholder="250"
                      className={`block w-full p-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                        formik.errors.precio && formik.touched.precio
                          ? 'is-invalid'
                          : ''
                      }`}
                    />
                    {formik.errors.precio && formik.touched.precio && (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.precio}
                      </div>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="stock"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Stock
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={(e) => formik.handleChange(e)}
                      onBlur={formik.handleBlur}
                      placeholder="50"
                      type="number"
                      name="stock"
                      value={formik.values.stock}
                      id="stock"
                      className={`block w-full p-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                        formik.errors.stock && formik.touched.stock
                          ? 'is-invalid'
                          : ''
                      }`}
                    />
                    {formik.errors.stock && formik.touched.stock && (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.stock}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className=" flex items-center justify-center gap-x-6">
              <button
                type="button"
                onClick={handleCancel}
                className="text-sm font-semibold leading-6 text-gray-900 border border-blue-300 rounded-md shadow-sm py-1.5 px-4 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="text-sm font-semibold leading-6 text-gray-900 border border-purple-300 rounded-md shadow-sm py-1.5 px-4 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              >
                {productedit ? 'Actualizar Producto' : 'Guardar Producto'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default FormProducts
