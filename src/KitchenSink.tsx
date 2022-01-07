import { useForm, Controller } from 'react-hook-form';
import Input from '@material-ui/core/Input';

const KitchenSink = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: '',
      select: {}
    }
  });
  const onSubmit = (data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="firstName"
        control={control}
        render={({ field }) => <Input {...field} />}
      />
      <input type="submit" />
    </form>
  );
};

export default KitchenSink;
