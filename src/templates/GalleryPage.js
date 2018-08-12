import React from 'react';
import PropTypes from 'prop-types';

const GalleryPage = ({ data }) => {
  if (!data) return null;
  return (
    <div>
      <h1>This is the gallery page</h1>
      <pre>
        <code>{JSON.stringify(data)}</code>
      </pre>
    </div>
  );
};

GalleryPage.propTypes = {
  data: PropTypes.shape({
    // markdownRemark: PropTypes.shape({
    //   frontmatter: PropTypes.shape({
    //     date: PropTypes.string,
    //     title: PropTypes.string,
    //   }),
    //   html: PropTypes.string,
    // }),
  }).isRequired,
};

export default GalleryPage;

export const query = graphql`
  query GalleryPageQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        name
        location
        coverPhoto
      }
      html
    }
  }
`;
