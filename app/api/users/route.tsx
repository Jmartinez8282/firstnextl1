import { NextRequest, NextResponse } from "next/server";

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