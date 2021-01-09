import Filter from 'bad-words';
import React from 'react';
import styled from 'styled-components';

import Layout from '@/components/layouts/Layout';
import { Form } from '@/components/molecules/Form/Form';
import { CreateMessage, Message } from '@/components/molecules/Message/Message';
import { useAuth } from '@/config/auth';
import constants from '@/config/constants';
import { createMessage, getAllMessages, Message as MessageProps } from '@/config/messages';

const MessageLayout = styled('div')`
  display: grid;
  grid-template-columns: 1fr;
  form > div {
    width: 100%;
  }
  ${constants.devices.laptop} {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: masonry;
  }
`;

interface MessagesFormFields extends Record<string, unknown> {
  text: string;
}

const messagesResolver = ({ text }) => {
  const filter = new Filter();
  if (filter.isProfane(text)) {
    return {
      values: {},
      errors: {
        text: 'Please no profanity'
      }
    };
  }
  return {
    values: { text },
    errors: {}
  };
};

export const Messages = (): JSX.Element => {
  const { user } = useAuth();
  const [submitted, setSubmitted] = React.useState(false);
  const [messages, setMessages] = React.useState<MessageProps[]>([]);
  React.useEffect(() => {
    getAllMessages().then((data) => setMessages(data));
  }, [submitted]);

  const handleSubmit = ({ text }: MessagesFormFields) => {
    createMessage(user, text).then(() => setSubmitted(true));
  };

  return (
    <Layout>
      <MessageLayout>
        <CreateMessage>
          <Form
            fields={[
              {
                id: 'text',
                name: 'Message',
                placeholder:
                  'Enter your messages/wishes here! Thank you for being a part of the ceremonies remotely.',
                type: 'textareaWithCTA',
                cta: constants.messages.enter
              }
            ]}
            onSubmit={handleSubmit}
            type="inline"
            resolver={messagesResolver}
          />
        </CreateMessage>
        {messages.map((message) => (
          <Message {...message} key={message.id} />
        ))}
      </MessageLayout>
    </Layout>
  );
};

export default Messages;
