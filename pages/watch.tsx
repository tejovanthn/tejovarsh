import dayjs from 'dayjs';
import React from 'react';
import styled from 'styled-components';

import Layout from '@/components/layouts/Layout';
import { Form } from '@/components/molecules/Form/Form';
import Message, { CreateMessage } from '@/components/molecules/Message/Message';
import { authSSR, useAuth } from '@/config/auth';
import constants from '@/config/constants';
import { createMessage, useMessages } from '@/config/messages';

import { MessagesFormFields, messagesResolver } from './messages';

const WatchLayout = styled('div')`
  display: grid;
  grid-template-columns: 1fr;

  section {
    height: calc(100vh - 10rem);
    overflow: scroll;
  }

  iframe#navbar {
    display: none;
  }

  ${constants.devices.laptop} {
    grid-template-columns: 2fr 1fr;
    section:nth-child(2) {
      width: 16rem;
    }
  }
`;

const WatchBlock: React.FC = () => {
  const videoLink = constants.videos.find((video) => dayjs().isSame(video.time, 'date'));
  if (videoLink) {
    return (
      <iframe
        title="TejoVarsh"
        width="100%"
        height="100%"
        src={videoLink.link}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }
  return <p>Coming Soon</p>;
};

export const Watch = (): JSX.Element => {
  const { user } = useAuth();
  const { messages } = useMessages();

  const handleSubmit = ({ text }: MessagesFormFields) => {
    createMessage(user, text);
  };

  return (
    <Layout>
      <WatchLayout>
        <section>
          <WatchBlock />
        </section>
        <section>
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
        </section>
      </WatchLayout>
    </Layout>
  );
};

export const getServerSideProps = authSSR;

export default React.memo(Watch);
