import React from 'react';
import { Col, Card, Button, Row } from "react-bootstrap";
import Link from "next/link";
import { parseCookies } from "../../common/helpers/parseCookies";
import createApolloClient from "../../apolloClient";
import {GET_CHALLENGE_ROOMS_LIST, GET_USER, ON_SUBSCRIBE_TO_CHALLENGE} from '../../common/queries';
import {useMutation} from "@apollo/client";

const Challenges = ({ challenges = [], user, errorMessage = '' }) => {
  const [onSubscribeMutation, { loading, error }] = useMutation(ON_SUBSCRIBE_TO_CHALLENGE);

  if (errorMessage) return <p className={'mt-3'}>OooOps, something went wrong...{errorMessage}</p>;
  if (error) return <p className={'mt-3 mb-3'}>OoOps...something went wrong {error.message}</p>;
  //todo 1.finish the handleOnSubscribe function. 2. implement view challenge page
  const handleOnSubscribe = async () => {
    await onSubscribeMutation({
      variables: {

      }
    })
  }

  return (
    <Row className={'mt-3'}>
      {challenges.length ? challenges.map(({ id, title, description }) => {
        const isUserSubscribed = user.challengeRoomsIds.includes(id);
        if (loading) return <p className={'mt-3 mb-3'}>Loading...</p>;

        return (
          <Col key={id} md={4} sm={12} lg={4}>
            <Card>
              {isUserSubscribed ? (
                <Card.Header style={{ backgroundColor: "lightgreen" }}>You've participated in the challenge!</Card.Header>
              ) : (
                <Card.Header style={{ backgroundColor: "darkred", color: 'white' }}>Apply now!</Card.Header>
              )}
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <div className='d-flex justify-content-between'>
                  <Link href={`/challenges/view-challenge/${id}`} passHref>
                    <Button variant="outline-info">View</Button>
                  </Link>
                  {!isUserSubscribed ? <Link href={`/challenges/challenge-room/${id}`} passHref>
                    <Button onClick={handleOnSubscribe} variant="outline-primary">Subscribe</Button>
                  </Link> : null}
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
    const { token, id } = JSON.parse(data.user);
    const client = createApolloClient(token);
    const { data: { listChallengeRooms } } = await client.query({ query: GET_CHALLENGE_ROOMS_LIST });
    const { data: { getUser: { user } } } = await client.query({ query: GET_USER, variables: { id } });

    return { props: { challenges: listChallengeRooms, user } };
  } catch (error) {
    return { props: { errorMessage: error.message } };
  }
}

export default Challenges;
