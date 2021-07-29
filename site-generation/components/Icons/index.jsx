import { Icon } from '@chakra-ui/react';
import { cloneElement, createElement } from 'react';
import PropTypes from 'prop-types';
import _Twitter from './Twitter';
import _LinkedIn from './LinkedIn';
import _GitHub from './GitHub';
import _External from './External';

const createIcon = (icon) => {
  const InnerIcon = ({ as, ...props }) => (
    <Icon {...props} as={(innerProps) => {
      const clone = cloneElement(icon, {
        ...innerProps,
        fill: 'currentColor',
      });
      return as ? createElement(as, props, clone) : clone;
    }} />
  );
  InnerIcon.propTypes = {
    as: PropTypes.elementType,
  };
  InnerIcon.defaultProps = {
    width: '1em',
    height: '1em',
  };
  return InnerIcon;
};

export const Twitter = createIcon(_Twitter);
export const LinkedIn = createIcon(_LinkedIn);
export const GitHub = createIcon(_GitHub);
export const External = createIcon(_External);
