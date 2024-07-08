import copyImg from '../assets/images/copy.svg'
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sucessToCopy } from '../toasts/toasts';

type RoomCodeProps = {
    code: string;
}

export function RoomCode(props: RoomCodeProps){
    function copyRoomCodeToClipboard(){
        navigator.clipboard.writeText(props.code);
        sucessToCopy();
    }

    return(
        <button className='flex cursor-pointer bg-[#fff] overflow-hidden rounded-lg h-8 border-l border-solid border-[#835afd]' onClick={copyRoomCodeToClipboard}>
            <ToastContainer />
            <div className='bg-[#835afd] px-3 flex justify-center items-center h-full'>
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span className='block self-center flex-1 pr-4 pl-3 py-0 w-[230px] font-medium text-sm'>Sala #{props.code}</span>
        </button>
    )
}