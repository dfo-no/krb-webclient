import { UseFormMethods } from 'react-hook-form';

export interface InputProps
  extends Pick<
    UseFormMethods,
    'control' | 'register' | 'errors' | 'setValue' | 'getValues'
  > {
  defaultValues?: any;
}
