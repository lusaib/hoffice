import { useEffect, useState } from "react";

/**
 * Custom hook function to check the current form validation state .
 * @param {Yup.Schema} schema - schema of the form.
 * @param {object} values - formik values to be validated against the schema.
 * @param {boolean} passErrorString - Pass the error string also default false.
 * @returns {boolean} if filled and correct return true else false.
 */
const useValidateForm = (schema, values, passErrorString = false) => {
  const [isFilled, setIsFilled] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function checkIfValid() {
      try {
        await schema.validate({ ...values });
        setIsFilled(true); // List is fully filled
        setErrors("");
      } catch (error) {
        setErrors(error?.message || "");
        setIsFilled(false); // List is not fully filled
        return;
      }
    }
    checkIfValid();
  }, [schema, values]);

  return passErrorString
    ? {
        isFilled,
        errors,
      }
    : isFilled;
};

export default useValidateForm;
