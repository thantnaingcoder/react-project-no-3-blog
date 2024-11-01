
import { UserAuthForm } from "@/components/user-auth-form";


import {  useNavigate } from "react-router-dom";


export default function Auth() {
 const nav= useNavigate()
   
    
    
  
    

	return (
    
		<div className="flex items-center justify-center p-3 h-screen">
     
  <div className="mx-auto flex flex-col justify-center border shadow-2xl shadow-pink-950 rounded-lg px-5 py-10 space-y-6 w-[500px]">
    <div className="flex flex-col space-y-2 text-center">
      <h1 className="text-4xl font-semibold tracking-tight mb-5">Login</h1>
    </div>
    
    <UserAuthForm />
    <p
      onClick={() => nav('/register')}
      className="text-sm select-none text-muted-foreground text-center hover:underline cursor-pointer hover:text-blue-500"
    >
      or create a new account
    </p>
  </div>
  
</div>


	);
}
