import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import React from 'react';
import styled from 'styled-components';

import constants from '@/config/constants';
import { Message as MessageProps } from '@/config/messages';

dayjs.extend(LocalizedFormat);

const Card = styled('div')`
  box-shadow: 0.25rem 0.25rem 0.5rem 0rem rgba(0, 0, 0, 0.25);
  background-color: ${constants.theme.white};
  margin: 1rem;
  padding: 1rem;
  height: fit-content;
`;

const MessagePrimitive = styled(Card)`
  display: grid;
  grid-template-columns: 4rem auto;
  grid-template-areas:
    'icon name'
    'icon time'
    'message message';

  img {
    grid-area: icon;
    width: 3rem;
    border-radius: 4rem;
  }
  h3 {
    grid-area: name;
    margin: 0;
  }
  small {
    grid-area: time;
  }
  p {
    grid-area: message;
    margin: 0.5rem 0 0 0;
  }
`;

export const Message: React.FC<MessageProps> = ({ user, createdAt, text }) => {
  return (
    <MessagePrimitive>
      <img src={user.photoURL} alt={user.displayName} />
      <h3>{user.displayName}</h3>
      <small>{dayjs(createdAt.toMillis()).format('LT')}</small>
      <p>{text}</p>
    </MessagePrimitive>
  );
};

export const CreateMessage: React.FC = ({ children }) => {
  return <Card>{children}</Card>;
};

export default Message;
