import Skeleton from "@/components/skeleton";

import { useState } from "react";
import { PlaceholdersAndVanishInput } from "../../src/components/ui/placeholders-and-vanish-input";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { getCookie } from "react-use-cookie";
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

// lib/fetcher.js
const fetcher = (url: string) => {
  const token = getCookie("my_token");

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  });
};

export default function Posts() {
  const parm = useParams();
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);
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
    `http://localhost:3000/blog?page=${currentPage}`,
    fetcher
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = data?.pagination?.totalPages || 1;

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

        {data?.data?.map((post) => (
          <article
            onClick={() => nav(`/post/${post.id}`)}
            key={post.id}
            className="border rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <img
              src={post.url}
              alt={`Cover for ${post.title}`}
              className="w-full h-48 object-fit object-center"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold  mb-2">{post.title}</h2>
              <p className=" mb-4">{post.excerpt}</p>
              <div className="flex justify-between items-center text-sm  mb-4">
                <span>{timeAgo(post.createdAt)}</span>
                <span>{post.author}</span>
              </div>
              <button
                onClick={() =>
                  console.log(`Read more about ${post.title}`)
                }
                className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
              >
                Read More →
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* pagination */}
      <div className="my-5">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index + 1}>
                <PaginationLink
                  onClick={() => handlePageChange(index + 1)}
                  className={currentPage === index + 1 ? "bg-blue-100" : "cursor-pointer"}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
