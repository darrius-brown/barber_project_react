import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'

function NavBar(userSignedIn, accessToken) {
  return (
    <Navbar bg="dark" variant="dark" className='position-absolute top-0 end-50 mt-4'>
     <Container>
       <Navbar.Brand className='navbar-play'>BarbMe</Navbar.Brand>
       <Nav className="me-auto">
         <Nav.Link>
         <Link to='/' style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <h5>Home</h5>
         </Link>
         </Nav.Link>
         <Nav.Link>
         <Link to='/leaderboard' style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <h5>Favorites</h5>
         </Link>
         </Nav.Link>
         <Nav.Link>
         <Link to='/gamerec' style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <h5>Messages</h5>
         </Link>
         </Nav.Link>
         <Nav.Link>
       {userSignedIn.accessToken  ? 
         <Link to='/signout' style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <h5>Sign Out</h5>
         </Link>
         :
         <Link to='/signin' style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <h5>Sign in</h5>
         </Link>
         }
         </Nav.Link>

       </Nav>
     </Container>
   </Navbar>
  )
}

export default NavBar