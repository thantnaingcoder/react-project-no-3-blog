import Skeleton from "@/components/skeleton";

import { useState, useEffect } from "react";
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
import useDebounce from "@/hooks/useDebounce";
import { PlaceholdersAndVanishInput } from "../../src/components/ui/placeholders-and-vanish-input";

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

export default function Posts() {
  const parm = useParams();
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);
  const nav = useNavigate();

  const debouncedSearchTerm = useDebounce(query, 500);

  const placeholders = [
    "javascript",
    "react",
    "typescript",
    "tailwindcss",
    "nextjs",
    "framer-motion",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShow(true);
  };

  const { data, error, isLoading } = useSWR(
    debouncedSearchTerm && debouncedSearchTerm.length >= 1
      ? `${import.meta.env.VITE_API_BASE_URL}/blog/search?query=${encodeURIComponent(debouncedSearchTerm)}`
      : `${import.meta.env.VITE_API_BASE_URL}/blog?page=${currentPage}`,
    async (url) => {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${getCookie("my_token")}`,
            "Content-Type": "application/json",
          },
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch data');
        }
        
        const data = await response.json();
        console.log('API Response:', { url, data });
        return data;
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    }
  );

  const handlePageChange = (pageNumber: number) => {
    if (debouncedSearchTerm) {
      return; // Don't change pages during search
    }
    setCurrentPage(pageNumber);
  };

  const totalPages = data?.pagination?.totalPages || 1;

  const getVisiblePages = (currentPage: number, totalPages: number) => {
    if (totalPages <= 5) return [...Array(totalPages)].map((_, i) => i + 1);
    
    if (currentPage <= 3) return [1, 2, 3, 4, '...', totalPages];
    if (currentPage >= totalPages - 2) return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

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
      {!debouncedSearchTerm && data?.pagination && (
        <div className="my-5 overflow-x-auto">
          <Pagination>
            <PaginationContent className="flex flex-wrap justify-center gap-1 px-2">
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                  className={`${currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} sm:px-4 px-2`}
                />
              </PaginationItem>
              
              {getVisiblePages(currentPage, totalPages).map((pageNum, index) => (
                <PaginationItem key={index} className="hidden sm:block">
                  {pageNum === '...' ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      onClick={() => handlePageChange(pageNum as number)}
                      className={`${currentPage === pageNum ? "bg-blue-100" : "cursor-pointer"} min-w-[32px] flex justify-center`}
                    >
                      {pageNum}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              {/* Mobile version - just show current page */}
              <PaginationItem className="sm:hidden">
                <PaginationLink className="bg-blue-100">
                  {currentPage} / {totalPages}
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                  className={`${currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} sm:px-4 px-2`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
