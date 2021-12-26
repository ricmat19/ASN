export interface IProduct {
  project: string,
  id: string,
  title: string,
  product: string,
  price: string,
  info: string,
  imagekey?: string,
  qty: number,
  primaryimage: boolean,
  imageBuffer?: string,
}

export interface ICart {
  cart: any[],
  id: string,
  title: string,
  product: string,
  price: number,
  info: string,
  imagekey: string,
  imageBuffer: string,
  qty: number,
  primaryimage: boolean,
}

export interface ICheckout {
  id: string,
  shipment: string[],
  address: string,
  suite: string,
  city: string,
  state: string,
  zipcode: string,
  phone: string,
  email: string,
  firstname: string,
  lastname: string,
}

export interface ICourse {
  id: string,
  title: string,
  subject: string,
  imagekey?: string,
  imageBuffer?: string,
  content?: string,
  info: string,
  price: number,
}

export interface IMedia {
  id: string,
  title: string,
  media: string,
  imagekey?: string,
  imageBuffer?: string,
  content?: string,
  info: string,
}

export interface IProject {
  id: string,
  title: string,
  imagekey?: string,
  imageBuffer?: string,
  info: string,
}

export interface IEvent {
  id: string,
  title: string,
  event_date: Date,
  imagekey?: string,
  imageBuffer?: string,
  price?: number,
  info: string,
}