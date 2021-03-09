export interface Hierarchical {
  id: string;
  parent: string;
  children?: Hierarchical[];
}
