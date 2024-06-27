export interface Exec {
  id: number;
  image: string;
  position: string;
  role: string;
  name: string;
  description: string;
}

export interface Props {
  execs: Exec[];
}

export interface Partner {
  id: number;
  type: string;
  name: string;
  description: string;
  image: string;
  location: string;
}
