"use client"
import { ChatHeader } from '@/components/chat-header'
import { Companion, Message } from '@prisma/client'
interface ChatClientProps {
    companion: Companion & {
        message: Message[],
        _count: {
            message: number
        }
    }
}
export const ChatClient = ({ companion }: ChatClientProps) => {
    return (
        <div className='flex flex-col h-full space-y-2 p-4'>
           
            <ChatHeader companion={companion}/>
        </div>
    );
}

