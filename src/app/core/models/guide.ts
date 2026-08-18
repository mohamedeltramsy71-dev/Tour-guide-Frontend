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