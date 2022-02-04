import { ControllerRenderProps, FieldValues } from 'react-hook-form';

interface DFOTextFieldProps {
  element?: ControllerRenderProps<FieldValues, string>;
  value?: string;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  callback?: function;
}
