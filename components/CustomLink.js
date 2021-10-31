import React from 'react';
import Link from "next/link";
import styled from 'styled-components';
import { BANANA_MANIA, WHITE } from "../common/constants/colors";

const A = styled.a`
  color: ${BANANA_MANIA};
  text-decoration: none;
  transition: 0.6s;
  display: block;
  :hover {
    color: ${WHITE};
    transform: scale(0.9);
    transition: 0.6s;
  }
`;

const CustomLink = ({ href, name }) => {
  return (
    <Link href={href}>
      <A>{name}</A>
    </Link>
  );
}

export { CustomLink };
