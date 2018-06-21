import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

const PostListing = ({ post }) => (
  <article>
    <h3>
      <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
    </h3>
    <span>{post.frontmatter.date}</span>
    <p>{post.excerpt}</p>
  </article>
);

PostListing.propTypes = {
  post: PropTypes.shape({
    fields: PropTypes.shape({
      slug: PropTypes.string,
    }),
    frontmatter: PropTypes.shape({
      title: PropTypes.string,
      date: PropTypes.string,
    }),
    excerpt: PropTypes.string,
  }).isRequired,
};

export default PostListing;
