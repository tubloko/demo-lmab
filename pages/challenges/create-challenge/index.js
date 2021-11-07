import React, { useState } from 'react';
import { Row, FloatingLabel, Form, Button, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'

const CreateChallenge = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { push } = useRouter();

  return (
    <>
      <Row className={'mt-2'}>
        <Col sm={'1'} md={'1'} lg={'1'}>
          <div className={'text-center'}>
            <FontAwesomeIcon onClick={() => push('/')} icon={faArrowAltCircleLeft} size={'2x'} color={'darkred'} />
          </div>
        </Col>
        <Col>
          <FloatingLabel controlId="floatingTextarea" label="Title" className="mb-3">
            <Form.Control onChange={e => setTitle(e.target.value)} value={title} as="textarea" placeholder="Leave a comment here" />
          </FloatingLabel>
          <FloatingLabel controlId="floatingTextarea2" label="Description">
            <Form.Control
              value={description}
              onChange={e => setDescription(e.target.value)}
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: '100px' }}
            />
          </FloatingLabel>
          <div className='mt-3 text-end'>
            <Button variant='outline-success'>Create</Button>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default CreateChallenge;
