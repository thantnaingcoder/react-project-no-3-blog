import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { BookOpen, Mail, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BackgroundBeamsDemo } from "@/components/animation-line";
import { HoverBorderGradientDemo } from "@/components/hover-border";
import { BackgroundGradientDemo } from "@/components/background-gradient";
import { useRef } from "react";

export default function Home() {
	const nav = useNavigate();
	const sectionRef = useRef<HTMLDivElement>(null);
	const words = [
		{
			text: "Welcome",
			className:
				"text-3xl text-blue-500 dark:text-blue-500  font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none",
		},
		{
			text: " To",
			className:
				"text-3xl  font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none",
		},
		{
			text: " Amazing",
			className:
				"text-3xl  font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none",
		},
		{
			text: " Blog",
			className:
				"text-3xl text-blue-500 dark:text-blue-500  font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none",
		},
	];

	const scrollToSection = () => {
		if (sectionRef.current) {
			const yOffset = -70; // Adjust this value based on your navbar height
			const y =
				sectionRef.current.getBoundingClientRect().top +
				window.scrollY  +
				yOffset;
			window.scrollTo({ top: y, behavior: "smooth" });
		}
	};

	return (
		<>
			<main className=" ">
				<BackgroundBeamsDemo>
					<section className="w-full z-50 content-center mx-auto py-12 md:py-24 lg:py-32 xl:py-48">
						<div className=" px-4 md:px-6">
							<div className="flex flex-col items-center space-y-4 text-center">
								<div className="lg:space-y-9">
									<TypewriterEffectSmooth
										cursorClassName=" h-8  "
										className=" flex justify-center text-center mx-auto"
										words={words}
									/>
									<p className="mx-auto max-w-[700px]  md:text-xl">
										Discover insightful articles, expert
										opinions, and the latest trends in
										technology, lifestyle,love,dream and
										more.
									</p>
								</div>
								<div className="space-x-4 flex items-center ">
									<Button onClick={() => nav("/posts")}>
										Start Reading
										<ArrowRight className="ml-2 h-4 w-4" />
									</Button>
									{/* <Button variant="outline">Learn More</Button> */}

									<div onClick={scrollToSection}>
										<HoverBorderGradientDemo children="Learn More" />
									</div>
								</div>
							</div>
						</div>
					</section>
				</BackgroundBeamsDemo>
				<section className="w-full  md:py-24 lg:py-32 ">
					<div className=" px-4 md:px-6">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
							Featured Posts
						</h2>
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{[1, 2, 3].map(i => (
								<BackgroundGradientDemo key={i}>
									<Card className=" rounded-3xl">
										<CardHeader>
											<CardTitle>
												The Future of AI in Everyday
												Life
											</CardTitle>
										</CardHeader>
										<CardContent>
											<p>
												Exploring how artificial
												intelligence is reshaping our
												daily routines and interactions.
											</p>
										</CardContent>
										<CardFooter>
											<a
												className="text-sm underline underline-offset-2"
												href="#">
												Read More
											</a>
										</CardFooter>
									</Card>
								</BackgroundGradientDemo>
							))}
						</div>
					</div>
				</section>

				<section
					ref={sectionRef}
					id="about"
					className="w-full   md:py-24 lg:py-32">
					<div className="flex flex-col lg:flex-row items-center justify-center text-center lg:text-start space-y-16 lg:space-x-20 px-10 pt-2 pb-10 lg:pt-6 lg:pb-24">
						<div className="relative w-64 h-64 mt-10">
							<div className="w-full h-full bg-cover bg-no-repeat bg-[url('https://res.cloudinary.com/doa84txts/image/upload/v1730200888/2024-10-18-233612337watermark.png_izv86t.jpg')] rounded-2xl shadow dark:shadow-dcardshadow" />
							<div className="absolute -inset-7 flex justify-center">
								<div className="flex flex-col justify-center items-center w-80 h-20 bg-white shadow-md dark:bg-[#020F27] border-2 border-primary rounded-2xl absolute -bottom-10">
									<h4 className="font-semibold text-2xl">
										Thant Naing
									</h4>
									<p className="mb-1">React Developer </p>
								</div>
							</div>
						</div>
						<div className="max-w-xl">
							<p className="font-bold text-4xl mb-4">
								Creater of Amazing Blog
							</p>
							<p className="leading-[2] text-base">
								Thant Naing is a versatile developer with a
								strong grasp of both frontend and backend
								technologies. With expertise in React and React
								Native, he brings a robust understanding of
								backend tools such as Node.js, Express, Prisma,
								and databases like MySQL, PostgreSQL, and
								SQLite. His portfolio showcases both web and
								mobile applications, alongside backend projects
								that highlight his full-stack development
								capabilities.
							</p>
						</div>
					</div>
				</section>

				<section className="w-full md:py-24 lg:py-32">
					<div className=" px-4 md:px-6">
						<div className="flex flex-col items-center space-y-4 text-center">
							<div className="space-y-2">
								<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
									Stay Updated
								</h2>
								<p className="mx-auto max-w-[600px]  md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
									Subscribe to our newsletter to receive the
									latest blog posts and updates.
								</p>
							</div>
							<div className="w-full max-w-sm space-y-2">
								<form
									className="flex space-x-2"
									onSubmit={e => e.preventDefault()}>
									<Input
										className="max-w-lg flex-1"
										placeholder="Enter your email"
										type="email"
									/>
									<Button type="submit">
										Subscribe
										<Mail className="ml-2 h-4 w-4" />
									</Button>
								</form>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
