
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login/Login';
import Stock from './pages/stock/Stock';

function App() {
  return (
   <Routes>
    <Route path="/" >
    <Route index element={<Login />} />
    <Route path="stock" element={<Stock />} />
    </Route>
   </Routes>
  );
}

export default App;
