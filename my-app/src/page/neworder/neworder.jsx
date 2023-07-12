import Header from '../../components/header/header';
import React, { useState } from 'react';
import './neworder.css'
function New() {
  const [owner_name, setowner_name] = useState('');
  const [owner_surname, setowner_surname] = useState('');
  const [owner_phone, setowner_phone] = useState('');
  const [ordered_date, setordered_date] = useState('');
  const [will_finished, setwill_finished] = useState('');
  const [first_pay, setfirst_pay] = useState('');
  const [place, setPlace] = useState('');

 
  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:3001/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ owner_name, owner_surname, owner_phone, ordered_date, will_finished, place, first_pay }),
    })
      .then((response) => response.json())
      .then((result) => {
        setowner_name('')
        setowner_surname('')
        setowner_phone('')
        setordered_date('')
        setwill_finished('')
        setfirst_pay('')
        setPlace('')
      })
      .catch((error) => {
        console.error('Error inserting data:', error);
        
      });
  };
  return (<div className='neworder'>
    <Header />
    <form onSubmit={handleSubmit} className='form'>
      <h1>Yeni Sifariş</h1>
      <label htmlFor="name">Sifarişçi adı</label>
      <input type="text" id='name' value={owner_name} onChange={(e) => setowner_name(e.target.value)} placeholder="example: Izzət" className='imput' required/>
      <label htmlFor="surname">Sifarişçi Soyadı</label>
      <input type="text" id='surname' value={owner_surname} onChange={(e) => setowner_surname(e.target.value)} placeholder="example: Ömərov" className='imput' required/>
      <label htmlFor="phone">Mobil Nömrə</label>
      <input type="text" id='phone' value={owner_phone} onChange={(e) => setowner_phone(e.target.value)} placeholder="example: 0709161820" className='imput' required/>
      <label htmlFor="ordereddate">Sifariş Edilmə Tarixi</label>
      <input type="date" id='ordereddate' value={ordered_date} onChange={(e) => setordered_date(e.target.value)}  className='imput' required/>
      <label htmlFor="finishdate">Təhvil Veriləcək Tarix</label>
      <input type="date" id='finishdate' value={will_finished} onChange={(e) => setwill_finished(e.target.value)} className='imput' required/>
      <label htmlFor="place">Təhvil Veriləcək Məkan</label>
      <input type="text" id='place' value={place} onChange={(e) => setPlace(e.target.value)} placeholder="example: 28 May m/s" className='imput' required/>
      <label htmlFor="fisrtpay">İlkin Ödəniş</label>
      <input type="text" id='fisrtpay' value={first_pay} onChange={(e) => setfirst_pay(e.target.value)} placeholder="example: 20 (Minimum 50% ilkin ödəniş)" className='imput' required/>
      <button type="submit" className='addnew'>Add Data</button>
    </form>
  </div>
  );
}

export default New;