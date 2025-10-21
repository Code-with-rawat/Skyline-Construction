import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const NavSection = () => {
  return (
     <header>
        <div className='container py-3'>
         <Navbar expand="lg">
            <Navbar.Brand href="#home" className='logo' >
             <img 
              src="https://media.licdn.com/dms/image/v2/D4D0BAQFZ5JnUxvi_gw/company-logo_200_200/company-logo_200_200/0/1697117749867?e=2147483647&v=beta&t=-Z5NCCFwskC5nvGj9lfwq2x1VqkfrYxzB1-FIiia9lk"   // <-- replace with your actual logo path
              alt="Skyline Logo" 
              className="me-2"          // adds space between logo and text
              style={{ width: "40px", height: "40px",borderRadius: '10px', objectFit: "contain" }}
            /><span>Skyline</span> Constructions</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link href="/" className='nav-link'>Home</Nav.Link>
                <Nav.Link href="/About" className='nav-link'>About us</Nav.Link>
                <Nav.Link href="/services" className='nav-link'>Services</Nav.Link>
                <Nav.Link href="/projects" className='nav-link'>Projects</Nav.Link>
                <Nav.Link href="/blogs" className='nav-link'>Blogs</Nav.Link>
                <Nav.Link href="/contact-us" className='nav-link'>Contact us</Nav.Link>

    
              </Nav>
            </Navbar.Collapse>
        </Navbar>
        </div> 
        </header>
  )
}

export default NavSection
