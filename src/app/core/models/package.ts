export interface PackageLandmark {
  landmarkId: number;
  nameEn: string;
  dayNumber: number;
  order: number;
}

export interface Package {
  id: number;
  title: string;
  description: string;
  price: number;
  durationDays: number;
  maxPersons: number;
  isActive: boolean;
  averageRating: number;
  cityNameEn: string;
  guideId: string;
  guideName: string;
  images: string[];
  landmarks: PackageLandmark[];
}