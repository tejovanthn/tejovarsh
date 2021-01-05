import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import { Image } from '@/components/atoms/Image/Image';
import { Form } from '@/components/molecules/Form/Form';
import { loginWithGoogle, useAuth } from '@/config/auth';
import constants from '@/config/constants';

const HomeLayout = styled('main')`
  display: block;
  max-height: 100vh;

  .image {
    height: 100vh;
    width: 100%;
  }

  .enter {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.4);
    position: absolute;
    bottom: 0;
    width: stretch;
  }
  ${constants.devices.laptop} {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: unset;

    .enter {
      position: unset;
      bottom: unset;
      background: none;
    }
  }
`;

interface IndexFormFields extends Record<string, unknown> {
  passcode: string;
}

const handleSubmit = ({ passcode }: IndexFormFields) => {
  if (constants.validPassCodes.includes(passcode)) {
    loginWithGoogle();
  }
};

export const Home = (): JSX.Element => {
  const router = useRouter();
  const { user } = useAuth();
  if (user) {
    console.log(user);
    router.push(constants.nav[0].path);
  }
  return (
    <HomeLayout>
      <section className="image">
        <Image />
      </section>
      <section className="enter">
        <h1>{constants.title}</h1>
        <Form
          fields={[
            {
              id: 'passcode',
              name: 'Passcode',
              type: 'textWithCTA',
              cta: constants.home.enter
            }
          ]}
          onSubmit={handleSubmit}
          type="inline"
        />
      </section>
    </HomeLayout>
  );
};

export default Home;
