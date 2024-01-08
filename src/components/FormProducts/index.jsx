import { useState } from "react";
import { BASE_URL } from "../../consts/const";
import { useEffect } from "react";

const FormProducts = ({ setProductos, setProductEdit, productedit }) => {
  const initialDataForm = {
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
  };

  const [dataproductos, setDataproductos] = useState(initialDataForm);

  useEffect(() => {
    if (productedit) {
      setDataproductos(productedit);
    } else {
      setDataproductos(initialDataForm);
    }
  }, [productedit]);

  const handleChange = (e) => {
    setDataproductos({
      ...dataproductos,
      [e.target.name]: e.target.value,
    });
  };

  const { descripcion, nombre, precio, stock } = dataproductos;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      descripcion.trim() === "" ||
      nombre.trim() === "" ||
      precio === "" ||
      stock === ""
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      const url = productedit ? `${BASE_URL}/${productedit.id}` : BASE_URL;

      const method = productedit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: JSON.stringify(dataproductos),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      const data = await response.json();
      if (productedit) {
        // Actualizar el producto existente en el estado global
        setProductos((prevProducts) =>
          prevProducts.map((producto) =>
            producto.id === productedit.id ? data.producto : producto
          )
        );
        setProductEdit(null); // Salir del modo de edición
      } else {
        // Agregar el nuevo producto al estado global
        setProductos((prevProducts) => [...prevProducts, data.producto]);
      }

      setDataproductos(initialDataForm);
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
      alert("No se pudo procesar la solicitud");
    }
  };

  const handleCancel = () => {
    setProductEdit(null); // Salir del modo de edición
    setDataproductos(initialDataForm); // Restablecer el formulario
  };

  return (
    <>
      <div className="container max-w-lg px-4 m-5">
        <h1 className="text-center font-semibold text-2xl leading-10 text-gray-900">
          {productedit ? "Actualizar Producto" : "Registrar Producto"}
        </h1>
        <form onSubmit={handleSubmit}>
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
                      onChange={handleChange}
                      type="text"
                      name="nombre"
                      id="nombre"
                      value={nombre}
                      placeholder="Monitor ASUS xg 25'"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
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
                    <input
                      onChange={handleChange}
                      type="text"
                      value={descripcion}
                      name="descripcion"
                      placeholder="Monitor de 25' apto para gamers de alta gama"
                      id="descripcion"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
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
                      onChange={handleChange}
                      id="precio"
                      value={precio}
                      name="precio"
                      type="number"
                      placeholder="250"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
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
                      onChange={handleChange}
                      placeholder="50"
                      type="number"
                      name="stock"
                      value={stock}
                      id="stock"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className=" flex items-center justify-center gap-x-6">
              <button
                type="button"
                onClick={handleCancel}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {productedit ? "Actualizar Producto" : "Guardar Producto"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormProducts;
