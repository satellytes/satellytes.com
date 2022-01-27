import { Control, useForm } from 'react-hook-form';

export const getSampleController = (): Control => {
  const { control } = useForm({ mode: 'onChange' });
  return control;
};
