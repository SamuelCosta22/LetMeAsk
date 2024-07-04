import { useContext } from 'react'
import { Link } from 'react-router-dom'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'

import '../styles/auth.css'
import { authContext } from '../App'

export function NewRoom(){
    const { user } = useContext(authContext);

    return(
        <div className='flex h-[100vh] items-center'>
            <aside className='flex flex-col justify-center flex-7 bg-[#835afd] text-[#fff] py-[120px] px-20'>
                <img className='max-w-[320px]' src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong className='font-bold text-4xl font-poppins mt-4 leading-[42px]'>Crie salas de Q&amp;A ao-vivo</strong>
                <p className='text-2xl mt-4 text-[#f8f8f8]'>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main className='flex flex-8 py-0 px-8 justify-center items-center m-auto'>
                <div className='flex flex-col w-full max-w-xs items-stretch text-center'>
                    <img className='self-center' src={logoImg} alt="Logo Letmeask" />
                    <h1>{user?.name}</h1>
                    <h2 className='text-2xl mt-4 mb-6 my-0 font-poppins'>Criar uma nova sala</h2>
                    <form>
                        <input className='w-full h-[50px] rounded-lg py-0 px-4 bg-[#fff] border border-[#a8a8b3]' type="text" placeholder="Nome da sala" />
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