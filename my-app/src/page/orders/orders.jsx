import React, { useEffect, useState } from 'react';
import Header from '../../components/header/header';
import './orders.css'
function Orders() {
  const [orderid, setOrder_id] = useState(0);
  const [owner_name, setowner_name] = useState('');
  const [owner_surname, setowner_surname] = useState('');
  const [owner_phone, setowner_phone] = useState('');
  const [ordered_date, setordered_date] = useState('');
  const [will_finished, setwill_finished] = useState('');
  const [first_pay, setfirst_pay] = useState('');
  const [place, setPlace] = useState('');
  const [data, setData] = useState([]);

  const [edit,setEdit] = useState(false)
  useEffect(() => {
    fetch('http://localhost:3001/orders') // Replace with your server endpoint
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.error('Error retrieving data:', error));
  }, []);
  const handleDelete = (id) => {
    fetch(`http://localhost:3001/delete/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error, display an error message, etc.
      });
  };
  const handleSubmitEdit = (event) => {
    event.preventDefault();

    fetch(`http://localhost:3001/edit/${orderid}`, {
      method: 'PUT',
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
        setEdit(false)
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error inserting data:', error);
        
      });
  };
  
  const handleEdit = (id)=>{
    setEdit(true)
    const editorder = data.find(order=>{
      return order.order_id === id
    })
    setowner_name(editorder.owner_name)
    setowner_surname(editorder.owner_surname)
    setowner_phone(editorder.owner_phone)
    setPlace(editorder.place)
    setfirst_pay(editorder.first_pay)
    setOrder_id(id)
  }
  const closewindow = ( )=>{
    
    setowner_name('')
        setowner_surname('')
        setowner_phone('')
        setordered_date('')
        setwill_finished('')
        setfirst_pay('')
        setPlace('')
        setEdit(false)
        
  }
  return (<div>
    <Header />
    <i class="fa-solid fa-pen-to-square"></i>
    <br></br>
    <br></br>
    <br></br>
    <div>
      <table>
        <tr>
          <th>ID</th>
          <th>Ad</th>
          <th>Soyad</th>
          <th>Telefon</th>
          <th>Sifariş Tarixi</th>
          <th>Təhvil Tarixi</th>
          <th>Təhvil Məkanı</th>
          <th>İlkin Ödəniş</th>
          <th></th>
        </tr>
        {data.map((item) => (
          <tr key={item.order_id}>
            <td>{item.order_id}</td>
            <td>{item.owner_name}</td>
            <td>{item.owner_surname}</td>
            <td>{item.owner_phone}</td>
            <td>{item.ordered_date.split("T20:00:00.000Z")}</td>
            <td>{item.will_finished.split("T20:00:00.000Z")}</td>
            <td>{item.place}</td>
            <td>{item.first_pay} AZN</td>
            <td>
              <div className='buttons'>
                <div className='editdiv' onClick={() => handleEdit(item.order_id)}><img src="edit.png" alt="edit" className='edit' /></div>
                <div className='editdiv delete' onClick={() => handleDelete(item.order_id)}><img src="delete (1).png" alt="edit" className='edit' /></div>
              </div>

            </td>
          </tr>

        ))}

      </table>

    </div>{edit?(
      <div className='solidbackground'>
      </div>
    ):(null)}
    {edit?(
      <div className='editwindow'>
      <form onSubmit={handleSubmitEdit} className='form visible'>
        <div className='headerv1'>
          <div className='headerv2'><h1>Yeni Sifariş</h1></div>
          <div className='closevindovv' onClick={()=>{closewindow()}}><img src='cancel.png' alt='cancel'/></div>
        </div>
        
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
        <button type="submit" className='addnew'>Edit Data</button>
      </form>
      </div>
    ):(null)}
    
    
  </div>
  );
}

export default Orders;