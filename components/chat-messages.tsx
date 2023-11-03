"use client"

import { Companion } from "@prisma/client";
import { ChatMessage, ChatMessageProps } from "./chat-message";
import { ElementRef, useEffect, useRef, useState } from "react";

interface ChatMessagesProps {
    isLoading: boolean;
    message: ChatMessageProps[];
    companion: Companion
}
export const ChatMessages = ({
    isLoading,
    message = [],
    companion }: ChatMessagesProps) => {
    const scrollRef = useRef<ElementRef<"div">>(null)
    const [fakeLoading, setFakeLoading] = useState(message.length === 0 ? true : false)
    useEffect(() => {
        const timeout = setTimeout(() => {
            setFakeLoading(false)
        }, 1000);
        return () => {
            clearTimeout(timeout)
        }
    }, []);
    useEffect(() => {
        scrollRef?.current?.scrollIntoView({ behavior: "smooth" })
    }, [])
    return (
        <div className="flex-1 overflow-y-auto pr-4">
            <ChatMessage
                src={companion.src}
                isLoading={fakeLoading}
                role="system"
                content={`Hello I am  ${companion.name},${companion.description}`} />

            {message.map((item) => (
                <ChatMessage
                    key={item.content}
                    role={item.role}
                    content={item.content}
                    src={companion.src}
                />
            ))}
            {isLoading && (
                <ChatMessage
                    role="system"
                    src={companion.src}
                    isLoading
                />
            )}
            <div ref={scrollRef} />
        </div>
    );
}

