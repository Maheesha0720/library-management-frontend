import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Book from './pages/Book'
import Borrows from './pages/Borrows';
import Authors from './pages/Authors';
import Publishers from './pages/Publishers';
import UserList from './pages/Users';
import Borrowlist from './pages/Borrowlist';

function App() {
  return (
    <Router>  
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/books" element={<Book />} />
        <Route path="/borrows" element={<Borrows />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/publishers" element={<Publishers />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/borrowlist" element={<Borrowlist />} />


      </Routes>
    </Router>
  );
}

export default App;
