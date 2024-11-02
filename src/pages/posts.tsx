import Skeleton from "@/components/skeleton";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { PlaceholdersAndVanishInput } from "../../src/components/ui/placeholders-and-vanish-input";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

interface BlogPost {
	id: number;
	title: string;
	excerpt: string;
	date: string;
	author: string;
	imageUrl: string;
}

interface Blog {
	id: number;
	title: string;
	content: string;
}

function timeAgo(dateString: string) {
	const postDate = new Date(dateString);
	const now = new Date();
	const diffInSeconds = Math.floor((now - postDate) / 1000);

	const secondsInMinute = 60;
	const secondsInHour = 3600;
	const secondsInDay = 86400;

	if (diffInSeconds < secondsInMinute) {
		return `${diffInSeconds} seconds ago`;
	} else if (diffInSeconds < secondsInHour) {
		const minutes = Math.floor(diffInSeconds / secondsInMinute);
		return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
	} else if (diffInSeconds < secondsInDay) {
		const hours = Math.floor(diffInSeconds / secondsInHour);
		return `${hours} hour${hours > 1 ? "s" : ""} ago`;
	} else {
		const days = Math.floor(diffInSeconds / secondsInDay);
		return `${days} day${days > 1 ? "s" : ""} ago`;
	}
}

// const blogPosts: BlogPost[] = [
//   {
//     id: 1,
//     title: "Getting Started with React",
//     excerpt: "Learn the basics of React and start building your first component.",
//     date: "2023-05-15",
//     author: "Jane Doe",
//     imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2OSkAwlG7IC7xPkq6ECsSLAHR7BHHkU0eeA&s"
//   },
//   {
//     id: 2,
//     title: "Advanced State Management in React",
//     excerpt: "Explore advanced techniques for managing state in complex React applications.",
//     date: "2023-06-02",
//     author: "John Smith",
//     imageUrl: "https://media.assettype.com/analyticsinsight%2F2024-07%2F7b5ef9c7-c673-42e7-bd55-6094e6669b04%2F10_AI_Photo_Editors_that_Will_Enhance_Your_Images.jpg"
//   },
//   {
//     id: 3,
//     title: "Building Responsive UIs with Tailwind CSS",
//     excerpt: "Discover how to create beautiful, responsive user interfaces using Tailwind CSS.",
//     date: "2023-06-20",
//     author: "Alice Johnson",
//     imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKnFGq33WJ1thoM_tciZ65E9gkQTRD7wyiIw&s"
//   },
//   {
//     id: 4,
//     title: "React Hooks: A Deep Dive",
//     excerpt: "Master the use of React Hooks to simplify your functional components.",
//     date: "2023-07-08",
//     author: "Bob Wilson",
//     imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlFzR64v1iEPW-DkPZuRmdEMM0TgxJutkWQQ&s"
//   },
//   {
//     id: 5,
//     title: "Optimizing React Performance",
//     excerpt: "Learn techniques to improve the performance of your React applications.",
//     date: "2023-07-25",
//     author: "Emma Brown",
//     imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF1Fp2Oc5Vqq0Q3dtFBy5B39u2Ykz9o5gKzA&s"
//   },
//   {
//     id: 6,
//     title: "Server-Side Rendering with React",
//     excerpt: "Explore the benefits of server-side rendering and how to implement it with React.",
//     date: "2023-08-12",
//     author: "Chris Davis",
//     imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdUUG3GAj6zw6cPV2szphvHXNdqWUBPvNGBg&s"
//   },
// ];

// lib/fetcher.js
const fetcher = (url: string ) => {
	const token = localStorage.getItem("token");

	return fetch(url, {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
    
    
	}).then(res => {
		if (!res.ok) {
			throw new Error("Network response was not ok");
		}
		return res.json();
	});
};

export default function Posts() {
  const parm = useParams()
  console.log(parm)
	const [query, setQuery] = useState("");
  const [page,setPage]=useState("")
	const [show, setShow] = useState(false);
	// const [error,setError] = useState()
	const nav = useNavigate();

	const placeholders = [
		"javascript",
		"react",
		"typescript",
		"tailwindcss",
		"nextjs",
		"framer-motion",
	];

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.value);
		setQuery(e.target.value);
	};
	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("submitted");
		setShow(true);
	};

	const { data, error, isLoading } = useSWR(
		page ? page : "http://localhost:3000/blog",
		fetcher
	);

	return (
		<div className="container mx-auto mt-20  lg:px-4 z-0 lg:py-8">
			{/* search blogs */}
			<div className=" flex flex-col justify-center lg:mb-5  items-center py-2">
				{/* <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
        Search Blogs
      </h2> */}
				<PlaceholdersAndVanishInput
          
					placeholders={placeholders}
					onChange={handleChange}
					onSubmit={onSubmit}
				/>
			</div>

			{show && <p>Search : {query}</p>}

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{isLoading &&
					[0, 1, 2, 3, 4, 5].map((i, index) => (
						<Skeleton key={index} />
					))}

				{data?.data?.map(post => (
					<article
						onClick={() => nav(`/post/${post.id}`)}
						key={post.id}
						className="border rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
						<img
							src={post.url}
							alt={`Cover for ${post.title}`}
							className="w-full h-48 object-fit object-center"
						/>
						<div className="p-6">
							<h2 className="text-2xl font-semibold  mb-2">
								{post.title}
							</h2>
							<p className=" mb-4">{post.excerpt}</p>
							<div className="flex justify-between items-center text-sm  mb-4">
								<span>{timeAgo(post.createdAt)}</span>
								<span>{post.author}</span>
							</div>
							<button
								onClick={() =>
									console.log(`Read more about ${post.title}`)
								}
								className="text-blue-600 hover:text-blue-800 transition-colors duration-300">
								Read More →
							</button>
						</div>
					</article>
				))}
			</div>

			{/* pagination */}
			<div className=" my-5">
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious href="#" />
						</PaginationItem>
						<PaginationItem >
							<PaginationLink href="#">1</PaginationLink>
						
						</PaginationItem>
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
						<PaginationItem>
							<PaginationNext href={data?.pagination?.nextPage}  />
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</div>
	);
}
