import * as React from "react";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useForm, SubmitHandler } from "react-hook-form";

import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
type Inputs = { email: string; password: string };

// const fetcher: <T>(...args: [RequestInfo, RequestInit?]) => Promise<T> = (...args) =>
// 	fetch(...args).then(res => {
// 	  if (!res.ok) {
// 		throw new Error('Failed to fetch');
// 	  }
// 	  return res.json();
// 	});

// 	const login = async (email : string, password : string) => {
// 		try {
// 		  const response = await fetch('http://localhost:3000/login', {
// 			method: 'POST',
// 			headers: {
// 			  'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify({ email, password }),
// 		  });

// 		  if (!response.ok) {
// 			throw new Error('Failed to login');
// 		  }

// 		  const data = await response.json();
// 		  console.log('Logged in, token:', data.token);
// 		  return data;
// 		} catch (error) {
// 		  console.error('Error during login:', error);
// 		  throw error;
// 		}
// 	  };

export function UserAuthForm({ ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [_, setError] = React.useState<object>();
  const nav = useNavigate();
  const { toast } = useToast();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

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

    reset();
  };

  return (
    <div className="grid gap-6  " {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-5">
          <div className="grid gap-3">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              className=" p-5"
              disabled={isLoading}
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
            />
            {errors.email && (
              <span className="text-pink-600 text-xs">Email is required</span>
            )}

            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="enter your password"
              type="password"
              autoCapitalize="none"
              autoComplete="false"
              autoCorrect="off"
              className=" p-5"
              disabled={isLoading}
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 20,
              })}
            />
            {errors.password && (
              <span className="text-pink-600 text-xs">
                Password is required
              </span>
            )}
          </div>
          <Button className=" bg-pink-600" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Login
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
