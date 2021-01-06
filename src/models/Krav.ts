export interface Krav {
  id: number;
  tittel: string;
  beskrivelse: string;
  behov_id: number;
  version?: number;
  type: string;
  kodeliste_id?: number;
  file?: FileList;
}
