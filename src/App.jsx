import { useEffect, useState } from "react";
import FormProducts from "./components/FormProducts";
import TableProducts from "./components/TableProducts";
import { BASE_URL } from "./consts/const";

function App() {
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productedit, setProductEdit] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(BASE_URL);
        if (!res.ok) {
          throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }
        const json = await res.json();
        setProductos(json.productos);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setProductos([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductos();
  }, []);

  return (
    <div className="flex flex-col">
      <FormProducts
        setProductos={setProductos}
        productedit={productedit}
        setProductEdit={setProductEdit}
      />
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <TableProducts
          productos={productos}
          setProductos={setProductos}
          setProductEdit={setProductEdit}
        />
      )}
    </div>
  );
}

export default App;
