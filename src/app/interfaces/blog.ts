interface Content {
  data: string;
  image: string;
}

export interface Article {
  id: string;
  title: string;
  body: Array<Content>;
  image: string;
}
