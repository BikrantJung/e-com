import { useState } from 'react';

export const useForm = <T>(callback: () => void, initialState: T) => {
  const [formValues, setValues] = useState(initialState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    // setError({});
    setValues((prevValue) => {
      return {
        ...prevValue,
        [e.target.name]: e.target.value,
      };
    });
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    callback();
  }

  return {
    handleChange,
    handleSubmit,
    formValues,
    setValues,
  };
};
