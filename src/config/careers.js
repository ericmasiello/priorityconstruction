export const fields = {
  name: {
    required: true,
  },
  address: {
    required: true,
  },
  homePhone: {
    type: 'tel',
    placeholder: '123-456-7890',
    pattern: '[0-9]{0,1}-{0,1}[0-9]{3}-{0,1}[0-9]{3}-{0,1}?[0-9]{4}',
    required: true,
  },
  cellPhone: {
    type: 'tel',
    placeholder: '123-456-7890',
    pattern: '[0-9]{0,1}-{0,1}[0-9]{3}-{0,1}[0-9]{3}-{0,1}?[0-9]{4}',
  },
  email: {},
  dob: {
    required: true,
  },
  beginWorkDate: {
    placeholder: 'MM/DD/YYYY',
    maxLength: '10',
    required: true,
  },
  desiredSalary: {},
  position: {
    required: true,
  },
  canWorkWeekends: {
    type: 'radio',
    required: true,
  },
  capableOfPhysicalLabor: {
    type: 'radio',
    required: true,
  },
  convictedOfFelony: {
    type: 'radio',
    required: true,
  },
  felonyExplanation: {
    required: true,
  },
  previouslyWorkedForPriority: {
    type: 'radio',
  },
  previousWorkforPriorityDetails: {},
  previousEmployerCompany: {},
  previousEmployerPhone: {
    type: 'tel',
    placeholder: '123-456-7890',
    pattern: '[0-9]{0,1}-{0,1}[0-9]{3}-{0,1}[0-9]{3}-{0,1}?[0-9]{4}',
  },
  previousEmployerCity: {},
  previousEmployerState: {},
  previousEmployerJobTitle: {},
  previousEmployerResponsibilities: {},
  previousEmployerStartDate: {
    placeholder: 'MM/DD/YYYY',
    maxLength: '10',
  },
  previousEmployerEndDate: {
    placeholder: 'MM/DD/YYYY',
    maxLength: '10',
  },
  previousEmployerReasonForLeaving: {},
  additionalQualifications: {},
  signature: {
    placeholder: 'Enter your name',
    required: true,
  },
  date: {
    placeholder: 'MM/DD/YYYY',
    maxLength: '10',
    required: true,
  },
  certification: {
    type: 'checkbox',
    required: true,
  },
};

export const views = [
  'personalInformation',
  'previousEmployment',
  'additionalQualifications',
  'disclaimerAndSignature',
];

export const viewFields = {
  personalInformation: [
    'name',
    'address',
    'homePhone',
    'cellPhone',
    'email',
    'dob',
    'beginWorkDate',
    'desiredSalary',
    'position',
    'canWorkWeekends',
    'capableOfPhysicalLabor',
    'convictedOfFelony',
    'felonyExplanation',
    'previouslyWorkedForPriority',
  ],
  previousEmployment: [
    'previousWorkforPriorityDetails',
    'previousEmployerCompany',
    'previousEmployerPhone',
    'previousEmployerCity',
    'previousEmployerState',
    'previousEmployerJobTitle',
    'previousEmployerResponsibilities',
    'previousEmployerStartDate',
    'previousEmployerEndDate',
    'previousEmployerReasonForLeaving',
  ],
  additionalQualifications: ['additionalQualifications'],
  disclaimerAndSignature: ['signature', 'date', 'certification'],
};
