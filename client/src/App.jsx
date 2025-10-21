import React from "react"
import {BrowserRouter,Route,Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./Components/Frontend/Home";
import About from "./Components/Frontend/About";
import Services from "./Components/Frontend/Services"
import './assets/style.scss';
import Projects from "./Components/Frontend/Projects";
import Blogs from "./Components/Frontend/Blogs";
import Contact from "./Components/Frontend/Contact";
import Login from "./Components/Backend/Login";
import { ToastContainer, toast } from 'react-toastify';
import Dashboard from "./Components/Backend/Dashboard";
import RequireAuth from "./Components/Common/RequireAuth";
import Showservices from "./Components/Backend/Services/Showservices";
import Createservices from "./Components/Backend/Services/Createservices";
import Edit from "./Components/Backend/Services/Edit";
import Showprojects from "./Components/Backend/Projects/Showprojects";
import Createproject from "./Components/Backend/Projects/Createproject";
import Editproject from "./Components/Backend/Projects/Editproject";
import Showarticles from "./Components/Backend/Articles/Showarticles";
import Editarticles from "./Components/Backend/Articles/Editarticles";
import Createarticles from "./Components/Backend/Articles/Createarticles";
import Createtestmonials from "./Components/Backend/Testmonials/Createtestmonials";
import Edittestmonials from "./Components/Backend/Testmonials/Edittestmonials";
import Showtestmonials from "./Components/Backend/Testmonials/Showtestmonials";
import Showmembers from "./Components/Backend/Members/Showmembers";
import Createmembers from "./Components/Backend/Members/Createmembers";
import Editmembers from "./Components/Backend/Members/Editmembers";
import ServiceRetail from "./Components/Frontend/ServiceRetail";
import ProjectDetail from "./Components/Frontend/ProjectDetail";
import ArticleDetail from "./Components/Frontend/ArticleDetail";

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/services" element={<Services/>}/>
        <Route path="/projects" element={<Projects/>}/>
        <Route path="/blogs" element={<Blogs/>}/>
        <Route path="/contact-us" element={<Contact/>}/>
        <Route path="/service/:id" element={<ServiceRetail/>}/>
        <Route path="/project/:id" element={<ProjectDetail/>}/>
        <Route path="/article/:id" element={<ArticleDetail/>}/>
        <Route path="/admin/login" element={<Login/>}/>

        <Route path="/admin/dashboard" element={<RequireAuth> <Dashboard/> </RequireAuth>}/>
        <Route path="/admin/services" element={<RequireAuth> <Showservices/> </RequireAuth>}/>
        <Route path="/admin/services/create" element={<RequireAuth> <Createservices/> </RequireAuth>}/>
        <Route path="/admin/services/Edit/:id" element={<RequireAuth> <Edit/> </RequireAuth>}/>


        <Route path="/admin/projects/create" element={<RequireAuth> <Createproject/> </RequireAuth>}/>
        <Route path="/admin/projects" element={<RequireAuth> <Showprojects/> </RequireAuth>}/>
        <Route path="/admin/projects/Edit/:id" element={<RequireAuth> <Editproject/> </RequireAuth>}/>


        <Route path="/admin/articles" element={<RequireAuth> <Showarticles/> </RequireAuth>}/>
        <Route path="/admin/articles/Edit/:id" element={<RequireAuth> <Editarticles/> </RequireAuth>}/>
        <Route path="/admin/articles/create" element={<RequireAuth> <Createarticles/> </RequireAuth>}/>
        

        
        <Route path="/admin/testmonials" element={<RequireAuth> <Showtestmonials/> </RequireAuth>}/>
        <Route path="/admin/testmonials/Edit/:id" element={<RequireAuth> <Edittestmonials/> </RequireAuth>}/>
        <Route path="/admin/testmonials/create" element={<RequireAuth> <Createtestmonials/> </RequireAuth>}/>

        <Route path="/admin/members" element={<RequireAuth> <Showmembers/> </RequireAuth>}/>
        <Route path="/admin/members/create" element={<RequireAuth> <Createmembers/> </RequireAuth>}/>
        <Route path="/admin/members/Edit/:id" element={<RequireAuth> <Editmembers/> </RequireAuth>}/>
  

      </Routes>
    </BrowserRouter>
     <ToastContainer 
      position="top-center"
     />
    </>
  )
}

export default App
