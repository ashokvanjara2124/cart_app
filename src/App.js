
import './App.css';
import Header from './component/Header';
import Details from './component/Details'
import {
  BrowserRouter,
  Routes,
  Route,Navigate
} from "react-router-dom";
import Home from './component/Home';
import Cart from './component/Cart';
import Checkout from './component/Checkout';
import About from './component/About';

import BillingForm from './component/BillingForm';
import OrderRecived from './component/OrderRecived';


function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/details/:slug' element={<Details />} />
          {/* <Route path='/checkout' element={<Checkout/>} /> */}
          <Route path='/about' element={<About/>}/>
        
          <Route path='/Billingform' element={<BillingForm/>}></Route>
          <Route path='/orderRecived' element={<OrderRecived/>}/>
        </Routes>
      </BrowserRouter>
  
    </div>
  );
}

export default App;
