export default function ProductDetails({ data, handleClose }) {
  const details = data.details[Object.keys(data.details)[0]]
  const product = data.product
  
  console.log(product)

  return (
    <div className="product-details">
      <div className="product-details-header">
        <a target="_blank" href={`https://www.lojasrenner.com.br${product.linkId}`} rel="noreferrer">
          <span className="product-details-title">{details.displayName}</span>
        </a>
        <button className="product-details-close" onClick={handleClose}>ⅹ</button>
      </div>

      <div className="product-details-images">
        {details.mediaSets.map(media => <img src={media.largeImageUrl} />)}
      </div>

    </div>
  )
}