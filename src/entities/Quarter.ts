interface Quarter {
  title: string;
  description: string;
  year: string;
  human_date: string;
  start_date: string;
  end_date: string;
  index?: string;
  id: string;
  color_primary: string;
  color_primary_dark: string;
  introduction?: string;
  cover?: string;
}

export interface CustomQuarter {
  quarterly: Quarterly;
  lessons: Lesson[];
}

export default Quarter;

interface Quarterly {
  title: string;
  description: string;
  human_date: string;
  start_date: string;
  end_date: string;
  color_primary: string;
  color_primary_dark: string;
  splash: string;
  credits: Credit[];
  lang: string;
  id: string;
  index: string;
  path: string;
  full_path: string;
  introduction: string;
  features: Feature[];
  quarterly_group: QuarterlyGroup;
  cover: string;
}

interface Credit {
  name: string;
  value: string;
}

interface Feature {
  name: string;
  title: string;
  description: string;
  image: string;
}

interface QuarterlyGroup {
  name: string;
  order: number;
}

interface Lesson {
  title: string;
  start_date: string;
  end_date: string;
  id: string;
  index: string;
  path: string;
  full_path: string;
  pdfOnly: boolean;
  cover: string;
}
