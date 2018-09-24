import React from 'react';
import { shallow } from 'enzyme';
import NetlifyFormComposer from '../NetlifyFormComposer';

it('should render', () => {
  const wrapper = shallow(<NetlifyFormComposer name="test">{jest.fn()}</NetlifyFormComposer>);

  expect(wrapper).toHaveLength(1);
});

it('should call children function with state', () => {
  const children = jest.fn();
  const wrapper = shallow(<NetlifyFormComposer name="test">{children}</NetlifyFormComposer>);

  expect(children).toBeCalledWith({
    fields: {},
    form: {
      onSubmit: wrapper.instance().handleSubmit,
      method: 'POST',
      'data-netlify': true,
      name: 'test',
    },
    submissionState: null,
    handleResetFormSubmission: wrapper.instance().handleResetFormSubmission,
  });
});

it('should render field objects', () => {
  const children = jest.fn();
  const wrapper = shallow(
    <NetlifyFormComposer fields={['foo', 'bar', 'baz']} name="test">
      {children}
    </NetlifyFormComposer>,
  );

  expect(wrapper.state().fields).toEqual({
    foo: {
      name: 'foo',
      onChange: wrapper.instance().handleChange,
      value: '',
    },
    bar: {
      name: 'bar',
      onChange: wrapper.instance().handleChange,
      value: '',
    },
    baz: {
      name: 'baz',
      onChange: wrapper.instance().handleChange,
      value: '',
    },
  });
});

it('should update the value of a text field', () => {
  const children = jest.fn();
  const wrapper = shallow(
    <NetlifyFormComposer fields={['foo', 'bar', 'baz']} name="test">
      {children}
    </NetlifyFormComposer>,
  );

  wrapper.instance().handleChange({
    target: {
      name: 'bar',
      type: 'text',
      value: 'updated value',
    },
  });

  expect(wrapper.state().fields.bar).toEqual({
    name: 'bar',
    onChange: wrapper.instance().handleChange,
    value: 'updated value',
  });
});

// FIXME: does this work correctly?
// it('should update the value of a checkbox/radio field', () => {
//   const children = jest.fn();
//   const wrapper = shallow(
//     <NetlifyFormComposer
//       fields={{
//         foo: {},
//         bar: {
//           type: 'checkbox',
//           checked: false,
//         },
//       }}
//       name="test"
//     >
//       {children}
//     </NetlifyFormComposer>,
//   );

//   wrapper.instance().handleChange({
//     target: {
//       name: 'bar',
//       type: 'checkbox',
//       checked: true,
//     },
//   });

//   expect(wrapper.state().fields.bar).toEqual({
//     name: 'bar',
//     type: 'checkbox',
//     onChange: wrapper.instance().handleChange,
//   });
// });

describe('handleSubmit', () => {
  describe('success', () => {
    let oldFetch;
    beforeEach(() => {
      oldFetch = window.fetch;
      window.fetch = jest.fn(() => Promise.resolve({ success: true }));
    });

    afterEach(() => {
      window.fetch = oldFetch;
    });

    it('prevents default', () => {
      const preventDefault = jest.fn();
      const wrapper = shallow(
        <NetlifyFormComposer fields={['foo', 'bar', 'baz']} name="test">
          {jest.fn()}
        </NetlifyFormComposer>,
      );

      wrapper.instance().handleSubmit({
        preventDefault,
      });

      expect(preventDefault).toBeCalled();
    });

    it('resets state', () => {
      const preventDefault = jest.fn();
      const wrapper = shallow(
        <NetlifyFormComposer fields={['foo', 'bar', 'baz']} name="test">
          {jest.fn()}
        </NetlifyFormComposer>,
      );

      wrapper.instance().handleChange({
        target: {
          name: 'foo',
          type: 'text',
          value: 'foo',
        },
      });

      wrapper.instance().handleChange({
        target: {
          name: 'bar',
          type: 'text',
          value: 'bar',
        },
      });

      wrapper.instance().handleChange({
        target: {
          name: 'baz',
          type: 'text',
          value: 'baz',
        },
      });

      return wrapper
        .instance()
        .handleSubmit({
          preventDefault,
        })
        .then(() => {
          expect(wrapper.state().fields).toEqual({
            foo: {
              name: 'foo',
              onChange: wrapper.instance().handleChange,
              value: '',
            },
            bar: {
              name: 'bar',
              onChange: wrapper.instance().handleChange,
              value: '',
            },
            baz: {
              name: 'baz',
              onChange: wrapper.instance().handleChange,
              value: '',
            },
          });
        });
    });
  });

  describe('success', () => {
    let oldFetch;
    let oldError;
    const error = new Error('oh no!');
    beforeEach(() => {
      oldFetch = window.fetch;
      oldError = console.error;
      window.fetch = jest.fn(() => Promise.reject(error));
      console.error = jest.fn();
    });

    afterEach(() => {
      window.fetch = oldFetch;
      console.error = oldError;
    });

    it('logs the error', () => {
      const wrapper = shallow(
        <NetlifyFormComposer fields={['foo', 'bar', 'baz']} name="test">
          {jest.fn()}
        </NetlifyFormComposer>,
      );
      return wrapper
        .instance()
        .handleSubmit({
          preventDefault: jest.fn(),
        })
        .catch(() => {
          expect(window.error).toBeCalledWith(error);
        });
    });

    it('sets submissionState to error', () => {
      const wrapper = shallow(
        <NetlifyFormComposer fields={['foo', 'bar', 'baz']} name="test">
          {jest.fn()}
        </NetlifyFormComposer>,
      );
      return wrapper
        .instance()
        .handleSubmit({
          preventDefault: jest.fn(),
        })
        .catch(() => {
          expect(wrapper.state().submissionState).toEqual('error');
        });
    });

    it('calls the onSubmitError prop', () => {
      const onSubmitError = jest.fn();
      const wrapper = shallow(
        <NetlifyFormComposer
          onSubmitError={onSubmitError}
          fields={['foo', 'bar', 'baz']}
          name="test"
        >
          {jest.fn()}
        </NetlifyFormComposer>,
      );
      return wrapper
        .instance()
        .handleSubmit({
          preventDefault: jest.fn(),
        })
        .catch(() => {
          expect(onSubmitError).toBeCalled();
        });
    });
  });
});
