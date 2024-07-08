import { useContext, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import { Button } from '../components/Button'

import '../styles/auth.css'
import { authContext } from '../contexts/AuthContext'
import { database } from '../services/firebase'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { errorToEnter } from '../toasts/toasts'

export function Home(){
    const navigation = useNavigate();
    const { user, signInWithGoogle } = useContext(authContext)
    const [roomCode, setRoomCode] = useState('');

    async function handleCreateRoom(){
        if(!user){
            await signInWithGoogle()
        }
        navigation('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent){
        event.preventDefault();
        if(roomCode.trim() === ''){
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()){
            errorToEnter();
            return;
        }

        navigation(`rooms/${roomCode}`);
    }

    return(
        <div className='flex h-screen items-center'>
            <aside className='h-screen flex flex-col justify-center flex-7 bg-[#835afd] text-[#fff] py-[120px] px-20'>
                <img className='max-w-[320px]' src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong className='font-bold text-4xl font-poppins mt-4 leading-[42px]'>Crie salas de Q&amp;A ao-vivo</strong>
                <p className='text-2xl mt-4 text-[#f8f8f8]'>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main className='flex flex-8 py-0 px-8 justify-center items-center m-auto'>
                <div className='flex flex-col w-full max-w-xs items-stretch text-center'>
                    <img className='self-center' src={logoImg} alt="Logo Letmeask" />
                    <button className='py-0 px-8 flex justify-center items-center cursor-pointer mt-16 h-[50px] rounded-lg font-medium bg-[#ea4335] text-[#fff] border-0 hover:brightness-90' onClick={handleCreateRoom}>
                        <img className='mr-2' src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className='separator'>ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input className='w-full h-[50px] rounded-lg py-0 px-4 bg-[#fff] border border-[#a8a8b3]' type="text" onChange={event => setRoomCode(event.target.value)} value={roomCode} placeholder="Digite o código da sala" />
                        <Button type='submit'>Entrar na sala</Button>
                        <ToastContainer />
                    </form>
                </div>
            </main>
        </div>
    )
}