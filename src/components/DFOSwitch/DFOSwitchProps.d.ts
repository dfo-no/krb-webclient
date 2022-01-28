import { ControllerRenderProps, FieldValues } from 'react-hook-form';

interface DFOSwitchProps {
  element?: ControllerRenderProps<FieldValues, string>;
  label?: string;
  error?: boolean;
  errorMessage?: string;
}
