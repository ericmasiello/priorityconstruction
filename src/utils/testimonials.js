const markdownRemarkToTestimonial = ({ node }) => ({
  quote: node.html,
  author: node.frontmatter.author,
  title: node.frontmatter.title,
});

export default markdownRemarkToTestimonial;
