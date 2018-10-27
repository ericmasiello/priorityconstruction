import * as Yup from 'yup';
import '../utils/validation/phone';

export default {
  initialValues: {
    name: '',
    address: '',
    phone: '',
    email: '',
    dob: '',
    beginWorkDate: '',
    desiredSalary: '',
    position: '',
    canWorkWeekends: '',
    capableOfPhysicalLabor: '',
    convictedOfFelony: '',
    felonyExplanation: '',
    previouslyWorkedForPriority: '',
    previousWorkforPriorityDetails: '',
    previousEmployerCompany: '',
    previousEmployerPhone: '',
    previousEmployerCity: '',
    previousEmployerState: '',
    previousEmployerJobTitle: '',
    previousEmployerResponsibilities: '',
    previousEmployerStartDate: '',
    previousEmployerEndDate: '',
    previousEmployerReasonForLeaving: '',
    additionalQualifications: '',
    signature: '',
    date: '',
    certification: '',
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required('Enter your name'),
    address: Yup.string().required('Enter your home address'),
    phone: Yup.string()
      .phone()
      .required('Enter your phone number'),
    email: Yup.string()
      .email()
      .required('Enter a valid email address'),
    dob: Yup.string().required('Enter your date of birth'),
    beginWorkDate: Yup.string().required('Specify when you can start working'),
    desiredSalary: Yup.string(),
    position: Yup.string(),
    canWorkWeekends: Yup.string().required('Specify if you are able to work weekends'),
    capableOfPhysicalLabor: Yup.string().required(
      'Specify if you are able to perform physical labor',
    ),
    convictedOfFelony: Yup.string().required('Specify if you have been convicted of felony'),
    felonyExplanation: Yup.string().when('convictedOfFelony', {
      is: 'yes',
      then: Yup.string().required('Explain the details of your felony conviction'),
    }),
    previouslyWorkedForPriority: Yup.string().required(
      'Specify if you have worked for Priority Construction',
    ),
    previousWorkforPriorityDetails: Yup.string().when('previouslyWorkedForPriority', {
      is: 'yes',
      then: Yup.string().required(
        'Explain the details of your employment for Priority Construction',
      ),
    }),
    signature: Yup.string().required('Enter your full name'),
    date: Yup.string().required("Enter today's date"),
    certification: Yup.string().required('You must agree before submitting'),
  }),
};
