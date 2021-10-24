export const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const phoneReg = /((02|09|03|07|08|05)+([0-9]{8,9})\b)/g;

export interface ProductItem{
    _id: string;
    name: string;
    brand: string;
    id_category: string;
    price: number;
    description: string;
    image: string;
    stock: number;
    discount: number;
    status:boolean
}

export interface CartItem{
    id_product: string;
    image: string;
    name: string;
    stock: number;
    price: number;
    discount: number;
    quantity: number;
}

export interface UserInfo{
  _id:string,
  name:string,
  phone:string,
  address:string,
  joinDate:string
}

export interface CartInterface{
  productList: [],
  total:number
}