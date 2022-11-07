import React, { ReactElement, useState } from 'react';
import classnames from 'classnames';

import css from './FileUpload.module.scss';

export type UploadVariant = 'Primary' | 'Secondary' | 'Tertiary';

interface IProps {
  accept?: string;
  className?: string;
  description?: string;
  disabled?: boolean;
  label: string;
  multiple?: boolean;
  onChange?: (files: FileList) => void;
  variant?: UploadVariant;
}

const FileUpload = ({
  accept,
  className,
  description,
  disabled = false,
  label,
  multiple = false,
  onChange,
  variant = 'Primary',
}: IProps): ReactElement => {
  const [inputKey, setInputKey] = useState(0);

  const variantClass = (): string => {
    if (disabled) {
      return css.Disabled;
    }

    switch (variant) {
      case 'Secondary':
        return css.Secondary;
      case 'Tertiary':
        return css.Tertiary;
      default:
        return css.Primary;
    }
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (onChange && event.target.files && event.target.files.length) {
      onChange(event.target.files);
      setInputKey((key) => key + 1);
    }
  };

  return (
    <div
      className={classnames(
        css.FileUpload,
        variantClass(),
        className ? className : null
      )}
      data-cy={'file-upload'}
    >
      <div>
        <label>
          {label}
          <input
            accept={accept ?? '*'}
            disabled={disabled}
            key={inputKey}
            multiple={multiple}
            onChange={handleOnChange}
            type="file"
            title={''}
          />
        </label>
        {description && <span>{description}</span>}
      </div>
    </div>
  );
};

export default FileUpload;
