import React from 'react';
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

const Challenges = () => {
  return (
    <Row className={'mt-3'}>
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
      })}
    </Row>
  );
}

const challenges = [
  { header: 'Featured', id: 2, subheader: 'Special title treatment', description: 'With supporting text below as a natural lead-in to additional content.' },
  { header: 'Featured', id: 3, subheader: 'Special title treatment', description: 'With supporting text below as a natural lead-in to additional content.' },
  { header: 'Featured', id: 4, subheader: 'Special title treatment', description: 'With supporting text below as a natural lead-in to additional content.' },
  { header: 'Featured', id: 5, subheader: 'Special title treatment', description: 'With supporting text below as a natural lead-in to additional content.' },
]

export default Challenges;
