import { ControllerRenderProps, FieldValues } from 'react-hook-form';

interface DFOTextFieldProps {
  textField?: ControllerRenderProps<FieldValues, string>;
  value?: string;
  label?: string;
  error?: boolean;
  errorMessage?: string;
}
