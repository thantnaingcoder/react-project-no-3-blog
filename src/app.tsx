import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Layout from "./layout";
import Home from "./pages/home";
import CreateBlog from "./pages/create-blog";
import Posts from "./pages/posts";

import Detail from "./pages/detailPost";
import Profile from "./pages/login";
import UserProfilePage from "./pages/user-profile-page";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
// import NotfoundPage from "./pages/notFound";
const token = localStorage.getItem("token");
const router = createBrowserRouter([
	{
		path:  "/",
		element:   <LoginPage/>,
	},

	{
		path: "/register",
		element:  <RegisterPage/>,
	},

	{
				element: <Layout />,
				children: [
					{
						index: true,
						path: "/home",
						element: <Home />,
					},
					{
						path: "/create-blog",
						element: <CreateBlog />,
					},
					{
						path: "/posts",
						element: <Posts />,
					},
					{
						path: "/post/:id",
						element: <Detail />,
					},
					{
						path : "/profile",
						element : <UserProfilePage/>
					},
					{
						path : "/test",
						element : <Profile/>
					}
				],
   }
		//  {
		// 		path: "*",
		// 		element: <NotfoundPage />,
		//   },
]);

  if(!token){
	router.navigate("/")
  }

export default function App() {
	return <RouterProvider router={router} />;
}
