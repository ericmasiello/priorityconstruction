import React from 'react';
import PropTypes from 'prop-types';

const PostPage = ({ data }) => {
  if (!data) return null;
  return (
    <div>
      <span>{data.markdownRemark.frontmatter.date}</span>
      <h1>{data.markdownRemark.frontmatter.title}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: data.markdownRemark.html,
        }}
      />
    </div>
  );
};

PostPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        date: PropTypes.string,
        title: PropTypes.string,
      }),
      html: PropTypes.string,
    }),
  }),
};

export default PostPage;

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD YYYY")
      }
    }
  }
`;
