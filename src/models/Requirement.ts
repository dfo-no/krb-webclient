export interface Requirement {
  id: number;
  title: string;
  description?: string;
  needId?: number;
  type?: string;
  kodeliste_id?: number;
  file?: FileList;
  selected?: boolean;
}
