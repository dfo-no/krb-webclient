export interface Krav {
  id: number;
  tittel: string;
  beskrivelse?: string;
  needId?: number;
  version?: number;
  type?: string;
  kodeliste_id?: number;
  file?: FileList;
}
