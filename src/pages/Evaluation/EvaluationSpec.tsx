import React, { ReactElement } from 'react';
// import { AxiosResponse } from 'axios';
// import { useTranslation } from 'react-i18next';

import css from './Evaluation.module.scss';
import DateUtils from '../../common/DateUtils';
// import FileUpload from '../../components/FileUpload/FileUpload';
// import SpecificationService from '../../Nexus/services/SpecificationService';
// import { httpPost } from '../../api/http';
// import { useAppDispatch } from '../../store/hooks';
import { useEvaluationState } from './EvaluationContext';

const EvaluationSpec = (): ReactElement => {
  // const { t } = useTranslation();
  // const [uploadError, setUploadError] = useState('');
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   setUploadError('');
  // }, [dispatch]);

  const { specificationUpload } = useEvaluationState();

  const formatDate = (time: number): string => {
    const date = new Date(time);
    return DateUtils.prettyFormat(date.toISOString());
  };

  const getSpecificationName = (): string => {
    if (specificationUpload.specification.bank.id === '') {
      return '...';
    }

    return (
      specificationUpload.specification.title +
      ', ' +
      specificationUpload.specification.organization
    );
  };

  // const onUploadSpecification = (fileList: FileList): void => {
  //   setUploadError('');
  //   setEvaluations([]);
  //
  //   const formData = new FormData();
  //   if (fileList.length) {
  //     const file = fileList[0];
  //     setSpecFile({
  //       name: file.name,
  //       lastModified: file.lastModified
  //     });
  //     formData.append('file', file);
  //   }
  //
  //   httpPost<FormData, AxiosResponse>('/java/uploadPdf', formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     },
  //     responseType: 'json'
  //   })
  //     .then((response) => {
  //       if (!response.data.bank) {
  //         setUploadError(t('EVAL_SPEC_ERROR_INVALID_FILE'));
  //
  //         setEvaluationSpecification(
  //           SpecificationService.defaultSpecification()
  //         );
  //         return response;
  //       }
  //       setEvaluationSpecification(response.data);
  //       return response;
  //     })
  //     .catch((error) => {
  //       setSpecFile(null);
  //       setUploadError(t('EVAL_SPEC_ERROR_UPLOADING'));
  //       console.error(error);
  //     });
  // };

  return (
    <div className={css.Content}>
      <div className={css.Card}>
        {/* <FileUpload
          accept={'application/pdf'}
          description={t('EVAL_SPEC_FILE_UPL_DESCR')}
          label={t('EVAL_SPEC_FILE_UPL_LABEL')}
          onChange={onUploadSpecification}
          variant={'Tertiary'}
        />*/}
        {specificationUpload !== null && (
          <ul className={css.Files}>
            <li className={css.File}>
              <div>{getSpecificationName()}</div>
              <div>
                <div>{specificationUpload.file.name}</div>
                <div className={css.Date}>
                  {formatDate(specificationUpload.file.lastModified)}
                </div>
              </div>
            </li>
          </ul>
        )}
      </div>
      {/* {!!uploadError && <div className={css.Error}>{uploadError}</div>}*/}
    </div>
  );
};

export default EvaluationSpec;
