import React, {useEffect, useState} from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { MessageList } from "../../../components/MessageList";

const SEND_MESSAGE = gql`
  mutation CreateChat($content: String! $from: String!) {
    createChat(content: $content from: $from) {
      id
      content
      from
      createdAt
    }
  }
`;

const GET_CHALLENGE_ROOM = gql`
  query Chat {
    chats {
      id
      content
      from
      createdAt
    }
  }
`;

const SUBSCRIPTION_CHALLENGE_ROOM = gql`
  subscription MessageSent {
    messageSent {
      id
      content
      from
      createdAt
    }
  }
`;

const ChallengeRoom = () => {
  const { subscribeToMore, data: messages, loading: messagesLoading } = useQuery(GET_CHALLENGE_ROOM);
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const [message, setMessage] = useState('');

  useEffect(() => {
    subscribeToMore({
      document: SUBSCRIPTION_CHALLENGE_ROOM,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        return {
          chats: [
            subscriptionData.data.messageSent,
            ...prev.chats,
          ]
        }
      }
    });
  }, []);

  if (messagesLoading) return <p>Loading...</p>;

  const handleClick = () => {
    sendMessage({
      variables: {
        content: message,
        from: 'user',
      }
    });
    setMessage('');
  }

  return (
    <div>
      <h4>Chat</h4>
      <MessageList messages={messages} />
      <div>
        <input type="text" value={message} onChange={e => setMessage(e.target.value)}/><br/>
        <button onClick={handleClick}>send</button>
      </div>
    </div>
  );
}

export default ChallengeRoom;
