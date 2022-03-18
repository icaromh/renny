import './App.css';
import { useState } from 'react';

import Pagination from './components/Pagination'
import ProductDetails from './components/ProductDetails'

function sanitizeLetters(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

function App() {
  const perPage = 80
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState()
  const [page, setPage] = useState(1)
  const [state, setState] = useState()

  const handleClickLoadMore = (evt) => {
    evt.preventDefault();
    setState('LOADING')

    setPage(page => page + 1)
    fetch(`https://renner.icaro-mh.workers.dev/search?query=${sanitizeLetters(search)}&start=${page * perPage}`)
      .then(res => res.json())
      .then(({ data, total }) => {
        setTotal(total)
        setProducts(products => [...products, ...data])
      }).finally(() => setState('DONE'))
  }

  const handleClickPage = (curPage) => {
    setState('LOADING')
    setPage(curPage)
    fetch(`https://renner.icaro-mh.workers.dev/search?query=${sanitizeLetters(search)}&start=${curPage * perPage}`)
      .then(res => res.json())
      .then(({ data, total }) => {
        setTotal(total)
        setProducts(data)
      }).finally(() => setState('DONE'))
  }

  const handleSubmit = (evt) => {
    setState('LOADING')
    setPage(1);
    setProducts([])
    setTotal(0)
    evt.preventDefault();

    fetch(`https://renner.icaro-mh.workers.dev/search?query=${sanitizeLetters(search)}`)
      .then(res => res.json())
      .then(({ data, total }) => {
        setTotal(total)
        console.log(data)
        setProducts(data)
      }).finally(() => setState('DONE'))
  }

  const handleProductDetails = (product) => {
    const skuId = product.sku_list[0]
    const productId = product.id

    fetch(`https://renner.icaro-mh.workers.dev/product?skuIds=${skuId}&productId=${productId}`)
      .then(res => res.json())
      .then(data => {
        setSelectedProduct({
          product,
          details: data
        });
      })
  }

  const handleCloseProductDetails = () => {
    setSelectedProduct(null);
  }

  return (
    <div className="app">
      <div className='header'>

        <div>
          <h1>Renny</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <input placeholder='Produto a ser buscado' onKeyUp={(evt) => setSearch(evt.target.value)} />
        </form>

        <div className='results'>
          {products.length > 0 && (
            <span>Resultados para "{search}": {total}</span>
          )}
        </div>
      </div>

      <div className='grid'>
        {products.filter(p => p.gender && p.gender[0] === 'Feminino').map(p => (
          <div className='product' key={p.linkId} onClick={() => handleProductDetails(p)}>
            <img target='_blank' src={p.imageId} />

            <div className='sizes'>
              {p.size?.map(size => <span className="size-value">{size}</span>)}
            </div>

            <span className='product-name'>{p.name}</span>

          </div>
        ))}
      </div>

      {products.length && (
        <>
          <Pagination onClickPage={handleClickPage} total={total} perPage={perPage} current={page}>
            <div className='load-more-area'>
              <button onClick={handleClickLoadMore} disabled={state === 'LOADING' || page >= Math.ceil(total / perPage)}>
                {
                  state === 'LOADING' ?
                    <span>Carregando ... ⌛️</span>
                    : <span>Carregar mais produtos</span>
                }
              </button>
            </div>
          </Pagination>
        </>
      )}

      {selectedProduct && (
        <ProductDetails
          handleClose={handleCloseProductDetails}
          data={selectedProduct}
        />
      )}
    </div>
  );
}

export default App;
