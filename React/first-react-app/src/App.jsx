// import logo from './logo.svg';
import './App.css';
import Todo from './components/Todo.jsx';
import Title from './components/title.jsx'
// import Modal from "./components/modal.jsx"
import Counter from "./components/counter.jsx"

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from "./pages/About.jsx"
import User from "./pages/User.jsx"
import Navigation  from './components/Navigation.jsx';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element= {<Home></Home>}></Route>
          <Route path="/About" element = {<About></About>}></Route>
          <Route path="/User/:userId" element={<User />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
