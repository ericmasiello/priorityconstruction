import * as Yup from 'yup';
import libphonenumber from 'google-libphonenumber';

const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

Yup.addMethod(Yup.string, 'phone', function phoneValidation() {
  return this.test({
    name: 'phone',
    exclusive: true,
    message: 'Field must be be a valid US phone number',
    test: value => {
      try {
        if (typeof value === 'string' && value.trim().length > 0) {
          const phone = phoneUtil.parse(value, 'US');
          return phoneUtil.isValidNumber(phone);
        }
        return true;
      } catch (e) {
        return false;
      }
    },
  });
});
