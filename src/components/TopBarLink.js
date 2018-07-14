import tinyColor from 'tinycolor2';
import styled from 'styled-components';
import MailIcon from './MailIcon';
import PhoneIcon from './PhoneIcon';
import { pxToRem } from '../styles/utils';
import { COLORS } from '../styles/vars';

const TopBarLink = styled.a`
  display: flex;
  align-items: center;
  padding: ${pxToRem(4)} ${pxToRem(8)};
  transition: background-color 0.3s;
  border-radius: 2px;

  &:hover {
    background-color: ${tinyColor(COLORS.highlight)
      .lighten(20)
      .toRgbString()};
  }

  ${MailIcon}, ${PhoneIcon} {
    height: ${pxToRem(18)};
    margin-right: ${pxToRem(8)};
  }
`;

export default TopBarLink;
