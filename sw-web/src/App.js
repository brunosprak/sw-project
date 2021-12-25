import { Route, Routes, Navigate } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Layout from './components/layout/Layout';
import FutureBooks from './pages/FutureBooks';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate replace to="/upcoming-books" />} />

        {/* <Route path='/home' element={<Home />} /> */}

        <Route path="/upcoming-books" element={<FutureBooks />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
