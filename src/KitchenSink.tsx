import { DevTool } from '@hookform/devtools';
import { joiResolver } from '@hookform/resolvers/joi';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import CustomJoi from './common/CustomJoi';
import DFOSearchBar from './components/DFOSearchBar/DFOSearchBar';
import ErrorSummary from './Form/ErrorSummary';
import CheckboxCtrl from './FormProvider/CheckboxCtrl';
import CodelistCtrl from './FormProvider/CodelistCtrl';
import DateCtrl from './FormProvider/DateCtrl';
import FileUploadCtrl from './FormProvider/FileUploadCtrl';
import HorizontalTextCtrl from './FormProvider/HorizontalTextCtrl';
import RadioCtrl from './FormProvider/RadioCtrl';
import SelectCtrl from './FormProvider/SelectCtrl';
import SliderCtrl from './FormProvider/SliderCtrl';
import SwitchCtrl from './FormProvider/SwitchCtrl';
import VerticalTextCtrl from './FormProvider/VerticalTextCtrl';
import ModelType from './models/ModelType';
import RequirementType from './models/RequirementType';
import { IBaseModel } from './Nexus/entities/IBaseModel';
import { ICodelist } from './Nexus/entities/ICodelist';
import { IOption } from './Nexus/entities/IOption';

interface IFormValues {
  person: {
    firstName: string | null;
    lastName: string | null;
    adress: string | null;
    cars: string | null;
    birthDay: string | null;
    weddingDay?: string | null;
    point: number;
    isDeveloper: boolean;
    range: number;
    isSexy: boolean;
    fileEndings: string[];
    codelist: ICodelist;
    gender: string;
    counter: number;
  };
}

const FormSchema = CustomJoi.object().keys({
  person: CustomJoi.object().keys({
    firstName: CustomJoi.string().max(20).required(),
    lastName: CustomJoi.string().max(20).required(),
    adress: CustomJoi.string().max(20).required(),
    cars: CustomJoi.string().valid('2').required(),
    birthDay: CustomJoi.date().iso().raw().required(),
    weddingDay: CustomJoi.alternatives([
      CustomJoi.date().iso().max('12/13/2021').raw(),
      CustomJoi.string().valid(null)
    ]).required(),
    point: CustomJoi.number().required(),
    isDeveloper: CustomJoi.boolean().valid(true).required(),
    range: CustomJoi.number().min(20).max(100).required(),
    isSexy: CustomJoi.boolean().valid(true).required(),
    fileEndings: CustomJoi.array().items(CustomJoi.string()).min(1).required(),
    codelist: CustomJoi.any().required(),
    gender: CustomJoi.string().valid(RequirementType.info).required(),
    counter: CustomJoi.million().required()
  })
});

const KitchenSink = (): React.ReactElement => {
  const codelists = [
    {
      id: '012345678901234567890123456789123456',
      title: 'A',
      description: 'A',
      codes: [],
      sourceOriginal: 'dfgdfgdfgdf',
      sourceRel: null,
      type: ModelType.codelist
    },
    {
      id: '012345678901234567890123456789123457',
      title: 'B',
      description: 'B',
      codes: [],
      sourceOriginal: 'dfgfgdfgd',
      sourceRel: null,
      type: ModelType.codelist
    }
  ];

  const defaultValues: IFormValues = {
    person: {
      firstName: '',
      lastName: '',
      adress: '',
      cars: '2',
      birthDay: '',
      weddingDay: '2021/12/14T14:00:00.123Z',
      point: 50,
      isDeveloper: false,
      range: 15,
      isSexy: true,
      fileEndings: ['doc'],
      codelist: codelists[0],
      gender: RequirementType.requirement,
      counter: 999999
    }
  };

  const methods = useForm<IFormValues>({
    resolver: joiResolver(FormSchema),
    defaultValues
  });

  const saveValues = (data: IFormValues) => {
    console.log(data.person);
  };

  const selectOptions: IOption[] = [
    { label: 'BMW', value: '1' },
    { label: 'Mercedes', value: '2' },
    { label: 'Volvo', value: '3' }
  ];

  const carList: any = [];
  const searchFunction = (searchString: string, list: IBaseModel[]) => {
    return list;
  };
  const callback = (list: IBaseModel[]) => {};

  return (
    <Box
      sx={{
        padding: '20px',
        paddingBottom: '200px'
      }}
    >
      <Paper
        elevation={3}
        variant="elevation"
        sx={{
          height: '1250px',
          padding: '20px',
          margin: 'auto'
        }}
      >
        {/* <pre>{JSON.stringify(defaultValues, null, 2)}</pre> */}
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(saveValues)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <HorizontalTextCtrl
                name="person.firstName"
                placeholder="Fornavn"
              />
              <HorizontalTextCtrl
                name="person.lastName"
                placeholder="Etternavn"
              />
              <VerticalTextCtrl
                name="person.adress"
                label="Hva er din adresse?"
                placeholder="Adresse"
              />
              <DFOSearchBar
                list={carList}
                placeholder="Søk etter biler"
                callback={callback}
                searchFunction={searchFunction}
              />
              <SelectCtrl
                name="person.cars"
                label="Cars"
                options={selectOptions}
              />
              {/*               <HiddenCtrl name="person.counter" /> */}
              <DateCtrl name="person.birthDay" label="birthDay" />
              <DateCtrl name="person.weddingDay" label="weddingDay" />
              <SliderCtrl
                name="person.range"
                min={0}
                max={100}
                step={5}
                unit="marsipaner"
                marks={[]}
                label="Range"
              />
              <SwitchCtrl name="person.isDeveloper" label="Developer" />
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gridTemplateRows: '40px',
                  gap: '10px'
                }}
              >
                <CheckboxCtrl name="person.isSexy" label="Er sexy?" />
                {/* <CheckboxCtrl
                  name="person.kodeliste"
                  label="Kodeliste"
                  defaultValue={true}
                />
                <CheckboxCtrl name="person.periode" label="Periode" />
                <CheckboxCtrl name="person.verdi" label="Verdi" />
                <CheckboxCtrl name="person.tid" label="Tid" />
                <CheckboxCtrl name="person.janei" label="Ja/Nei" />
                <CheckboxCtrl name="person.filoppl" label="Filopplastning" /> */}
              </Box>
              {/* <CheckboxCtrl name="person.kvalifikasjon" label="Kvalifikasjon" />
              <CheckboxCtrl
                name="person.kravspesifikasjon"
                label="Kravspesifikasjon"
                defaultValue={true}
              /> */}
              <CodelistCtrl
                name="person.codelist"
                codelists={codelists}
                label="Codelist"
              />
              <FileUploadCtrl name="person.fileEndings" />
              <RadioCtrl
                name="person.gender"
                label="Gender"
                options={[
                  { value: RequirementType.requirement, label: 'Krav' },
                  { value: RequirementType.info, label: 'Info' }
                ]}
              />
              <br />
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Box>
          </form>
          <Box sx={{ marginTop: '20px' }}>
            <DevTool control={methods.control} />
            <ErrorSummary errors={methods.formState.errors} />
          </Box>
        </FormProvider>
      </Paper>
    </Box>
  );
};

export default KitchenSink;
