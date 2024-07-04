import { BrowserRouter, Route, Routes} from 'react-router-dom'
import { createContext, useState } from 'react'

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

import { auth, firebase } from './services/firebase';

type authContextType = {
  user: User | undefined,
  signInWithGoogle: () => Promise<void>;
}

type User = {
  id: string,
  name: string,
  avatar: string,
}

export const authContext = createContext({} as authContextType);

function App() {
  const [user, setUser] = useState<User>();

  async function signInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
      if(result.user){
        const { displayName, photoURL, uid } = result.user;
        if(!displayName || !photoURL){
          throw new Error('Missing informations from Google Acount');
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        })
      }
  }

  return (
    <BrowserRouter>
      <authContext.Provider value={{ user, signInWithGoogle }}>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/rooms/new" Component={NewRoom} />
        </Routes>
      </authContext.Provider>
    </BrowserRouter>
  );
}

export default App;