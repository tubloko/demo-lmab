import React from 'react';
import { useQuery } from "@apollo/client";
import styled from 'styled-components';
import { RICH_BLACK, BANANA_MANIA } from '../common/constants/colors';
import { IS_LOGGED_IN } from "../common/queries";

const Header = styled.header`
  font-size: 20px;
  background-color: ${RICH_BLACK};
  color: ${BANANA_MANIA};
  text-transform: uppercase;
  cursor: pointer;
`;

const Nav = styled.nav`
  display: flex;
  height: 70px;
  align-content: center;
  flex-wrap: wrap;
`;

const Ul = styled.ul`
  display: flex;
  justify-content: center;
  gap: 5%;
  width: 40%;
  list-style: none;
`;

const NavBar = () => {
  const { data } = useQuery(IS_LOGGED_IN);

  return (
    <Header>
      <Nav>
        <Ul>
          <li>dashboard</li>
          <li>my challenges</li>
          <li>profile</li>
        </Ul>
      </Nav>
    </Header>
  );
}

export default NavBar;
