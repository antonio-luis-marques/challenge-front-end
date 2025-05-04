import { CourseCategory } from "../../types/courseCategory";

export type Course = {
  id: string;
  title: string;
  description?: string;
  category: CourseCategory;
  cover: string;
  isFree: boolean;
  price?: number;
  instructor: string;
  introVideo?: CourseVideo;
  modules: CourseModule[];
};

export type CourseModule = {
  id: string;
  title: string;
  order: number;
  videos: CourseVideo[];
};

export type CourseVideo = {
  id: string;
  title: string;
  videoUrl: string;
  description?: string;
  durationInSeconds?: number;
  order?: number;
  isFree?: boolean;
};
