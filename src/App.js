import './App.css';
import { useState } from 'react';

import Pagination from './components/Pagination'
import ProductDetails from './components/ProductDetails'
import Sizes from './components/Sizes'

const API_URL = 'https://renner.icaro-mh.workers.dev' || 'http://127.0.0.1:8787'


function sanitizeLetters(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

function App() {
  const perPage = 80
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState()
  const [page, setPage] = useState(0)
  const [state, setState] = useState()

  const resetState = () => {
    setProducts([])
    setSelectedProduct(null)
    setTotal(0)
    setSearch("")
    setPage(1)
    setState(null)
  }

  const handleClickLoadMore = (evt) => {
    evt.preventDefault();
    setState('LOADING')

    if (search.trim() === "") return

    fetch(`${API_URL}/search?query=${sanitizeLetters(search)}&start=${(page + 1) * perPage}`)
      .then(res => res.json())
      .then(({ data, total }) => {
        setTotal(total)
        setPage(page => page + 1)
        setProducts(products => [...products, ...data])
      }).finally(() => setState('DONE'))
  }

  const handleClickPage = (curPage) => {
    setState('LOADING')
    setPage(curPage)

    document.querySelector('.grid').scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    fetch(`${API_URL}/search?query=${sanitizeLetters(search)}&start=${curPage * perPage}`)
      .then(res => res.json())
      .then(({ data, total }) => {
        setTotal(total)
        setProducts(data)
      }).finally(() => setState('DONE'))
  }

  const handleSubmit = (evt) => {
    setState('LOADING')
    setPage(0);
    setProducts([])
    setTotal(0)
    evt.preventDefault();

    if (search.trim() === "") return

    fetch(`${API_URL}/search?query=${sanitizeLetters(search)}`)
      .then(res => res.json())
      .then(({ data, total }) => {
        setTotal(total)
        setProducts(data)
      }).finally(() => setState('DONE'))
  }

  const handleProductDetails = (product) => {
    const skuId = product.sku_list[0]
    const productId = product.id

    setSelectedProduct({
      product
    });

    fetch(`${API_URL}/product?skuId=${skuId}&productId=${productId}`)
      .then(res => res.json())
      .then(details => {
        
        setSelectedProduct({
          product,
          details,
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
          <h1 onClick={() => resetState()}>Renny</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            placeholder='Produto a ser buscado'
            type="search"
            autoFocus
            defaultValue={search}
            onChange={(evt) => setSearch(evt.target.value)}
          />
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
            {p?.size && <Sizes data={p} sizes={p.size} categoryName={p.categoryName} />}
            <span className='product-name'>{p.name}</span>
          </div>
        ))}


      </div>

      {products.length && search && (
        <Pagination onClickPage={handleClickPage} total={total} perPage={perPage} current={page}>
          <button className='load-more-button' onClick={handleClickLoadMore} disabled={state === 'LOADING' || page >= Math.ceil(total / perPage)}>
            {
              state === 'LOADING' ?
                <span>Carregando ... ⌛️</span>
                : <span>Carregar mais produtos</span>
            }
          </button>
        </Pagination>
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
