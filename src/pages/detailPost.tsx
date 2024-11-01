import { BackgroundGradientDemo } from "@/components/background-gradient"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle ,CardFooter} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, MessageCircle, ThumbsUp } from "lucide-react"
import { useEffect, useState } from "react"

import { Link, useNavigate, useParams } from "react-router-dom"
import useSWR from "swr"

const getMyanmartime = (time: string) => {
  const utcDate = new Date(time);
const myanmarTime = utcDate.toLocaleString('my-MM', { 
  timeZone: 'Asia/Yangon', 
  hour: '2-digit', 
  minute: '2-digit', 
  second: '2-digit', 
  hour12: true // Use false for 24-hour format
});

  return myanmarTime
}

const fetcher = (url: string) => {
  const token = localStorage.getItem("token")
  
  return fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  .then(res => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json();
  });
};

export default function BlogDetail() {
  const id = useParams().id
  const {data, error ,isLoading} = useSWR(`http://localhost:3000/blog/${id}`,fetcher)
   
  return (
     <>
     {error &&  <p>{error.message}</p>}

     {isLoading ? 
     
     <p>loading...</p> 
     
     : <div className="container mx-auto px-4 py-20">
      <article className="prose prose-lg dark:prose-invert mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">{data?.title}</h1>
          <div className="flex items-center justify-center space-x-4 text-muted-foreground">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Author" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span>{data?.author}</span>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-2" />
              <span>{getMyanmartime(data?.createdAt)}</span>
            </div>
          </div>
        </header>

        <img
          src={data?.url}
          alt="Blog post cover image"
          loading="lazy"
          className="rounded-lg object-cover mb-8 mx-auto"
        />

        <div className="mb-8">
          <p>
            {data?.content}
          </p>

          {/* <h2 className="text-2xl font-bold mt-6 mb-4">1. The Rise of AI-Assisted Development</h2>
          <p>
            Artificial Intelligence is no longer just a buzzword; it's becoming an integral part of the development
            process. AI-powered tools are helping developers write cleaner code, catch bugs earlier, and even generate
            entire components based on natural language descriptions.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-4">2. WebAssembly Goes Mainstream</h2>
          <p>
            WebAssembly (Wasm) is gaining traction as a way to run high-performance code in the browser. In 2024, we
            expect to see more applications leveraging Wasm to bring desktop-like performance to web applications,
            especially in areas like gaming, video editing, and complex data visualizations.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-4">3. The Continued Evolution of JavaScript Frameworks</h2>
          <p>
            While React, Vue, and Angular continue to dominate the landscape, we're seeing a new generation of
            frameworks that prioritize simplicity and performance. Keep an eye on frameworks like Svelte and Solid,
            which are gaining popularity for their compile-time approach and excellent developer experience.
          </p> */}
        </div>

        {/* <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Web Development</Badge>
            <Badge variant="secondary">JavaScript</Badge>
            <Badge variant="secondary">AI</Badge>
            <Badge variant="secondary">WebAssembly</Badge>
            <Badge variant="secondary">Frameworks</Badge>
          </div>
        </div> */}

        <Separator className="my-8" />

        <section className="mb-8">
          <h3 className="text-2xl font-bold mb-4">Comments</h3>
          <Card className="mb-4">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Jane Smith" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>Jane Smith</CardTitle>
                  <p className="text-sm text-muted-foreground">March 16, 2024</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>Great article! I'm particularly excited about the advancements in AI-assisted development.</p>
            </CardContent>
          </Card>
          <Button variant="ghost" className="w-full">Load More Comments</Button>
        </section>

        <Separator className="my-8" />

<section className="w-full py-12 md:py-24 lg:py-32 ">
          <div className=" px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Relative Posts</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <BackgroundGradientDemo key={i} >
                <Card  className="rounded-3xl">
                  <CardHeader>
                    <CardTitle>The Future of AI in Everyday Life</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Exploring how artificial intelligence is reshaping our daily routines and interactions.</p>
                  </CardContent>
                  <CardFooter>
                    <a className="text-sm underline underline-offset-2" href="#">
                      Read More
                    </a>
                  </CardFooter>
                </Card>
                </BackgroundGradientDemo>
              ))}
            </div>
          </div>
        </section>
      </article>
    </div>}



     
     
     
     
     
     </>
  )
}