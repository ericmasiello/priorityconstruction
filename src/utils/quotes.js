const markdownRemarkToQuote = ({ node }) => ({
  quote: node.html,
  author: node.frontmatter.author,
  title: node.frontmatter.title,
});

export default markdownRemarkToQuote;
