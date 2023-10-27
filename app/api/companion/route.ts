import prismadb from "@/prisma/db";
import { auth,currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
   
    try {
        const body =await req.json();
        const user = await currentUser()
        const { userId } : { userId: string | null } = auth();
        const {src,name,description,instruction,seed,categoryId} = body;
        if (!userId) {
            return new NextResponse("UUnauthorized",{status:401})
        }
        if (!src||!name||!description ||!instruction ||!seed||!categoryId) {
            return new NextResponse("Missing required fields",{status:400})
        }
      
        
        const companion = await prismadb.companion.create({
            data:{
                categoryId,
                userId:user?.id||userId ||"user_2WzCCsToJJpsepjozVDIuxUC7Zh",
                userName:user?.firstName||"米喜喜",
                // userId:"user_2WzCCsToJJpsepjozVDIuxUC7Zh",
                // userName:'西西',
                src,
                name,
                description,
                instruction:instruction,
                seed,
            }
        })
       return NextResponse.json(companion,{status:200})
       
    } catch (error) {
        console.log("COMPANION_POST",error);
        return new NextResponse(`COMPANION_POST interal error`,{status:500})
    }
}