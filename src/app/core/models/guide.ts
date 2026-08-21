export interface Guide {
  userId: string;
  fullName: string;
  bio: string;
  avatarUrl: string | null;
  experienceYears: number;
  averageRating: number;
  languages: string[];
  coveredCities: string[];
  totalReviews: number;
  isAvailable: boolean;
}

export interface GuideProfile {
  id: number;
  userId: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  languages: string[];
  experienceYears: number;
  averageRating: number;
  totalReviews: number;
  isApproved: boolean;
  isAvailable: boolean;
  coveredCities: string[];
}

export interface UpdateGuideRequest {
  bio?: string;
  languages: string[];
  experienceYears: number;
  coveredCityIds: number[];
}