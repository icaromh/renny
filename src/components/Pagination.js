export default function Pagination({
  perPage,
  total,
  children,
  onClickPage,
  current
}) {

  const totalPages = Math.ceil(total / perPage);
  const pages = [...new Array(totalPages).fill()]

  return (
    <div className='pagination'>
      <div className="go-to-page">Navegar para página: </div>

      <div className="pagination-buttons">
        {pages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => onClickPage(idx)}
            className={`pagination-button ${idx === current ? 'active' : ''}`}
            disabled={idx === current}>
            {idx + 1}
          </button>
        ))}

      </div>

      {children}
    </div>
  )

}