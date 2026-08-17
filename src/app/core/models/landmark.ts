export interface Landmark {
  id: number;
  nameEn: string;
  nameAr: string;
  description: string;
  location: string;
  entryFee: number;
  averageRating: number;
  category: string;
  cityId: number;
  cityNameEn: string;
  images: string[];
}