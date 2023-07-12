import './App.css';
import Home from './page/home/home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Orders from './page/orders/orders';
import New from './page/neworder/neworder';
import NotComplated from './page/notcomplated/notcomplated';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/new" element={<New />} />
        <Route path="/notcomplated" element={<NotComplated />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
