import * as React from "react";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
type Inputs = { name : string,email: string ,password: string};


export  function UserRegisterForm({ ...props }: UserAuthFormProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [error,setError] = React.useState<boolean>(false);
    const {toast} = useToast();
	const nav= useNavigate()
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async ({name,email,password}) => {
		
           console.log(name,email,password)
		try {
			setIsLoading(true);
			const response = await fetch("http://localhost:3000/register", {
				// Intentionally incorrect URL
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, email, password }),
			});

			if (response.status===201) {
				
				const {token,email} = await response.json()
			   if(token) {
				 localStorage.setItem("token",token)
			   }
				toast({
			   title: email +" has register" ,
			   });
			   setIsLoading(false);
			   nav("/home")
			   
		   }

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

			
		} catch (error : any) {
			// Catch and log any error
			console.error("An error occurred:", error.message);
			// toast({
			// 	title: error.message,
			// });
			setIsLoading(false);
		}

		reset();
	};

	return (
		<div
			className="grid gap-6 "
			{...props}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="grid gap-5">
					<div className="grid gap-3">
                    <Label
							className="sr-only"
							htmlFor="email">
							Name
						</Label>
						<Input
							id="name"
							placeholder="enter your name"
							type="name"
							autoCapitalize="none"
							autoComplete="name"
							autoCorrect="off"
							className= " p-5"
							disabled={isLoading}
							{...register("name", { required: true ,minLength: 3 })}
						/>
						{errors.email && (
							<span className="text-pink-600 text-xs">
								Email is required
							</span>
						)}
						<Label
							className="sr-only"
							htmlFor="email">
							Email
						</Label>
						<Input
							id="email"
							placeholder="name@example.com"
							type="email"
							autoCapitalize="none"
							autoComplete="email"
							autoCorrect="off"
							className= " p-5"
							disabled={isLoading}
							{...register("email", { required: true , pattern: /^\S+@\S+$/i })}
						/>
						{errors.email && (
							<span className="text-pink-600 text-xs">
								Email is required
							</span>
						)}
						<Label
							className="sr-only"
							htmlFor="password">
							Password
						</Label>
							<Input
							id="password"
							placeholder="enter your password"
							type="password"
							autoCapitalize="none"
							autoComplete="false"
							autoCorrect="off"
							className= " p-5"
							disabled={isLoading}
							{...register("password", { required: true , minLength: 6 , maxLength: 20 })}
						/>
						{errors.password && (
							<span className="text-pink-600 text-xs">
								Password is required
							</span>
						)}
					</div>
					<Button className=" bg-pink-600"  disabled={isLoading}>
						{isLoading && (
							<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
						)}
						Register
					</Button>
				</div>
			</form>
			{/* <div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">
						Or continue with
					</span>
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<Button
					variant="outline"
					type="button"
					disabled={isLoading}>
					{isLoading ? (
						<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
					) : (
						<Icons.gitHub className="mr-2 h-4 w-4" />
					)}{" "}
					GitHub
				</Button>
				<Button
					variant="outline"
					type="button"
					disabled={isLoading}>
					{isLoading ? (
						<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
					) : (
						<Icons.google className="mr-2 h-4 w-4" />
					)}{" "}
					Google
				</Button>
			</div> */}
		</div>
	);
}
