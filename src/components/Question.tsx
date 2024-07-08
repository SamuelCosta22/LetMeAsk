import '../styles/question.css'

type QuestionProps = {
    content: string,
    author: {
        name: string;
        avatar: string,
    }
}

export function Question(props: QuestionProps){
    return(
        <div id="question" className="bg-[#fefefe] rounded-lg shadow-new p-6">
            <p className="text-[#29292e]">{props.content}</p>
            <footer className="flex justify-between items-center mt-6">
                <div className="flex items-center mt-4 w-full">
                    <img className='w-8 h-8 rounded-[50%]' src={props.author.avatar} alt={props.author.name} />
                    <span className='ml-2 text-[#737380] text-sm'>{props.author.name}</span>
                </div>
                <div> </div>
            </footer>
        </div>
    )
}