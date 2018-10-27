import React from 'react';
import { shallow } from 'enzyme';
import NetlifyFormComposer from '../NetlifyFormComposer';

it('should render', () => {
  const wrapper = shallow(<NetlifyFormComposer formName="test">{jest.fn()}</NetlifyFormComposer>);

  expect(wrapper).toHaveLength(1);
});

it('should call children function with state', () => {
  const children = jest.fn();
  const wrapper = shallow(<NetlifyFormComposer formName="test">{children}</NetlifyFormComposer>);

  expect(children).toBeCalledWith({
    formName: 'test',
    submitted: false,
    submissionError: false,
    handleSubmit: wrapper.instance().handleSubmit,
    handleResetFormSubmission: wrapper.instance().handleResetFormSubmission,
  });
});

describe('handleSubmit', () => {
  describe('all cases optimistically', () => {
    let oldFetch;

    beforeEach(() => {
      oldFetch = global.fetch;
      global.fetch = jest.fn(() => Promise.resolve({}));
      global.console.error = jest.fn();
    });

    afterEach(() => {
      global.fetch = oldFetch;
    });

    it('should set state', () => {
      const wrapper = shallow(
        <NetlifyFormComposer formName="test">{jest.fn()}</NetlifyFormComposer>,
      );

      wrapper
        .instance()
        .handleSubmit({}, {})
        .then(() => {
          expect(wrapper.state().submitted).toBe(true);
          expect(wrapper.state().submissionError).toBe(false);
        });
    });

    it('should call onSubmitSuccess prop', () => {
      const onSubmitSuccess = jest.fn();
      const wrapper = shallow(
        <NetlifyFormComposer formName="test" onSubmitSuccess={onSubmitSuccess}>
          {jest.fn()}
        </NetlifyFormComposer>,
      );

      wrapper
        .instance()
        .handleSubmit({}, {})
        .then(() => {
          expect(onSubmitSuccess).toBeCalled();
        });
    });
  });

  describe('success', () => {
    let oldFetch;

    beforeEach(() => {
      oldFetch = global.fetch;
      global.fetch = jest.fn(() => Promise.resolve({}));
      global.console.error = jest.fn();
    });

    afterEach(() => {
      global.fetch = oldFetch;
    });

    it('should call fetch with the encoded headers', () => {
      const wrapper = shallow(
        <NetlifyFormComposer formName="test">{jest.fn()}</NetlifyFormComposer>,
      );
      return wrapper
        .instance()
        .handleSubmit(
          {
            name: 'Eric',
            phone: '123-456-7890',
            email: 'test@test.com',
          },
          {},
        )
        .then(() => {
          expect(global.fetch).toBeCalledWith('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'form-name=test&name=Eric&phone=123-456-7890&email=test%40test.com',
          });
        });
    });

    it('should call setSubmitting action when defined', () => {
      const setSubmitting = jest.fn();
      const wrapper = shallow(
        <NetlifyFormComposer formName="test">{jest.fn()}</NetlifyFormComposer>,
      );
      return wrapper
        .instance()
        .handleSubmit(
          {},
          {
            setSubmitting,
          },
        )
        .then(() => {
          expect(setSubmitting).toBeCalledWith(false);
        });
    });
  });

  describe('error', () => {
    let oldFetch;
    let oldError;
    const error = new Error('oh no!');

    beforeEach(() => {
      oldFetch = global.fetch;
      oldError = global.console.error;
      global.fetch = jest.fn(() => Promise.reject(error));
      global.console.error = jest.fn();
    });

    afterEach(() => {
      global.fetch = oldFetch;
      global.console.error = oldError;
    });

    it('logs the error', () => {
      const wrapper = shallow(
        <NetlifyFormComposer formName="test">{jest.fn()}</NetlifyFormComposer>,
      );
      return wrapper
        .instance()
        .handleSubmit({}, {})
        .then(() => {
          expect(global.console.error).toBeCalledWith(error);
        });
    });

    it('sets submissionError to true', () => {
      const wrapper = shallow(
        <NetlifyFormComposer formName="test">{jest.fn()}</NetlifyFormComposer>,
      );
      return wrapper
        .instance()
        .handleSubmit({}, {})
        .then(() => {
          expect(wrapper.state().submissionError).toBe(true);
        });
    });

    it('calls the onSubmitError prop with the error', () => {
      const onSubmitError = jest.fn();
      const wrapper = shallow(
        <NetlifyFormComposer formName="test" onSubmitError={onSubmitError}>
          {jest.fn()}
        </NetlifyFormComposer>,
      );
      return wrapper
        .instance()
        .handleSubmit({}, {})
        .then(() => {
          expect(onSubmitError).toBeCalledWith(error);
        });
    });
  });
});
