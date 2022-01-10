import { Controller, useFormContext } from 'react-hook-form';
import { DFOTextField } from '../MaterialComponents/StyledComponents/DFOTextField/DFOTextField';
import { useForm } from 'react-hook-form';

interface IProps {
  name: string;
  control: any;
  label?: string;
  required?: boolean;
}

const TextCtrl = ({
  name,
  control,
  label,
  required
}: IProps): React.ReactElement => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required !== undefined ? required : 'false' }}
      render={({ field }) => <DFOTextField {...field} label={label} />}
    />
  );
};

export default TextCtrl;
