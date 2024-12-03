import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";

//GET getting data
//POST Creating data
//PUT Updating data
//DELETE deleting data


export function GET(request: NextRequest) {
    //fetch users from a data base
    //hard code our data
    return NextResponse.json([
        {id: 1, name: 'Jose'},
        {id: 2, name: 'Jacob'},
    ])
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