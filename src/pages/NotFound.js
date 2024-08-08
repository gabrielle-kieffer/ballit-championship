import React from 'react'
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="notFoundContainer">
      <h1 className="notFoundTitle">Página não encontrada</h1>
      <p className="notFoundText">404</p>
      <Link to="/" className='linkLogin'>Volte para a página principal</Link>
    </div>
  )
}

export default NotFound