export interface NewsView {
  description: string;
  gallery_paths: {
    originals: string[];
    thumbs: string[];
  };
  main_image: string;
  post_date: string;
  source: string;
  title: string;
  translation_slug: string;
  video_paths: string[];
}
