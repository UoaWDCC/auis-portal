export interface Exec {
  id: number;
  image: string;
  position: string;
  name: string;
  bio: string;
}

export interface Props {
  execs: Exec[];
}
