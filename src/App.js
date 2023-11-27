import './App.css';

import { useState ,useEffect} from 'react';

//Custom Hook
import { useFetch } from './hooks/usefetch';

const url = "http://localhost:3000/products"

function App() {

  const [products, setProducts] = useState([]);

  //Custom Hook

  const {data: items, htttpConfig, loading, error } = useFetch(url)

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");


  //Resgatando Dados 

  // useEffect(() => {

  //   async function fetchData() {

  //     const res = await fetch(url);

  //     const data = await res.json();

  //     setProducts(data);
  //   }

  //   fetchData()

  // },[])

  // Adicionando dados

  const handleSubmit = async (e) => {
    e.preventDefault()

    const product = {
      name,
      price,
    };

    // const res = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(product),
    // });

    // // Carregamento dinamico 

    // const addedProduct = await res.json();

    // setProducts((prevProducts) => [...prevProducts, addedProduct]);

    htttpConfig(product, "POST");

    setName("");
    setPrice("");
  };

  // removendo o produto 

  const handleRemove = (id)=> {
    htttpConfig(id, "DELETE")
  }

  return (
    <div className="App">
      <h1>Lista de Produtos</h1>
      {/* loading */}
      {loading && <p>Carregando dados...</p>}
      {error && <p>{error}</p>}
     {!loading &&
      <ul>
      {items && items.map((product) =>(
       <li key={product.id}>
         {product.name} - R$ {product.price}
         <button onClick={()=> handleRemove(product.id)}>Excluir</button>
       </li>
      ))}
     </ul>
     }
      
      <div className='add-product'>
        <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type='text' value={name} name='name' onChange={(e) => setName(e.target.value)} />
        </label>

        <label>
          Preço:
          <input type='number' value={price} name='price' onChange={(e) => setPrice(e.target.value)} />
        </label>

        {loading && <input type='submit' disabled value='Aguarde' />}
        {!loading && <input type='submit' value='Adicionar' />}

        </form>
      </div>

    </div>
  );
}

export default App;
