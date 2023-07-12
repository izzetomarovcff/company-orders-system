import React from 'react';
import './header.css'
import { Link } from 'react-router-dom'
function Header(){
    return(
        <div className='header'>
            <Link to="/" className='headeritem'>Əsas Səhifə</Link>
            <Link to="/orders" className='headeritem'>Bütün Sifarişlər</Link>
            <Link to="/new" className='headeritem'>Yeni Sifariş</Link>
            <Link to="/notcomplated" className='headeritem'>Tamamlanmamış Sifarişlər</Link>
            
        </div>
    )
}

export default Header;