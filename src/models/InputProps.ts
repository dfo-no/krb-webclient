import { UseFormReturn } from 'react-hook-form';

export interface InputProps
  extends Pick<
    UseFormReturn,
    'control' | 'register' | 'setValue' | 'getValues' | 'formState'
  > {
  defaultValues?: any;
}
