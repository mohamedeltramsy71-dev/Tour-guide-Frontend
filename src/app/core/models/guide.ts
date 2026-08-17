export interface Guide {
  id: number;
  fullName: string;
  bio: string;
  avatarUrl: string;
  experienceYears: number;
  averageRating: number;
  languages: string[];
  cities: string[];
  totalReviews: number;
}