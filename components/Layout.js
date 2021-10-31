import React from 'react';
import NavBar from './NavBar';
import Container from "react-bootstrap/Container";

const Layout = ({ children }) => {
  return (
    <Container fluid={'lg'}>
      <NavBar />
      {children}
    </Container>
  );
}

export default Layout;
