import { FormEvent, useEffect, useState } from 'react'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'

import { useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'
import { questionSent } from '../toasts/toasts'
import { Question } from '../components/Question'
import { useRoom } from '../hooks/useRoom'

import '../styles/room.css'

type RoomParams = {
    id: string;
}

export function Room(){
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const[newQuestion, setNewQuestion] = useState('');
    const { title, questions } = useRoom(roomId!);

    async function handleSendQuestion(event: FormEvent){
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
        questionSent();
    }

    async function handleLikeQuestion(questionId: string, likeId: string | undefined){
        if(likeId){
            await database.ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`).remove()
        } else {
            await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
                authorId: user?.id,
            })
        }
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

                <div className='mt-8'>
                    {questions.map(question => {
                        return(
                            <Question key={question.id} content={question.content} author={question.author} isAnswered={question.isAnswered} isHighLighted={question.isHighLighted}>
                                {!question.isAnswered && (
                                    <button
                                        onClick={() => handleLikeQuestion(question.id, question.likeId)}
                                        className={`like-button ${question.likeId ? 'liked' : ''}`}
                                        type='button'
                                        aria-label='Marcar como gostei'>
                                            {question.likeCount > 0 && <span>{question.likeCount}</span>}
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                    </button>
                                )}
                            </Question>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}