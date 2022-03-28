import { useState } from "react";

export default function Pagination({
  perPage,
  total,
  children,
  onClickPage,
  current
}) {

  const totalPages = Math.ceil(total / perPage);
  const pages = [...new Array(totalPages).fill()]

  console.log('current', current)

  return (
    <div className='pagination'>
      <div className="pagination-buttons">
        <button className={`pagination-button ${current === 0 ? 'active' : ''}`} onClick={() => onClickPage(0)}>1</button>
        <button
          className={`pagination-button ${current === totalPages - 1 ? 'active' : ''}`} onClick={() => onClickPage(current - 1)}
        >{'< Anterior'}</button>
        <input 
          style={{ width: 50, 'textAlign': 'center' }} 
          type="number" value={current + 1} onChange={(evt) => onClickPage(evt.target.value)} />
        <button
          className={`pagination-button ${current === totalPages - 1 ? 'active' : ''}`} onClick={() => onClickPage(current + 1)}
        >{'Próxima >'}</button>
        <button onClick={() => onClickPage(totalPages - 1)}>{totalPages}</button>
      </div>
      {children}
    </div>
  )
}


// {pages.map((_, idx) => (
//   <button
//     key={idx}
//     onClick={() => onClickPage(idx)}
//     className={`pagination-button ${idx === current ? 'active' : ''}`}
//     disabled={idx === current}>
//     {idx + 1}
//   </button>
// ))}