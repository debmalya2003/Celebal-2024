import { Route, Routes } from 'react-router-dom';
import './App.css';
import Form from './components/Form';
import UserDetails from './components/UserDetails';

function App() {
  return (
   <>
   <Routes>
    <Route path='/' element={<Form/>}/>
    <Route  path='/submit' element={<UserDetails/>}/>
   </Routes>
   </>
  );
}

export default App;
