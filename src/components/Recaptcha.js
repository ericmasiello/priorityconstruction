import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactRecaptcha from 'react-recaptcha';

export class Recaptcha extends React.Component {
  static displayName = 'Recaptcha';

  static propTypes = {
    className: PropTypes.string,
    recaptchaRef: PropTypes.shape({
      current: PropTypes.object,
    }),
  };

  render() {
    const { className, recaptchaRef, ...rest } = this.props;

    return (
      <div className={className}>
        <ReactRecaptcha ref={recaptchaRef} {...rest} />
      </div>
    );
  }
}

const StyledRecaptcha = styled(Recaptcha)``;

export default StyledRecaptcha;
