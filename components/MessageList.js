import React from 'react';

const MessageList = ({ messages }) => {

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
