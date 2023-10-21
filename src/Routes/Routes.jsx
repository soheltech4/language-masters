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
      path : '/dashboard',
      element : <Dashboard></Dashboard>,
      children : [
        {
          path:'/dashboard/mycart',
          element : <MyCart></MyCart>
        }
      ]
    }
  ]);

 
