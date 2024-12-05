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

export async function PUT(request:NextRequest,{params}:{params:{id:string}}) {
    //Validate the request of body
    const body = await request.json()
    //If invalid, return 400
    const validation = schema.safeParse(body)
    if(!validation.success)
        return NextResponse.json(validation.error.errors,{status: 400})

   const user = await prisma.user.findUnique({
        where: {id: parseInt(params.id)}
    });

    //If doesn't exist  404
    if(!user)
        return NextResponse.json({error: "User not Found"}, {status:404})
    //Fetch the user with the given id
       const updatedUser = await prisma.user.update({
            where: {id: user.id},
            data: {
                name: body.name,
                email:body.email
            }
        })
    //Update the User
    return NextResponse.json(updatedUser);
    //Return the updated user

}

export async function DELETE (request:NextRequest,{params}:{params:{id:string}}) {
        //Feched user db
        //If not found. 404
       const user = await prisma.user.findUnique({
            where: {id: parseInt(params.id)}
        })
        if(!user)
            return NextResponse.json({error: "user not found"},{status:404})
        //Delete the user db
         await prisma.user.delete({
            where: {id: user.id}
        })
        return NextResponse.json({})
        //Return 200 response
}