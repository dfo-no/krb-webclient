import { Controller, useFormContext } from 'react-hook-form';
import { get } from 'lodash';
import { DFOTextField } from '../MaterialUIComponents/StyledComponents/DFOTextField/DFOTextField';

interface IProps {
  name: string;
  control: any;
  label?: string;
}

const TextCtrl = ({ name, control, label }: IProps): React.ReactElement => {
  const {
    formState: { errors }
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <DFOTextField
          textField={field}
          label={label}
          error={get(errors, name)}
          errorMessage={get(errors, name)?.message}
        />
      )}
    />
  );
};

export default TextCtrl;
