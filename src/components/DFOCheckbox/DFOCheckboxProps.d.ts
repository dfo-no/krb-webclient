import { ControllerRenderProps, FieldValues } from 'react-hook-form';

interface DFOCheckboxProps {
  element?: ControllerRenderProps<FieldValues, string>;
  checked?: boolean;
  variant?: string;
}
