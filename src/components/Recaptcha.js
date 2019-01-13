import React from 'react';
import styled from 'styled-components';
import ReactRecaptcha from 'react-recaptcha';

export class Recaptcha extends React.Component {
  static displayName = 'Recaptcha';

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
