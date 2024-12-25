export interface Listing {
  ListPrice: number;
  ArchitecturalStyle: [string];
  PropertySubType: string;
  City: string;
  PostalCode: string;
  BedroomsTotal: number;
  BathroomsTotalInteger: number;
  YearBuilt: number;
  LivingArea: number;
  Media: {
    MediaURL: string;
  }[];
}