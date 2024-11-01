import { useNavigate } from "react-router-dom"


const NotfoundPage = () => {
    const nav= useNavigate()
  return (
    <div className=" flex h-screen items-center justify-center ">
        
       <p onClick={() => nav("/")} className=" text-2xl hover:underline hover:text-blue-600">  login  to your account</p>
        
        </div>
  )
}

export default NotfoundPage