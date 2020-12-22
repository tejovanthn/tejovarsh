import React from 'react';
import { Story } from 'types';

import Layout from '@/components/layouts/Layout';
import { Timeline } from '@/components/molecules/Timeline/Timeline';

const story: Story[] = [
  {
    date: 1583870626000,
    title: 'Tj told his parents',
    description: 'Tj finally told his parents about wanting to marry Varsha',
    media: {
      image: 'path/to/image',
      caption: 'just before the lockdown started'
    }
  },
  {
    date: 1601201026000,
    title: 'Back home',
    description: 'we came back to our homes from chennai'
  },
  {
    date: 1604225026000,
    title: 'Engagement',
    description: "We got engaged in Mysore at Varsha's home",
    media: {
      image: 'path/to/image',
      caption: 'the families'
    }
  }
];

export const Home = (): JSX.Element => {
  return (
    <Layout>
      <Timeline story={story}></Timeline>
    </Layout>
  );
};

export default Home;
