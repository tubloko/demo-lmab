import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from "next/router";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const LOGIN = gql`
  mutation Login($email: String! $password: String!) {
    login(email: $email password: $password) {
      user {
        id 
        nickname 
        firstName 
        lastName 
        email 
        googleId 
        facebookId 
        token 
      }
    }
  }
`

const LoginPage = () => {
  const { push } = useRouter();
  const setCookie = useCookies(["user"]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login] = useMutation(LOGIN);

  const handleSignIn = async () => {
    try {
      const { data: { login: { user } } } = await login({
        variables: {
          email,
          password
        }
      });

      setCookie[1]("user", JSON.stringify(user), {
        path: "/",
        maxAge: 60 * 60 * 60,
        sameSite: true,
      });
    } catch (err) {
      console.log(err);
    }
    push('/');
  };

  return (
    <>
      <Row>
        <Col sm='12' md='6' lg='6' className={'mt-2'}>
          <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
            <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
          </FloatingLabel>
        </Col>
      </Row>
      <Row>
        <Col sm='12' md='6' lg='6' className={'mt-2'}>
          <Button onClick={handleSignIn} variant="outline-primary" size={'md'}>Log in</Button>
        </Col>
      </Row>
    </>
  )
}
export default LoginPage;
