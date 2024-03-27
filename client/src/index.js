import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Layout } from './components';
import { Author, AuthorPosts, CategoryPost, CreatePost, Dashboard, EditPost, ErrorPage, Home, Login, Logout, PostDetail, Register, UserPorfile,DeletePost } from './pages';
import UserProvider from './context/userContext';


const router=createBrowserRouter([
  {
    path:'/',
    element:<UserProvider><Layout/></UserProvider>,
    errorElement:<ErrorPage/>,
    children:[
      {index: true,element: <Home/>},
      {path:"/posts",element:<Home/>},
      {path:"/posts/:id",element: <PostDetail/>},
      {path:"/register",element: <Register/>},
      {path:"/login",element: <Login/>},
      {path:"/logout",element: <Logout/>},
      {path:"/profile/:id",element: <UserPorfile/>},
      {path:"/authors",element: <Author/>},
      {path:"/create",element: <CreatePost/>},
      {path:"/posts/:id/edit",element: <EditPost/>},  
      {path:"/posts/:id/delete",element: <DeletePost/>},  
      {path:"/myposts/:id",element: <Dashboard/>},
      {path:"/posts/users/:id",element: <AuthorPosts/>},
      {path:"/posts/categories/:category",element: <CategoryPost/>},
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

