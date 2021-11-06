import React, { useEffect } from 'react';

const MessageList = ({ messages, subscribeToNewMessages }) => {

  useEffect(() => {
    subscribeToNewMessages();
  }, []);

  return (
    <>
      {
        messages.chats.map(({ id, content, from, createdAt }) => {
          return (
            <div key={id} style={{ border: '1px solid black' }}>
              <p>{content}</p>
              <p>{from}</p>
              <p>{createdAt}</p>
            </div>
          );
        })
      }
    </>
  );
}

export { MessageList };
