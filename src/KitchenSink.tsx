import { useForm } from 'react-hook-form';
import { get } from 'lodash';
import TextCtrl from './FormProvider/TextCtrl';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useFormContext } from 'react-hook-form';

const KitchenSink = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      adress: '',
      phoneNumber: ''
    }
  });
  const onSubmit = (data: any) => console.log(data);

  return (
    <Paper
      elevation={3}
      sx={{
        margin: 'auto',
        marginTop: '20px',
        marginBottom: '20px',
        width: '500px',
        height: '350px',
        padding: '20px'
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            justifyContent: 'center'
          }}
        >
          <TextCtrl name="firstName" control={control} label="First name" />
          <TextCtrl name="lastName" control={control} label="Last name" />
          <Button
            type="submit"
            sx={{ marginTop: '10px', height: '40px' }}
            variant="primary"
          >
            Register
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default KitchenSink;
