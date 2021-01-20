export interface Requirement {
  id: number;
  title: string;
  description?: string;
  behovId?: number;
  version?: number;
  type?: string;
  codelistId?: number;
  file?: FileList;
}
