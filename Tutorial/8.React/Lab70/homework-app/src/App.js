import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import AppRoutes from './router';

function App() {
  return (
    <div className="container mt-4">
      <Navbar />
      <AppRoutes />
    </div>
  );
}

export default App;
