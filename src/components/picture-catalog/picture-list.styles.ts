import { css } from 'emotion';

export const navLink = css`
  box-sizing: border-box;
  padding: 6px 12px;
  margin-right: 0.5em;
  display: inline-block;
  color: #000;
  text-decoration: none;
  &:hover {
    text-decoration: none;
    color: #fff;
    background-color: #604020;
  }
`;

export const navLinkActive = css`
  box-sizing: border-box;
  padding: 6px 12px;
  margin-right: 0.5em;
  display: inline-block;
  text-decoration: none;
  color: #fff;
  background-color: #604020;
`;

export const pictureContainer = css`
  display: flex;
  justify-content: space-between;
`;