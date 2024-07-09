import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'

import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'

import { useNavigate, useParams } from 'react-router-dom'
import { Question } from '../components/Question'
import { useRoom } from '../hooks/useRoom'

import '../styles/adminRoom.css'
import { database } from '../services/firebase'

type RoomParams = {
    id: string;
}

export function AdminRoom(){
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { title, questions } = useRoom(roomId!);
    const navigation = useNavigate();

    async function handleCheckQuestionAsAnswered(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        });
    }

    async function handleHighLightQuestion(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighLighted: true,
        });
    }

    async function handleDeleteQuestion(questionId: string){
        if(window.confirm('Tem certeza que você deseja excuir essa pergunta?!')){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    async function handleEndRoom(){
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        });
        navigation('/');
    }

    return(
        <div>
            <header className='p-6 border-b-[1px] border-[#e2e2e2] border-solid'>
                <div className='max-w-[1120px] my-0 mx-auto flex justify-between items-center'>
                    <img className='max-h-[45px]' src={logoImg} alt="Let Me Ask" />
                    <div className='flex items-center gap-4'>
                        <RoomCode code={roomId!}/>
                        <div className='w-[37%]'>
                            <Button onClick={handleEndRoom} id='buttonEncerrar'>Encerrar Sala</Button>
                        </div>
                    </div>
                </div>
            </header>

            <main className='max-w-[800px] my-0 mx-auto'>
                <div className='my-8 mx-6 flex items-center'>
                    <h1 className='font-poppins text-2xl text-[#29292e] font-bold'>Sala {title}</h1>
                    {questions.length > 0 && <span className='ml-4 bg-[#e559f9] rounded-full py-2 px-4 text-[#fff] text-sm font-medium'>{questions.length} pergunta(s)</span>}
                </div>

                <div className='mt-8'>
                    {questions.map(question => {
                        return(
                            <Question key={question.id} content={question.content} author={question.author} isAnswered={question.isAnswered} isHighLighted={question.isHighLighted}>
                                <div className='flex gap-4'>
                                    {!question.isAnswered && (
                                        <>
                                            <button type='button' onClick={() => handleCheckQuestionAsAnswered(question.id)}>
                                                <img src={checkImg} alt="Check question" />
                                            </button>
                                            <button type='button' onClick={() => handleHighLightQuestion(question.id)}>
                                                <img src={answerImg} alt="Answer question" />
                                            </button>
                                        </>
                                    )}
                                    <button type='button' onClick={() => handleDeleteQuestion(question.id)}>
                                        <img src={deleteImg} alt="Remove question" />
                                    </button>
                                </div>
                            </Question>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}