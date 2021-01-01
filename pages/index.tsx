import React from 'react';
import styled from 'styled-components';

import constants from '@/components/constants';
import { Form } from '@/components/molecules/Form/Form';

const HomeLayout = styled('main')`
  display: grid;
  height: 100vh;
  grid-template-rows: 15fr 1fr;

  .enter {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem;
  }
  ${constants.devices.laptop} {
    grid-template-columns: 2fr 1fr;
    grid-template-rows: unset;
  }
`;

export const Home = (): JSX.Element => {
  return (
    <HomeLayout>
      <section className="image">
        {constants.home.pictures.map((picture) => (
          <p key={picture}>{picture}</p>
        ))}
      </section>
      <section className="enter">
        <h1>{constants.title}</h1>
        <Form
          fields={[
            {
              id: 'passcode',
              name: 'Passcode',
              type: 'textWithCTA',
              cta: 'enter'
            }
          ]}
          onSubmit={(data) => console.log(data)}
          type="inline"
        />
      </section>
    </HomeLayout>
  );
};

export default Home;
