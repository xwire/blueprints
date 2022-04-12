export interface Blueprint {
  id: string;
  title: string;
  inputs: DataType[];
  outputs: DataType[];
}

export type DataType = 'string' | 'number' | 'bool' | 'object';