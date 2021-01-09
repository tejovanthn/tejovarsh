import dayjs from 'dayjs';
import styled from 'styled-components';

import Layout from '@/components/layouts/Layout';
import { authSSR } from '@/config/auth';
import constants from '@/config/constants';

const WatchLayout = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WatchBlock: React.FC = () => {
  const videoLink = constants.videos.find((video) => dayjs().isSame(video.time, 'date'));
  if (videoLink) {
    return (
      <iframe
        title="TejoVarsh"
        width="560"
        height="315"
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
  return (
    <Layout>
      <WatchLayout>
        <WatchBlock />
      </WatchLayout>
    </Layout>
  );
};

export const getServerSideProps = authSSR;

export default Watch;
