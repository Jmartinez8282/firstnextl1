import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";


//GET getting data
//POST Creating data
//PUT Updating data
//DELETE deleting data


export async function GET(request: NextRequest) {
    //fetch users from a data base
    const users = await prisma.user.findMany()
    //hard code our data
    return NextResponse.json(users)
}

export async function POST(request: NextRequest) {
     const body = await request.json();
     //Validate the data
     //If invalid, return 400

     const validation = schema.safeParse(body)
     if(!validation.success)
        return NextResponse.json(validation.error.errors,{status: 400})
     //Else, return the data that was created
     return NextResponse.json({id: 1, name: body.name},{status: 201})
     

}