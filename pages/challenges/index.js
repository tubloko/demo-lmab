import React from 'react';
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { parseCookies } from "../../common/helpers/parseCookies";
import createApolloClient from "../../apolloClient";
import { GET_CHALLENGE_ROOMS_LIST } from '../../common/queries';

const Challenges = ({ challenges = [], errorMessage = '' }) => {

  if (errorMessage) {
    return <p className={'mt-3'}>OooOps, something went wrong...{errorMessage}</p>;
  }

  return (
    <Row className={'mt-3'}>
      {challenges.length ? challenges.map(({ id, title, description }) => {
        return (
          <Col key={id} md={4} sm={12} lg={4}>
            <Card>
              <Card.Header>Featured</Card.Header>
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <div className='d-flex justify-content-between'>
                  <Link href={`/challenges/view-challenge/${id}`} passHref>
                    <Button variant="outline-info">View</Button>
                  </Link>
                  <Link href={`/challenges/challenge-room/${id}`} passHref>
                    <Button variant="outline-primary">Subscribe</Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        );
      }) : <h3>There're no challenges yet</h3>}
    </Row>
  );
};

export async function getServerSideProps(ctx) {
  const data = parseCookies(ctx.req);

  try {
    const { token } = JSON.parse(data.user);
    const client = createApolloClient(token);
    const { data: { listChallengeRooms } } = await client.query({ query: GET_CHALLENGE_ROOMS_LIST });
    return { props: { challenges: listChallengeRooms } };
  } catch (error) {
    return { props: { errorMessage: error.message } };
  }
}

export default Challenges;
