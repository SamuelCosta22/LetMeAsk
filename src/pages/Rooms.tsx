import { FormEvent, useEffect, useState } from 'react'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'

import { useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'
import { questionSent } from '../toasts/toasts'

type RoomParams = {
    id: string;
}
type firebaseQuestions = Record<string, {
    author: {
        name: string,
        avatar: string,
    },
    content: string;
    isAnswered: boolean,
    isHighLighted: boolean
}>
type Question = {
    id: string;
    author: {
        name: string,
        avatar: string,
    },
    content: string;
    isAnswered: boolean,
    isHighLighted: boolean
}

export function Room(){
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const[newQuestion, setNewQuestion] = useState('');
    const[questions, setQuestions] = useState<Question[]>([]);
    const[title, setTitle] = useState('');

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);
        roomRef.on('value', room => {
            const databseRoom = room.val();
            const firebaseQuestions: firebaseQuestions = databseRoom.questions ?? {};
            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return{
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighLighted: value.isHighLighted,
                    isAnswered: value.isAnswered,
                }
            });
            setTitle(databseRoom.title);
            setQuestions(parsedQuestions);
        })
    }, [roomId]);

    async function handleSendQuestion(event: FormEvent){
        questionSent();
        event.preventDefault();
        if(newQuestion.trim() === ''){
            return;
        }
        if(!user){
            throw new Error('You must be logged in');
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
            isHighLighted: false,
            isAnswered: false,
        }
        await database.ref(`rooms/${roomId}/questions`).push(question);
        setNewQuestion("");
    }

    return(
        <div>
            <header className='p-6 border-b-[1px] border-[#e2e2e2] border-solid'>
                <div className='max-w-[1120px] my-0 mx-auto flex justify-between items-center'>
                    <img className='max-h-[45px]' src={logoImg} alt="Let Me Ask" />
                    <RoomCode code={roomId!}/>
                </div>
            </header>

            <main className='max-w-[800px] my-0 mx-auto'>
                <div className='my-8 mx-6 flex items-center'>
                    <h1 className='font-poppins text-2xl text-[#29292e] font-bold'>Sala {title}</h1>
                    {questions.length > 0 && <span className='ml-4 bg-[#e559f9] rounded-full py-2 px-4 text-[#fff] text-sm font-medium'>{questions.length} pergunta(s)</span>}
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea className='w-[100%] border-0 p-4 rounded-lg bg-[#fefefe] resize-y min-h-[130px] shadow-new' placeholder='O que você quer perguntar?!' onChange={event => setNewQuestion(event.target.value)} value={newQuestion} />
                    <div className='flex content-between items-center mt-4'>
                        { user ? (
                            <div className='flex items-center mt-4 w-full'>
                                <img className='w-8 h-8 rounded-[50%]' src={user.avatar} alt={user.name} />
                                <span className='ml-2 text-[#29292e] font-medium text-sm'>{user.name}</span>
                            </div>
                        ) : (
                            <span className='text-[14px] mt-4 text-[#737380] font-medium w-full'>
                                Para enviar uma pergunta, 
                                <button className='bg-transparent text-[14px] font-medium text-[#835AFD] border-0 underline cursor-pointer'>
                                    faça seu login
                                </button>.
                            </span>
                        )}
                        <div className='w-[40%]'>
                            <Button disabled={!user} type='submit'>Enviar pergunta</Button>
                        </div>
                    </div>
                </form>

                {JSON.stringify(questions)}
            </main>
        </div>
    )
}