export class Video {
  id: number;

  lessonId: number;

  title: string;

  url: string;

  videoUrl: string;

  image: string | null;

  content: string;

  description: string;

  seoActive: boolean | null;

  seoTitle: string | null;

  seoDesc: string | null;

  active: boolean | null;

  createdAt: Date | null;

  updatedAt: Date | null;
}
