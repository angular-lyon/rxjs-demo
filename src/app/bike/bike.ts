export interface Bike {
  name: string;
  color: string;
  pictureUrl: string;
  price: number;
  type: 'mtb' | 'city' | 'bmx' | 'kids' | 'electric';
}