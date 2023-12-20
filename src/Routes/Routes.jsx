import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Shared/Login/Login";
import SignUp from "../Pages/Shared/Sign Up/SignUp";
import AllClass from "../Pages/All Class/AllClass";
import Dashboard from "../Layouts/Dashboard";
import MyCart from "../Pages/Dashboard/MyCart/MyCart";
import InstructorDetials from "../Pages/Home/Instructor/InstructorDetials";
import ClassDetails from "../Class Details/ClassDetails";
import Users from "../Pages/Dashboard/Users/Users";
import AddClass from "../Pages/Dashboard/Add Class/AddClass";
import AllofClasses from "../Pages/Dashboard/All of Classes/AllofClasses";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/allclass",
        element: <AllClass></AllClass>
      },
      {
        path: '/allclass/:_id',
        element: <ClassDetails></ClassDetails>,
        loader: ({ params }) => fetch(`https://language-masters-server.vercel.app/allclass/${params._id}`)
      },
      {
        path: '/allinstructor/:_id',
        element: <InstructorDetials></InstructorDetials>,
        loader: ({ params }) => fetch(`https://language-masters-server.vercel.app/allinstructor/${params._id}`)
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: '/dashboard/allclass',
        element: <AllofClasses></AllofClasses>
      },
      {
        path: '/dashboard/mycart',
        element: <MyCart></MyCart>
      },
      {
        path: '/dashboard/users',
        element: <Users></Users>
      },
      {
        path: '/dashboard/addclass',
        element: <AddClass></AddClass>
      }
    ]
  }
]);


