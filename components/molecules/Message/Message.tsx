import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import NextImage from 'next/image';
import React from 'react';
import styled from 'styled-components';

import { Button } from '@/components/atoms/Button/Button';
import { useAuth } from '@/config/auth';
import constants from '@/config/constants';
import { archiveMessage, Message as MessageProps } from '@/config/messages';

dayjs.extend(RelativeTime);

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

  div {
    grid-area: icon;
  }
  img {
    border-radius: 50%;
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

export const Message: React.FC<MessageProps> = ({ id, user, createdAt, text }) => {
  const { user: authUser } = useAuth();
  return (
    <MessagePrimitive>
      <NextImage src={user.photoURL} alt={user.displayName} width={50} height={50} />
      <h3>{user.displayName}</h3>
      <small>{dayjs(createdAt.toMillis()).fromNow()}</small>
      <p>{text}</p>
      {authUser && constants.admins.includes(authUser.email) ? (
        <Button kind="secondary" onClick={() => archiveMessage(id)}>
          Archive
        </Button>
      ) : null}
    </MessagePrimitive>
  );
};

export const CreateMessage: React.FC = ({ children }) => {
  return <Card>{children}</Card>;
};

export default Message;
