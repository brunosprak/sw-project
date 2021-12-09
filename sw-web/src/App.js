import NotFound  from './pages/NotFound';
import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import FutureBooks from './pages/FutureBooks';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Navigate replace to='/home' />} />
        <Route path='/home' element={<Home />} />
        <Route path='/future-books' element={<FutureBooks />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
