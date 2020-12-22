export interface Loading {
  loading: boolean;
}

export interface Media {
  image: string;
  caption: string;
}

export interface Story {
  date: number;
  title: string;
  description: string;
  media?: Media;
}
