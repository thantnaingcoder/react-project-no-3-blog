import { ModeToggle } from "@/components/mode-toggle";

import { Home, BookOpen, Mail, ArrowRight } from "lucide-react";


import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "./components/theme-provider";
import { useToast } from "@/hooks/use-toast"
import ScrollNav from "./components/scroll";





type Theme = "dark" | "light" | "system";
export default function Layout() {
	const location = useLocation()
	const {theme} = useTheme()
	
	
	const nav = useNavigate();
	
	
	
	return (

		
		<div className=" flex flex-col">
		<ScrollNav > 
			<header className={`px-4 lg:px-6 h-14 flex  border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60  items-center border-b shadow-2xl  `}>
				<p  onClick={() => nav("/home")}
					className="flex items-center justify-center"
					>
					<BookOpen className="h-6 w-6 mr-2" />
					
					<span className="font-bold hidden sm:block">Amazing Blog</span>
				</p>

				
				<nav className="ml-auto flex gap-5 items-center cursor-pointer sm:gap-6">
					<button  
			onClick={() => nav("/home")}
			className={`text-sm font-medium hover:underline underline-offset-4 ${location.pathname== "/home" && "underline"}`}
						>
						Home
					</button>
					<button  
					onClick={() => nav("/posts")}
						className={`text-sm font-medium hover:underline underline-offset-4 ${location.pathname== "/posts" && "underline"}`}
						>
						Blogs
					</button>
					<button  
					onClick={() => nav("/create-blog")}
						className={`text-sm font-medium hover:underline underline-offset-4 ${location.pathname== "/create-blog" && "underline"}`}
						>
						Create
					</button>
					<button  
					onClick={() => nav("/profile")}
					className={`text-sm font-medium hover:underline underline-offset-4 ${location.pathname== "/profile" && "underline"}`}
						>
						Profile
					</button>
					
					<ModeToggle />
				</nav>
				
			</header>
        </ScrollNav>
		
			<Outlet />
		
			
			

			<footer className="flex mt-auto flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
				<p className="text-xs text-muted-foreground ">
					© 2024 Amazing Blog. All rights reserved.
				</p>
				<nav className="sm:ml-auto flex gap-4 sm:gap-6">
					<a
						className="text-xs hover:underline underline-offset-4"
						href="#">
						Terms of Service
					</a>
					<a
						className="text-xs hover:underline underline-offset-4"
						href="#">
						Privacy
					</a>
				</nav>
			</footer>
		</div>
	);
}
