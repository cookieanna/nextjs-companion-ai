import { StreamingTextResponse, LangChainStream } from "ai"
import { auth, currentUser } from "@clerk/nextjs"
import { CallbackManager } from "langchain/callbacks";
import { Replicate } from "langchain/llms/replicate";
import { NextResponse } from "next/server";

import { MemoryManager } from "@/lib/memory";
import { rateLimit } from "@/lib/rate-limit";
import prismadb from "@/prisma/db";

export async function POST(req: Request, { params }: { params: { chatId: string } }) {



    const { userId } = auth()
    try {
        if (!userId) {
            return new NextResponse("Unauthoried", { status: 401 })
        }
        const { prompt } = await req.json()
        const user = await currentUser()
        const identifier = req.url + "-" + userId;
        const { success } = await rateLimit(identifier)
        if (!success) {
            //means too many request
            return new NextResponse('Rate limit exceeded', { status: 429 })
        }
        const companion = await prismadb.companion.update({
            where: {
                id: params.chatId,

            },
            data: {
                message: {
                    create: {
                        content: prompt,
                        role: 'user',
                        userId: userId
                    }
                }
            }

        })
        if (!companion) {
            return new NextResponse("companion not found", { status: 404 })
        }
        const name = companion.id;
        const companion_file_name = name + ".txt";
        const companionKey = {
            companionName: name,
            userId: userId,
            modelName: "llama2-13b"
        }
        const memoryManager = await MemoryManager.getInstance()
        const record = await memoryManager.readLatestHistory(companionKey)
        if (record.length === 0) {
            await memoryManager.seedChatHistory(companion.seed, "\n\n", companionKey)

        }
        await memoryManager.writeToHistory("User:" + prompt + "\n", companionKey)
        const recentChatHistory = await memoryManager.readLatestHistory(companionKey)
        const similarDocs = await memoryManager.vectorSearch(
            recentChatHistory,
            companion_file_name
        )
        let relevantHistory = ''
        if (!!similarDocs && similarDocs.length !== 0) {
            relevantHistory = similarDocs.map((doc) => doc.pageContent).join("\n")
        }
        const { handlers } = LangChainStream();
        const model = new Replicate({
            model: "a16z-infra/llama-2-13b-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5",
            input: { max_length: 2048 },
            apiKey: process.env.REPLICATE_KEY_TOKEN,
            callbackManager: CallbackManager.fromHandlers(handlers)
        })
        model.verbose = true;
        const resp = String(

            await model.call(
                `
          ONLY generate plain sentences without prefix of who is speaking. DO NOT use ${companion.name}: prefix. 
  
          ${companion.instruction}
  
          Below are relevant details about ${companion.name}'s past and the conversation you are in.
          ${relevantHistory}
  
  
          ${recentChatHistory}\n${companion.name}:`
            )
                .catch(console.error)
        )
        const cleaned = resp.replaceAll(",", "");
        const chunks = cleaned.split("\n")
        const response = chunks[0]
        await memoryManager.writeToHistory("" + response.trim(), companionKey)
        var Readable = require("stream").Readable
        let s = new Readable();
        s.push(response)
        s.push(null)
        if (response !== undefined && response.length > 1) {
            memoryManager.writeToHistory("" + response.trim(), companionKey)
            await prismadb.companion.update({
                where: {
                    id: params.chatId,
                },
                data: {
                    message: {
                        create: {
                            content: response.trim(),
                            role: "system",
                            userId: userId,
                        }
                    }

                }
            })
        }

        return new StreamingTextResponse(s)
    } catch (error) {
        console.log("[CHAT_POST]", error);

        return new NextResponse("Internal error", { status: 500 })
    }

}