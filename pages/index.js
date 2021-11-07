import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Link from "next/link";

const Page = () => {

  return (
    <Row className={'mt-5'}>
      <div className={'text-center'}>
        <h2>You may create your own challenge...</h2>
        <Button variant='success'>Create a challenge</Button>
      </div>
      <div className={'mt-5 text-center'}>
        <h3>or participate in an existing one!</h3>
        <Link href={'/challenges'} passHref>
          <Button variant='info'>View challenges</Button>
        </Link>
      </div>
    </Row>
  );
}

export default Page;
