import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Code } from '../../../models/Code';
import { Codelist } from '../../../models/Codelist';
import { RootState } from '../../../store/store';

interface IProps {
  codes: string | string[];
  configCodelist: string;
}

export default function GenerateCodelist({
  codes,
  configCodelist
}: IProps): string[] {
  const { response } = useSelector((state: RootState) => state.response);

  const codelistIndex = response.spesification.bank.codelist.findIndex(
    (list: Codelist) => list.id === configCodelist
  );

  const codelist = response.spesification.bank.codelist[codelistIndex];
  const usedCodes: string[] = [];
  if (Array.isArray(codes)) {
    codes.forEach((selectedCode: string) => {
      const codeIndex = codelist.codes.findIndex(
        (element: Code) => element.id === selectedCode
      );
      const code = codelist.codes[codeIndex];
      usedCodes.push(code.title);
    });
  }
  return usedCodes;
}
