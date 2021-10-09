import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { gql, useMutation } from "@apollo/client";

const REGISTER = gql`
  mutation Register($nickname: String! $email: String! $password: String! $googleId: String $firstName: String $lastName: String) {
    register(nickname: $nickname email: $email password: $password googleId: $googleId firstName: $firstName lastName: $lastName) {
      user {
        email
        googleId
        nickname
        firstName
        lastName
        token
        id
      } 
    }
  }
`;

const Register = () => {
  const { query, push } = useRouter();
  const [_, setCookie] = useCookies();
  const [nickname, setNickname] = useState(query.nickname || '');
  const [email, setEmail] = useState(query.email || '');
  const [password, setPassword] = useState('');

  const [register, { loading, error }] = useMutation(REGISTER, {
    errorPolicy: 'ignore',
    onCompleted: (data) => {
      try {
        console.log(data);
        const data = { id: data.register.user.id, token: data.register.user.token, googleId: data.register.user.googleId };
        setCookie("user", JSON.stringify(data), {
          path: "/",
          maxAge: 60 * 60 * 60,
          sameSite: true,
        });
      } catch (err) {
        console.log(err);
      }
      push('/');
    }
  });

  if (loading) return <p>loading...</p>;
  if (error) return <p>Something went wrong...{error.message}</p>;

  return (
    <div>
      <p>name</p>
      <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
      <p>email</p>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      <p>password</p>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <div>
        <button onClick={() => register({
          variables: {
            nickname,
            email,
            googleId: query.googleId,
            password,
          }
        })}>Sign up</button>
      </div>
    </div>
  );
}

export default Register;
