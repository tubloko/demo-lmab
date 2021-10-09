import React from 'react';
import styled from 'styled-components';
import NavBar from './NavBar';

const PageWrapper = styled.div`
  max-width: 1300px;
  margin: auto;
`;

const Layout = ({ children }) => {
  return (
    <PageWrapper>
      <NavBar />
      {children}
    </PageWrapper>
  );
}

export default Layout;
