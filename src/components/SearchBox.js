import { useState } from "react"

function SearchBox({ onSubmit, onChange }) {
  const [search, setSearch] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault()
    onChange(search)
    onSubmit(1)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder='Produto a ser buscado'
        type="search"
        autoFocus
        defaultValue={search}
        onChange={(evt) => setSearch(evt.target.value)}
      />
    </form>
  )
}

export default SearchBox