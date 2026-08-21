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

export interface CreatePackageRequest {
  title: string;
  description?: string;
  price: number;
  durationDays: number;
  maxPersons: number;
  cityId: number;
}

export interface UpdatePackageRequest {
  title: string;
  description?: string;
  price: number;
  durationDays: number;
  maxPersons: number;
}

export interface AddLandmarkToPackageRequest {
  landmarkId: number;
  dayNumber: number;
  order: number;
}