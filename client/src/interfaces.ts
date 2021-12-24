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

}

export interface IMedia {

}

export interface IProject {

}

export interface IEvent {

}