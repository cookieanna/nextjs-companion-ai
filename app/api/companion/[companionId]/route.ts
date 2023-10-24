import prismadb from "@/prisma/db";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req:Request,{params}:{params:{companionId:string}}) {
   
    try {
        const body =await req.json();
        const user = await currentUser()
        const {src,name,description,instructions,seed,categoryId} = body;
        
        if (!params.companionId) {
            return new NextResponse("companion id is required",{status:400})
        }
        // if (!user ||!user.id||!user.firstName) {
        //     console.log(params.companionId);
            
        //     return new NextResponse("UUnauthorized",{status:401})
        // }
        if (!src||!name||!description ||!instructions ||!seed||!categoryId) {
            return new NextResponse("Missing required fields",{status:400})
        }
      
        
        const companion = await prismadb.companion.update({
            where:{
                id:params.companionId
            },
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
        console.log("COMPANION_PATCH",error);
        return new NextResponse(`COMPANION_PATCH interal error`,{status:500})
    }
}