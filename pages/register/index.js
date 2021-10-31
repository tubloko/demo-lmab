import React, {useState} from 'react';
import {useRouter} from 'next/router';
import {useCookies} from 'react-cookie';
import {gql, useApolloClient, useMutation} from "@apollo/client";
import {IS_LOGGED_IN} from "../../common/queries";
import * as qs from "qs";
import {useGoogleLogin} from "react-google-login";
import {REDIRECT_URL} from "../../common/constants/apiURLs";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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

const SIGN_IN_WITH_GOOGLE = gql`
  mutation SignInWithGoogle($accessToken: String!) {
    signInWithGoogle(accessToken: $accessToken) {
      user {
        email
        googleId
        nickname
        firstName
        lastName
      } 
    }
  }
`;

const RegisterPage = () => {
  const client = useApolloClient();
  const {query, push} = useRouter();
  const setCookie = useCookies(["user"]);
  const [nickname, setNickname] = useState(query.nickname || '');
  const [email, setEmail] = useState(query.email || '');
  const [password, setPassword] = useState('');

  const [register, {loading, error}] = useMutation(REGISTER);
  const [signInWithGoogle, {error: SignInWithGoogleError}] = useMutation(SIGN_IN_WITH_GOOGLE, {
    onCompleted: ({signInWithGoogle: {user: {email, googleId, nickname, firstName, lastName}}}) => {
      push({
        pathname: 'register',
        query: qs.stringify({
          email,
          googleId,
          nickname,
          firstName,
          lastName,
        }),
      });
      setNickname(nickname);
      setEmail(email);
    }
  });
  const {signIn} = useGoogleLogin({
    onSuccess: ({tokenId, googleId}) => signInWithGoogle({variables: {accessToken: tokenId, googleId}}),
    clientId: '1058652577809-befvkbiblen37vfvvdvf11c4pks8dnuq.apps.googleusercontent.com',
    redirectUri: REDIRECT_URL,
    onFailure: () => console.log('fail'),
  });

  const handleSignUp = async () => {
    try {
      const {data} = await register({
        variables: {
          nickname,
          email,
          googleId: query.googleId,
          password,
        }
      });
      const user = {id: data.register.user.id, token: data.register.user.token, googleId: data.register.user.googleId};

      setCookie[1]("user", JSON.stringify(user), {
        path: "/",
        maxAge: 60 * 60 * 60,
        sameSite: true,
      });
    } catch (err) {
      console.log(err);
    }
    push('/');
  }

  if (loading) return <p>loading...</p>;
  if (error) return <p>Something went wrong...{error.message}</p>;
  if (SignInWithGoogleError) return <p>Something went wrong...{SignInWithGoogleError.message}</p>;

  return (
    <>
      <Row>
        <Col sm='12' md='6' lg='6' className={'mt-2'}>
          <FloatingLabel controlId="floatingName" label="Nickname" className="mb-3">
            <Form.Control
              className={`${nickname ? 'is-valid' : ''}`}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              type="text"
              placeholder="Nickname"
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingEmail" label="Email" className="mb-3">
            <Form.Control className={`${email ? 'is-valid' : ''}`}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          placeholder="Email"
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
            <Form.Control className={`${password.length > 2 ? 'is-valid' : ''}`}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          placeholder="Password"
            />
          </FloatingLabel>
        </Col>
      </Row>
      <Row>
        <Col sm='12' md='6' lg='6' className={'mt-2'}>
          <Button onClick={handleSignUp} variant="outline-primary" size={'md'}>Sign up</Button>
        </Col>
      </Row>
      <Row>
        <Col sm='12' md='6' lg='6' className={'mt-2'}>
          <Button onClick={signIn} variant="outline-primary" size={'md'}>Sign up with google</Button>
        </Col>
      </Row>
    </>
  );
}

export default RegisterPage;
