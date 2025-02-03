import { useToast } from '@/hooks/use-toast';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import useSWR from 'swr';

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
  

export default function UserProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  const [user, setUser] = useState({
    name: "Jane Doe",
    bio: "Passionate writer | Tech enthusiast | Coffee lover",
    avatar: "/placeholder.svg?height=128&width=128",
    followers: 1234,
    following: 567,
    location: "San Francisco, CA",
    website: "https://janedoe.com",
    totalPosts: 42
  })

  const nav = useNavigate();
	const { toast } = useToast()
	const {data, error ,isLoading} = useSWR(`${import.meta.env.VITE_API_BASE_URL}/getUserDetail`,fetcher)
   
   const currentUser = data?.currentUser
   const userBlogs = data?.blogs.slice(-4).reverse()
  //  console.log(currentUser)
  //  console.log(userBlogs.slice(-3))
	



  const handleLogout = () => {
    localStorage.removeItem("token");
		nav("/");
		toast({
			title: "Logged out",
			description: "You have been logged out.",
		})
  }

  const handleEditProfile = () => {
    setIsEditing(true)
  }

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Implement actual save logic here
  }

  return (
    <div className=" container mx-auto px-4 py-16">
      {/* Header with Logout */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl mx-auto font-bold ">User Profile</h1>
     
      
      
      </header>

      {/* Profile Section */}
      <div className=" shadow-lg rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row items-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbbRyztwP4IewuHqOOoIwHqQllLmGNj2eJSZCsq5rwGPCiHPdsN-I14jfc6VSCfOmjMfo&usqp=CAU"
              alt={currentUser?.name}
              width={128}
              height={128}
              className="rounded-full bg-black border border-black  mb-4 sm:mb-0 sm:mr-6"
            />
            <div className="text-center sm:text-left flex-grow">
              {isEditing ? (
                <input
                  
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({...user, name: e.target.value})}
                  className="text-2xl dark:bg-slate-950 font-bold mb-2 w-full border rounded px-2 py-1"
                />
              ) : (
                <h2 className="text-2xl font-bold mb-2">{currentUser?.name}</h2>
              )}
              {isEditing ? (
                <textarea
                  
                  value={user.bio}
                  onChange={(e) => setUser({...user, bio: e.target.value})}
                  className="text-gray-600 dark:bg-slate-950 mb-4 w-full border rounded px-2 py-1"
                  rows={3}
                />
              ) : (
                <p className="text-gray-600 mb-4">{user.bio}</p>
              )}
              <div className="flex justify-center sm:justify-start space-x-4 text-sm text-gray-500">
                <span>{user.followers} Followers</span>
                {/* <span>{user.following} Following</span> */}
                <span>{data?.blogs?.length} Posts</span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
            <div className="text-gray-600 mb-4 sm:mb-0">
              <p>📍 {user.location}</p>
              <p>🌐 <a href={user.website} className="text-blue-500 hover:underline">{user.website}</a></p>
            </div>

            <div className=' flex space-x-4 items-center'>
               {/* {isEditing ? (
              <button
                onClick={handleSaveProfile}
                className="bg-green-500 hover:bg-green-600  font-bold py-2 px-4 rounded transition duration-300"
              >
                Save Profile
              </button>
            ) : (
              <button
                onClick={handleEditProfile}
                className="bg-blue-500 hover:bg-blue-600  font-bold py-2 px-4 rounded transition duration-300"
              >
                Edit Profile
              </button>
            )} */}
               {/* logout dialog */}
        <AlertDialog>
        <AlertDialogTrigger className="bg-red-500 hover:bg-red-600  font-bold py-2 px-4 rounded transition duration-300">Logout</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure Logout ?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently logout your account
              and need to login again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
            <AlertDialogAction onClick={ () => handleLogout()}>Yes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
            </div>
           
            
          </div>
        </div>
      </div>

      {/* Recent Posts Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {userBlogs?.map((post : {id:number,author:string ,title : string,content:string,createdAt:string}) => (
            <article key={post.id} className=" border rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 ">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.content}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{post.createdAt}</span>
                  {/* <div className="flex space-x-4">
                    <span>❤️ {post.likes}</span>
                    <span>💬 {post.comments}</span>
                  </div> */}
                </div>
                <button 
                  className="mt-4 text-blue-600 hover:text-blue-800 transition-colors duration-300"
                  onClick={() => console.log(`Read more about ${post.title}`)}
                >
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

    
    </div>
  )
}