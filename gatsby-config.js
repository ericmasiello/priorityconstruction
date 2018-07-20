require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: 'Priority Construction',
    desc:
      'Priority Construction Corp. is dedicated to complete different types of concrete projects throughout the Baltimore area by using highly skilled employees and paying attention to every detail of the project.',
    address: {
      streetAddress: '1315 West Hamburg Street',
      city: 'Baltimore',
      state: 'MD',
      zip: 21203,
    },
    phone: '410-244-6773',
    fax: '410-244-6778',
    email: 'info@priorityconst.com',
    keywords: ['construction', 'Baltimore', 'Maryland', 'concrete', 'brick', 'flatwork'],
    googleMapKey: process.env.GOOGLE_MAP_KEY,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'img',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'img',
        path: `${__dirname}/static/assets`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        excerpt_separator: '<!-- end -->',
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-netlify-cms',
  ],
};
