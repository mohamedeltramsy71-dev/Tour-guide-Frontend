export interface CalculatePriceRequest {
  landmarkIds: number[];
  durationDays: number;
  numberOfPersons: number;
  guideProfileId: number;
}

export interface LandmarkPriceBreakdown {
  landmarkId: number;
  name: string;
  entryFee: number;
}

export interface CalculatePriceResponse {
  landmarkEntryFeesTotal: number;
  guideFixedFee: number;
  durationMultiplier: number;
  totalPrice: number;
  breakdown: LandmarkPriceBreakdown[];
}

export interface AvailableGuidesRequest {
  cityId: number;
  startDate: string;
  endDate: string;
}

export interface CreateCustomTripRequest {
  landmarkIds: number[];
  guideProfileId: number;
  startDate: string;
  numberOfPersons: number;
  durationDays: number;
}