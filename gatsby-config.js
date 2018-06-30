module.exports = {
  siteMetadata: {
    title: 'Priority Construction',
    desc: 'Priority Construction Corp. is dedicated to complete different types of concrete projects throughout the Baltimore area by using highly skilled employees and paying attention to every detail of the project.',
    keywords: [
      'construction',
      'Baltimore',
      'Maryland',
      'concrete',
      'brick',
      'flatwork',
    ],
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

// pathPrefix: "/levelupgatsby",
