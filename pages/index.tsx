import styled from 'styled-components';

import { Button } from '@/components/atoms/Button/Button';
import constants from '@/components/constants';

const HomeLayout = styled('main')`
  display: grid;
  grid-template-columns: 2fr 1fr;
  height: 100vh;

  section:nth-child(2) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const Home = (): JSX.Element => {
  return (
    <HomeLayout>
      <section>
        {constants.home.pictures.map((picture) => (
          <p key={picture}>{picture}</p>
        ))}
      </section>
      <section>
        <h1>{constants.title}</h1>
        <Button kind="primary">{constants.home.enter}</Button>
      </section>
    </HomeLayout>
  );
};

export default Home;
