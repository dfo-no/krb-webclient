export interface ISelectable {
  id: string;
  type:
    | 'value'
    | 'codelist'
    | 'text'
    | 'yesNo'
    | 'fileUpload'
    | 'periodDate'
    | 'time';
}
