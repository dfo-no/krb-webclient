export interface Requirement {
  id: number;
  title: string;
  description?: string;
  needId?: number;
  type?: string;
  codelistId?: number;
  file?: FileList;
}
