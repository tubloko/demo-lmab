import React from 'react';
import { gql } from "@apollo/client";
import { parseCookies } from "../common/helpers/parseCookies";
import createApolloClient from "../apolloClient";
import { useSetIsLoggedIn } from "../common/hooks/useSetIsLoggedIn";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from "next/link";

const Page = () => {
  return (
    <>
      <Row>
        {challenges.map(({ id }) => {
          return (
            <Col key={id}>
              <Card>
                <Card.Header>Featured</Card.Header>
                <Card.Body>
                  <Card.Title>Special title treatment</Card.Title>
                  <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                  </Card.Text>
                  <Link href={`/challenges/${id}`} passHref>
                    <Button variant="primary">Go to the challenge room</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
}

// export const getServerSideProps = async ({ req, res }) => {
//   const data = parseCookies(req);
//
//   if (res) {
//     if (Object.keys(data).length === 0 && data.constructor === Object) {
//       res.writeHead(301, { Location: "/" });
//       res.end();
//     }
//   }
//
//   try {
//     const { token, id } = JSON.parse(data.user);
//     const client = createApolloClient(token);
//     const { data: { getUser: { user } } } = await client.query({ query: GET_USER, variables: { id } });
//     return { props: { data: user } };
//   } catch (error) {
//     return { props: { data: { errorMessage: error.message } } };
//   }
// }

const challenges = [
  { header: 'Featured', id: 2, subheader: 'Special title treatment', description: 'With supporting text below as a natural lead-in to additional content.' },
  { header: 'Featured', id: 3, subheader: 'Special title treatment', description: 'With supporting text below as a natural lead-in to additional content.' },
  { header: 'Featured', id: 4, subheader: 'Special title treatment', description: 'With supporting text below as a natural lead-in to additional content.' },
  { header: 'Featured', id: 5, subheader: 'Special title treatment', description: 'With supporting text below as a natural lead-in to additional content.' },
]

export default Page;
