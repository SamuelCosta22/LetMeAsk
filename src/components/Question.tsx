import { ReactNode } from 'react';

import '../styles/question.css'

type QuestionProps = {
    content: string,
    author: {
        name: string;
        avatar: string,
    },
    children?: ReactNode,
    isAnswered?: boolean,
    isHighLighted?: boolean,
}

export function Question({isAnswered=false, isHighLighted=false, ...props}: QuestionProps){
    return(
        <div id="question" className={`question ${isAnswered ? 'answered' : ''} ${isHighLighted && !isAnswered ? 'highLighted' : ''}`}>
            <p className="text-[#29292e]">{props.content}</p>
            <footer className="flex justify-between items-center mt-6">
                <div className="flex items-center mt-4 w-full">
                    <img className='w-8 h-8 rounded-[50%]' src={props.author.avatar} alt={props.author.name} />
                    <span className='ml-2 text-[#737380] text-sm'>{props.author.name}</span>
                </div>
                <div>
                    {props.children}
                </div>
            </footer>
        </div>
    )
}