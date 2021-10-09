import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from "next/router";

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

const Login = () => {
  const { push } = useRouter();
  const [_, setCookie] = useCookies(["user"]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login] = useMutation(LOGIN, {
    onCompleted: () => push('/')
  });

  const handleSignIn = async () => {
    try {
      const { data: { login: { user } } } = await login({
        variables: {
          email,
          password
        }
      });

      setCookie("user", JSON.stringify(user), {
        path: "/",
        maxAge: 60 * 60 * 60,
        sameSite: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="enter email" /> <br/>
        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="enter password" />
      </div>
      <button onClick={handleSignIn}>login</button>
    </>
  )
}
export default Login
