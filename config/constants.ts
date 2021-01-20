const size = {
  mobile: '425px',
  laptop: '1024px'
};

export default {
  title: 'Tejo ❤️ Varsh',
  imageBaseURL: 'https://res.cloudinary.com/tejovanthn/tejovarsh/',
  home: {
    enter: 'ENTER',
    pictures: [
      // 'photo6301000749227813762_yyqqxk',
      'photo6301000749227813772_obdxhz',
      'photo6301000749227813775_jixli5',
      // 'photo6301000749227813773_kxui6e',
      'photo6301000749227813764_hnlzwl',
      'photo6301000749227813771_jbxicj',
      'photo6301000749227813770_sknepc',
      'photo6301000749227813769_wz9e0m',
      'photo6301000749227813767_iaeece',
      'photo6301000749227813765_gcjeb0',
      // 'photo6301000749227813766_zpsz4s',
      'photo6301000749227813763_cskvfj'
    ]
  },
  messages: {
    enter: 'SEND'
  },
  nav: [
    // {
    //   title: 'Story',
    //   path: '/story'
    // },
    {
      title: 'Schedule',
      path: '/schedule'
    },
    {
      title: 'Watch',
      path: '/watch'
    },
    {
      title: 'Messages',
      path: '/messages'
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
    colorA: '#7b4a61',
    colorB: '#f178ca',
    white: 'white',
    black: 'black',
    red: 'red'
  },
  validPassCodes: ['AakarshitaRocks', 'Varsha<3Tejo', 'Varsha<3Tejo', 'AhanuCutest'],
  events: [
    {
      event: 'Welcome',
      time: '2020-01-17 12:00 Z'
    },
    {
      event: 'Engagement',
      time: '2020-01-17 12:30 Z'
    },
    {
      event: 'Varapuje',
      time: '2020-01-17 13:30 Z'
    },
    {
      event: 'Gowri Puje',
      time: '2020-01-18 03:00 Z'
    },
    {
      event: 'Muhurta',
      time: '2020-01-18 05:15 Z'
    },
    {
      event: 'Nagavalli',
      time: '2020-01-18 09:00 Z'
    }
  ],
  videos: [
    {
      title: 'Varapuje',
      link: 'https://www.youtube.com/embed/9wb3naTpyX8',
      time: '2021-01-17 12:00 Z'
    },
    {
      title: 'Muhurtam',
      link: 'https://www.youtube.com/embed/SlPEHcFtR3E',
      time: '2021-01-18 12:00 Z'
    }
  ]
};
