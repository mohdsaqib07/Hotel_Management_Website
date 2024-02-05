type CoverImage = {
  url: string;
};

export type Images = {
  _key: string;
  url: string;
};
type OfferedAmenities = {
  _key: string;
  amenity: string;
  icon: string;
};
type Slug = {
  _type: string;
  current: string;
};
export type Room = {
  _id: string;
  coverImage: CoverImage;
  description: string;
  dimension: string;
  discount: number;
  images: Images[];
  isBooked: boolean;
  isFeatured: boolean;
  name: string;
  numberOfBeds: number;
  offeredAmenities: OfferedAmenities[];
  price: number;
  slug: Slug;
  specialNotes: string;
  type: string;
};

export type CreateBookingDto = {
  user: string;
  hotelRoom: string;
  checkinDate: string;
  checkoutDate: string;
  numberOfDays: number;
  adults: number;
  children: number;
  totalPrice: number;
  discount: number;
};
