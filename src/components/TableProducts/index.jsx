import React from 'react'
import { BASE_URL } from '../../consts/const'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TablePagination,
} from '@mui/material'

const TableProducts = ({ productos = [], setProductos, setProductEdit }) => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(4)
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 12))
    setPage(0)
  }
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      '¿Estás seguro de que quieres eliminar este producto?'
    )

    if (!confirmDelete) {
      return
    }

    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })

      if (!response.ok) {
        throw new Error('No se pudo eliminar el producto')
      }

      setProductos((prevProducts) =>
        prevProducts.filter((producto) => producto.id !== id)
      )
    } catch (error) {
      console.error('Error al eliminar el producto:', error.message)
      alert('No se pudo eliminar el producto')
    }
  }

  const handleUpdate = (product) => {
    setProductEdit(product)
  }

  return (
    <>
      {productos.length === 0 ? (
        <p>No hay productos</p>
      ) : (
        <>
          <div className="container px-4 m-5">
            <Table style={{ backgroundColor: 'white' }}>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Descripcion</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Precio</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productos
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((producto, i) => (
                    <TableRow key={producto.id}>
                      <TableCell>{i + 1 + page * rowsPerPage}</TableCell>
                      <TableCell>{producto.nombre}</TableCell>
                      <TableCell>{producto.descripcion}</TableCell>
                      <TableCell>{producto.stock}</TableCell>
                      <TableCell>{producto.precio}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleUpdate(producto)}
                          variant="outlined"
                          color="primary"
                        >
                          Editar
                        </Button>
                        &nbsp;&nbsp;
                        <Button
                          onClick={() => handleDelete(producto.id)}
                          variant="outlined"
                          color="secondary"
                        >
                          Eliminar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              style={{ backgroundColor: 'white' }}
              rowsPerPageOptions={[4, 8, 12]}
              component="div"
              count={productos.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </>
      )}
    </>
  )
}

export default TableProducts
