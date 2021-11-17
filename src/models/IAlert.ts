export interface IAlert {
  text: string;
  style:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'light'
    | 'link';
  id: string;
}
