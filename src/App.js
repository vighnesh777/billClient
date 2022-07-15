import './App.css';
import Home from './components/Home/Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Billpage from './components/Billpage/Billpage';
import Editpage from './components/Editpage/Editpage';
import Addpage from './components/Addpage/Addpage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}exact />
        <Route  path="/bill/:id" element={<Billpage />}exact />
        <Route path='/:id/edit' element={<Editpage/>} exact /> 
        <Route path='/addBill' element={<Addpage/> } exact />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
