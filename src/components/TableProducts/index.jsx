import { BASE_URL } from "../../consts/const";

const TableProducts = ({ productos = [], setProductos, setProductEdit }) => {
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar este producto?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        throw new Error("No se pudo eliminar el producto");
      }

      setProductos((prevProducts) =>
        prevProducts.filter((producto) => producto.id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar el producto:", error.message);
      alert("No se pudo eliminar el producto");
    }
  };

  const handleUpdate = (product) => {
    setProductEdit(product);
  };

  return (
    <>
      {productos.length === 0 ? (
        <p>No hay productos</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Stock</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos?.map((producto, i) => (
              <tr key={producto.id}>
                <td>{i + 1}</td>
                <td>{producto.nombre}</td>
                <td>{producto.descripcion}</td>
                <td>{producto.stock}</td>
                <td>{producto.precio}</td>
                <td>
                  <button onClick={() => handleUpdate(producto)}>Editar</button>
                  <button onClick={() => handleDelete(producto.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default TableProducts;
