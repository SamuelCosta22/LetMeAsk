import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'

import '../styles/auth.css'
import { database } from '../services/firebase'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export function NewRoom(){
    const { user } = useAuth();
    const history = useNavigate();
    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent){
        event.preventDefault();
        if(newRoom.trim() === ''){
            return;
        }

        const roomRef = database.ref('rooms');
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        });
        history(`/rooms/${firebaseRoom.key}`);
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
                    <h2 className='text-2xl mt-4 mb-6 my-0 font-poppins font-bold'>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input className='w-full h-[50px] rounded-lg py-0 px-4 bg-[#fff] border border-[#a8a8b3]' type="text" onChange={event => setNewRoom(event?.target.value)} value={newRoom} placeholder="Nome da sala" />
                        <Button type='submit'>Criar sala</Button>
                    </form>
                    <p className='text-[14px] text-[#737380] mt-4'>
                        Quer entrar em uma sala existente?
                        <Link className='ml-1 text-[#e559f9]' to={"/"}>
                            clique aqui
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    )
}