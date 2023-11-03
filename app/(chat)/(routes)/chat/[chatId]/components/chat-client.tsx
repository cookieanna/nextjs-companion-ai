"use client"
import { useCompletion } from "ai/react"
import { ChatHeader } from '@/components/chat-header'
import { ChatForm } from '@/components/chat-form'
import { Companion, Message } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { ChatMessages } from "@/components/chat-messages"
import { ChatMessageProps } from "@/components/chat-message"
interface ChatClientProps {
    companion: Companion & {
        message: Message[],
        _count: {
            message: number
        }
    }
}
export const ChatClient = ({
    companion
}: ChatClientProps) => {
    const router = useRouter()
    const [message, setMessage] = useState<ChatMessageProps[]>(companion.message)
    const {
        input,
        isLoading,
        handleInputChange,
        handleSubmit,
        setInput
    } = useCompletion({
        api: `/api/chat/${companion.id}`,
        onFinish(_prompt, completion) {
            const systemMessage: ChatMessageProps = {
                role: "system",
                content: completion
            };
            setMessage((current) => [...current, systemMessage])
            setInput('')
            router.refresh()
        },
    })
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        const userMessage: ChatMessageProps = {
            role: "user",
            content: input
        }
        setMessage((current) => [...current, userMessage])
        handleSubmit(e)
    }
    return (
        <div className='flex flex-col h-full space-y-2 p-4'>
            <ChatHeader companion={companion} />
            <ChatMessages
                companion={companion}
                isLoading={isLoading}
                message={message}
            />
            <ChatForm
                isLoading={isLoading}
                input={input}
                handleInputChange={handleInputChange}
                onSubmit={onSubmit}
            />
        </div>
    );
}

