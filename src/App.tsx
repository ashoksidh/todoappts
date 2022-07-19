import './App.css';
import Login from './Login';
import Register from './Register';
import Todo from './Todo';
import {BrowserRouter as Router ,Route,Routes} from 'react-router-dom';



function App() {



  return (
    
    <div className="App">
      <Router >
        <Routes >
    <Route path="/" element={<Login />} />

    <Route path="/register" element={<Register />} />
    <Route path="/todo" element={<Todo />} />
    </Routes>
    </Router>

    </div>
  );
}

export default App;
