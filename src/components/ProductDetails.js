export default function ProductDetails({ data, handleClose }) {
  const { product, details } = data
  
  return (
    <div className="product-details">
      <div className="product-details-header">
        <div>
          <a className="product-link" target="_blank" href={`https://www.lojasrenner.com.br${product.linkId}`} rel="noreferrer">
            <span className="product-details-title">{product.name}</span>
          </a>

          {details && (
            <div>
              <span>
                <span className="product-detail-attribute">Preço: </span>
                <span className="price-tag">{details.onSale ? details.salePriceFormatted : details.listPriceFormatted}</span>
              </span>
              <span className="product-details-size">
                <span className="product-detail-attribute">Tamanhos: </span>
                {product.size?.map((size, idx) => (
                  <span 
                    key={size}  
                    className="product-details-size-link" 
                  >
                    {size}
                  </span>
                ))}
              </span>
            </div>
          )}
        </div>

        <button className="product-details-close" onClick={handleClose}>✕</button>
      </div>


      <div className="product-details-images">
        <div className="product-details-images-list">
          {details && details?.mediaSets.map(media => {
            return (
              <a href={media.largeImageUrl} target="_blank" rel="noreferrer">
                <img src={media.largeImageUrl} />
              </a>
            )
          })}
        </div>
      </div>

    </div>
  )
}