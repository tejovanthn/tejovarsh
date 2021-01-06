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
  },
  validPassCodes: ['AakarshitaRocks', 'Varsha<3Tejo']
};