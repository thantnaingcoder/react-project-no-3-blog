'use client'
import React from 'react'
import { useState } from 'react'
import { BookOpen, Eye, EyeOff } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useNavigate } from 'react-router-dom'
import { Icons } from "@/components/icons";
import { Button } from '@/components/ui/button'
import useCookie from "react-use-cookie";
import { BackgroundGradientDemo } from '@/components/background-gradient'
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    keepLoggedIn: false
  })
  
 
  const [token, setToken] = useCookie("my_token");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [error, setError] = React.useState<object>();
	const nav = useNavigate();
	const { toast } = useToast();
	

	// const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
		

	

		
	// };


  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    
    try {
			setIsLoading(true);
			const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email: formData.email, password : formData.password }),
			});

			if (response.status == 400) {
				const { error } = await response.json();
				setError(error);
				toast({
					title: error,
				});
				setIsLoading(false);
			}

			// Handle non-OK status
			if (!response.ok) {
				setIsLoading(false);
				throw new Error(
					`Response status: ${response.status} - ${response.statusText}`
				);
			}

			if (response.ok) {
				const { token } = await response.json();

				if (token) {
					localStorage.setItem("token", token);
          setToken(token);
					
				}
				toast({
					title: "Login successful",
				});
				setIsLoading(false);
				nav("/home");
			}
		} catch (error) {
			console.error("An error occurred:", error instanceof Error ? error.message : "Unknown error");
			setIsLoading(false);
		}
  }

  return (
    
    <div className="min-h-screen flex items-center justify-center container ">
      
      <div className="w-full max-w-md p-8  dark:shadow-purple-600  shadow-2xl  rounded-lg">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 mr-2" />
            <span className="text-xl font-bold">Amazing Blogs</span>
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-center  mb-2">
          Hi, Welcome Back
        </h1>
        <p className=" text-center mb-8">
          Enter your credentials to continue
        </p>
  
      
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium  mb-1">
              Email Address 
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border dark:bg-slate-900   rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="info@codedthemes.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium  mb-1">
              Password
            </label>
            <div className="relative">
              <input
                required
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full dark:bg-slate-900 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2  hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                
                type="checkbox"
                checked={formData.keepLoggedIn}
                onChange={(e) => setFormData({ ...formData, keepLoggedIn: e.target.checked })}
                className="w-4 h-4 text-purple-600  border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="ml-2 text-sm ">Keep me logged in</span>
            </label>
            
          </div>

          <Button
						className=" bg-purple-600 w-full "
						disabled={isLoading}>
						{isLoading && (
							<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
						)}
						Login
					</Button>

         <div className=' flex items-center justify-center'>
         <p className="text-center text-sm text-gray-600 cursor-pointer ">
            Don't have an account?
            
          </p>
          <Button variant="ghost" onClick={() => nav("/register")} className="text-purple-600 hover:bg-inherit hover:underline hover:text-purple-500">
              Register
            </Button>
         </div>
        </form>
      </div>
    </div>
    
  )
}