import { Button } from '@/components/atoms/Button/Button';

export const Home = (): JSX.Element => {
  return (
    <main>
      <h1>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>
      <Button kind="primary">Primary</Button>
      <Button kind="secondary">Secondary</Button>
    </main>
  );
};

export default Home;
