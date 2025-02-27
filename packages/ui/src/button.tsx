"use client"
import { ReactNode } from 'react'; 

interface ButtonProps {
    children : ReactNode | string,
    onClick: () => void;
}

const Button = ({children, onClick} : ButtonProps) => {
    return (
        <button type="button" onClick={onClick} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
            {children}
        </button>
    )
}

export default Button;