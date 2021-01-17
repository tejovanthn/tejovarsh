module.exports = {
  images: {
    // loader: 'cloudinary',
    domains: [
      ...'lh1,lh2,lh3,lh4,lh5,lh6,lh7,lh8,lh9'
        .split(',')
        .map((subdomain) => `${subdomain}.googleusercontent.com`),
      'res.cloudinary.com'
    ]
  }
};
