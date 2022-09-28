export interface LaureateView {
  description: string;
  main_image: string;
  position: string;
  name: string;
  translation_slug: string;
  gallery_paths: {
    originals: string[];
    thumbs: string[];
  };
  video_paths: string[];
}
