import React from 'react';
import Image from "next/image";
import { useCookies } from 'react-cookie';
import Link from 'next/link';
import {useApolloClient, useQuery} from "@apollo/client";
import styled from 'styled-components';
import { IS_LOGGED_IN } from "../common/queries";
import personPlaceholder from '../public/images/person_placeholder.png';
import {useRouter} from "next/router";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const NavBar = () => {
  const { push } = useRouter();
  const removeCookie = useCookies(['user']);
  const client = useApolloClient();
  const { data } = useQuery(IS_LOGGED_IN, { ssr: false });

  const logout = () => {
    removeCookie[2]('user', { path: '/' });
    client.cache.writeQuery({
      query: IS_LOGGED_IN,
      data: {
        isLoggedIn: false,
      },
    });
    push('/login');
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Lmab</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link href={'/'} passHref><Nav.Link>Dashboard</Nav.Link></Link>
            <Link href={'/challenges/my-challenges'} passHref><Nav.Link>My challenges</Nav.Link></Link>
            <Link href={'/profile'} passHref><Nav.Link>Profile</Nav.Link></Link>
          </Nav>
          <Nav>
            {!data?.isLoggedIn ? (
                <>
                  <Link href={'/login'} passHref><Nav.Link>Sign in</Nav.Link></Link>
                  <Link href={'/register'} passHref><Nav.Link>Sign up</Nav.Link></Link>
                </>
            ) : (
              <>
                <Image src={personPlaceholder} alt={'current user'} width={50} height={50} />
                <Nav.Link onClick={logout}>Log out</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
