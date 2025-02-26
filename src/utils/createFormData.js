/**
 * Function to handle the changing of the value object to formData class object .
 * @param {object} values - object in which we need to convert to formData. 
 * @returns the formData constructor with the given data
 */
const createFormData = (values ) => {
  const formData = new FormData();

  Object.keys(values).forEach((key) => formData.append(key, values[key]));
  return formData;
};

export default createFormData;