import { UseFormReturn, UseFieldArrayReturn } from 'react-hook-form';

export interface InputProps
  extends Pick<
      UseFormReturn,
      'control' | 'register' | 'setValue' | 'getValues' | 'formState'
    >,
    Pick<UseFieldArrayReturn, 'remove'> {
  defaultValues?: any;
}
