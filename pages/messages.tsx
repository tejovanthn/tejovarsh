import Filter from 'bad-words';
import React from 'react';
import { ResolverResult } from 'react-hook-form';
import styled from 'styled-components';

import Layout from '@/components/layouts/Layout';
import { Form } from '@/components/molecules/Form/Form';
import { CreateMessage, Message } from '@/components/molecules/Message/Message';
import { authSSR, useAuth } from '@/config/auth';
import constants from '@/config/constants';
import { createMessage, useMessages } from '@/config/messages';

const MessageLayout = styled('div')`
  display: grid;
  grid-template-columns: 1fr;
  form > div {
    width: 100%;
  }
  ${constants.devices.laptop} {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: masonry;
  }
`;

export interface MessagesFormFields extends Record<string, unknown> {
  text: string;
}

export const messagesResolver = ({
  text
}: MessagesFormFields): ResolverResult<MessagesFormFields> => {
  const filter = new Filter();
  if (filter.isProfane(text)) {
    return {
      values: {},
      errors: {
        text: { type: 'pattern', message: 'Please no profanity' }
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
  const { messages } = useMessages();

  const handleSubmit = ({ text }: MessagesFormFields) => {
    createMessage(user, text);
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

export const getServerSideProps = authSSR;

export default React.memo(Messages);
