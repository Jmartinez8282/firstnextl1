import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";



// interface Props {
//     params: {id: number}
// }


export async function GET(request:NextRequest,{params}:{params:{id:string}}) {

    //fetch the data from a db
     const user = await prisma.user.findUnique({
        where: {id: parseInt(params.id)}
    })

    if(!user) 
        return NextResponse.json({error: 'Userer not found'}, {status: 404})
        return NextResponse.json(user)

}

export async function PUT(request:NextRequest,{params}:{params:{id:number}}) {
    //Validate the request of body
    const body = await request.json()
    //If invalid, return 400
    const validation = schema.safeParse(body)
    if(!validation.success)
        return NextResponse.json(validation.error.errors,{status: 400})
    //If doesn't exist  404
    if(params.id > 10)
        return NextResponse.json({error: "User not Found"}, {status:404})
    //Fetch the user with the given id
    //Update the User
    return NextResponse.json({id:1, name:body.name});
    //Return the updated user

}

export function DELETE (request:NextRequest,{params}:{params:{id:number}}) {
        //Feched user db
        //If not found. 404
        if(params.id > 10)
            return NextResponse.json({error: "user not found"},{status:404})
        //Delete the user db
        return NextResponse.json({})
        //Return 200 response
}