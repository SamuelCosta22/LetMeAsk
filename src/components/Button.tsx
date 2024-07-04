import { ButtonHTMLAttributes } from 'react'
import '../styles/button.css'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function Button(props: ButtonProps){
    return(
        <button className='w-full mt-4 py-0 px-8 flex justify-center items-center cursor-pointer h-[50px] rounded-lg font-medium bg-[#835afd] text-[#fff] border-0'
        {...props} />
    )
}