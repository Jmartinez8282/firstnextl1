import Link from "next/link"
import UserTable from "./UserTable"
import { Suspense } from "react"

interface Props {
  searchParams: {sortOrder: string}
}



const UsersPage = async ({searchParams: {sortOrder}}:Props) => {

  console.log(sortOrder)

  return (
    <>
    <h1>Users</h1>
    {sortOrder}
    <Link href="/users/new" className="btn btn-primary" >New user</Link>
  
    <UserTable sortOrder={sortOrder} />

    
  
    </>

  )
}

export default UsersPage