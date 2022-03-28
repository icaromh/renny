import './App.css';
import { useState, useReducer } from 'react';

import Pagination from './components/Pagination'
import ProductDetails from './components/ProductDetails'
import Sizes from './components/Sizes'

import searchProduct from './services/search';
import reducer from './reducer';
import { REQUEST_STATUS, INITIAL_STATE } from './constants';
import SearchBox from './components/SearchBox';

function App() {
  const perPage = 80
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { fetchStatus, products, search, ...rstate } = state
  
  console.log('>>>> STATE ', state)

  const [selectedProduct, setSelectedProduct] = useState(null)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)

  const resetState = () => {
    dispatch({ type: 'RESET' })
  }

  const loadMoreProducts = () => {
    if (search.trim() === "") return
    dispatch({ type: 'SET_FETCH_STATUS', value: REQUEST_STATUS.LOADING })

    searchProduct(search, page)
      .then(value => dispatch({ type: 'LOAD_MORE_PRODUCTS', value }))
      .finally(() => dispatch({ type: 'SET_FETCH_STATUS', value: REQUEST_STATUS.IDLE }))
  }

  const handleSearch = (page) => {
    if (!search || search.trim() === "") return

    dispatch({ type: 'SET_FETCH_STATUS', value: REQUEST_STATUS.LOADING })

    document.querySelector('.grid').scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    searchProduct(search, page)
      .then(({ total, data }) => {
        dispatch({
          type: 'LOAD_PAGE',
          value: {
            total,
            page,
            products: data,
          }
        })
      })
      .finally(() => dispatch({ type: 'SET_FETCH_STATUS', value: REQUEST_STATUS.IDLE }))
  }

  const handleProductDetails = (product) => {
    const skuId = product.sku_list[0]
    const productId = product.id

    setSelectedProduct({
      product
    });

    fetch(`http://127.0.0.1:8787/product?skuId=${skuId}&productId=${productId}`)
      .then(res => res.json())
      .then(data => {
        const details = data
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

        <SearchBox 
          onChange={(value => dispatch({ type: 'SET_SEARCH', value }))}
          onSubmit={handleSearch}
          />
      </div>

      <div className='grid'>
        {products.filter(p => p.gender && p.gender[0] === 'Feminino').map(p => (
          <div className='product' key={p.linkId} onClick={() => handleProductDetails(p)}>
            <img target='_blank' src={p.imageId} />
            {p?.size && <Sizes sizes={p.size} categoryName={p.categoryName} />}
            <span className='product-name'>{p.name}</span>
          </div>
        ))}


      </div>

      {products.length && search && (
        <Pagination onClickPage={handleSearch} total={total} perPage={perPage} current={page}>
          <button className='load-more-button' onClick={loadMoreProducts} disabled={fetchStatus === 'LOADING' || page >= Math.ceil(total / perPage)}>
            {
              fetchStatus === 'LOADING' ?
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
