import React from 'react';
import PageContainer from '../components/PageContainer';
import Type1 from '../components/Type1';

const NotFoundPage = () => (
  <PageContainer tag="section">
    <Type1>Page not found</Type1>
    <p>You just hit a page that doesn&#39;t exist... the sadness.</p>
  </PageContainer>
);

export default NotFoundPage;
