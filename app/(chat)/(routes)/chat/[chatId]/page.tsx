import prismadb from "@/prisma/db";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ChatClient } from "./components/chat-client";

interface ChatIdPageProps {
    params: {
        chatId: string
    }
}
const ChatPage = async ({ params }: ChatIdPageProps) => {
    const { userId } = auth()
    if (!userId) {
        return redirectToSignIn()
    }
    const companion = await prismadb.companion.findUnique(
        {
            where: {
                id: params.chatId
            }, include: {
                message: {
                    orderBy: {
                        createdAt: "asc"
                    },
                    where: {
                        userId
                    }
                },
                _count: {
                    select: {
                        message: true
                    }
                }
            }
        }
    )
    if (!companion) {
        return redirect("/")
    }
    return (
        <ChatClient companion={companion}/>
    );
}

export default ChatPage;