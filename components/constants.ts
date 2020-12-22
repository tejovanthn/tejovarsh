const size = {
  mobile: '425px',
  laptop: '1024px'
};

export default {
  title: 'Tejo ❤️ Varsh',
  home: {
    enter: 'ENTER',
    pictures: ['picture']
  },
  nav: [
    {
      title: 'Story',
      path: '/story'
    },
    {
      title: 'Watch',
      path: '/watch'
    },
    {
      title: 'Messages',
      path: '/messages'
    },
    {
      title: 'Schedule',
      path: '/schedule'
    }
  ],
  devices: {
    mobile: `@media (min-width: ${size.mobile})`,
    laptop: `@media (min-width: ${size.laptop})`
  },
  timeline: {
    blockSize: '1rem'
  },
  theme: {
    colorA: 'teal',
    colorB: 'lightblue',
    white: 'white',
    black: 'black'
  }
};
