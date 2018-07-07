import React from 'react';

const OfficeMap = (props) => (
  <iframe
    title="Office Map"
    width="450"
    height="350"
    src="https://www.google.com/maps/embed/v1/place?q=1315%20West%20Hamburg%20Street%2C%20Baltimore%2C%20MD%2021203&key=AIzaSyCxI_EFKpNlpTrCRRBU8BJFv-TakMlmnj0"
    {...props}
  />
);

export default OfficeMap;
