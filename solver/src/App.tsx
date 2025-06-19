import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/home/Home';
import NotFoundPage from './pages/not-found/NotFound';

function Home() {
  return <HomePage />;
}

function NotFound() {
  return <NotFoundPage />
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App
