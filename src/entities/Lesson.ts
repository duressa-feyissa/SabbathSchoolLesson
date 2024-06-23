interface LessonDay {
  title: string;
  date: string;
  id: string;
  index: string;
  path: string;
  full_path: string;
  read_path: string;
  full_read_path: string;
  content?: string;
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

export interface LessonDetails {
  lesson: Lesson;
  days: LessonDay[];
}

export default Lesson;
