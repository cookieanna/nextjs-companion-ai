import prismadb from "@/prisma/db";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
   
    try {
        const body =await req.json();
       
        
        const user = await currentUser()
        const {src,name,description,instructions,seed,categoryId} = body;
        // if (!user ||!user.id||!user.firstName) {
        //     return new NextResponse("UUnauthorized",{status:401})
        // }
        if (!src||!name||!description ||!instructions ||!seed||!categoryId) {
            return new NextResponse("Missing required fields",{status:400})
        }
      
        
        const companion = await prismadb.companion.create({
            data:{
                categoryId,
                // userId:user.id,
                // userName:user.firstName,
                userId:"user_2WzCCsToJJpsepjozVDIuxUC7Zh",
                userName:'西西',
                src,
                name,
                description,
                instruction:instructions,
                seed,
            }
        })
       return NextResponse.json(companion,{status:200})
       
    } catch (error) {
        console.log("COMPANION_POST",error);
        return new NextResponse(`anna interal error`,{status:500})
    }
}