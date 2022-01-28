import { ControllerRenderProps, FieldValues } from 'react-hook-form';

interface DFOCheckboxProps {
  element?: ControllerRenderProps<FieldValues, string>;
  defaultValue?: boolean;
  label?: string;
  error?: boolean;
  errorMessage?: string;
}
