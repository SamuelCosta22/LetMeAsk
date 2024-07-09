import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { AuthContextProvider } from './contexts/AuthContext';
import { Room } from './pages/Rooms';
import { AdminRoom } from './pages/AdminRoom';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/rooms/new" Component={NewRoom} />
          <Route path="/rooms/:id" Component={Room} />

          <Route path="/admin/rooms/:id" Component={AdminRoom} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;