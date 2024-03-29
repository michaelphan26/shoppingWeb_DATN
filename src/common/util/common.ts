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

export const initialProductItem:ProductItem={
    _id: '',
    name: '',
    brand: '',
    id_category: '',
    price: 0,
    description: '',
    image: '',
    stock: 0,
    discount: 0,
    status:false
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

export interface UserInterface{
  _id:string,
  email: string,
  id_userInfo: string,
  id_role: string,
  role_name: string,
}

export interface CartInterface{
  productList: [],
  total:number
}

export interface ReceiptInterface{
  _id: string,
  date: string,
  total: number,
  id_user: string,
  id_receiptType: string,
}

export const initialReceiptInterface = {
  _id: '',
  date: '',
  total: 0,
  id_user: '',
  id_receiptType: '',
}

export interface JustNameItemInterface{
  _id: string,
  name:string,
}

export const initialJustNameItem = {
  _id: '',
  name:''
}

export interface ReceiptDetailInterface{
  _id: string,
  discount: number,
  id_product: string,
  id_receipt: string,
  price: number,
  quantity: number
}

export interface SummaryItemInterface{
  id: string,
  title: string
  count: number
  color: string
}

export interface CompanyInterface{
  _id: string,
  name: string,
  address: string,
  phone: string,
  tax_number: string
}

export const initialCompanyItem={
  _id: '',
  name: '',
  phone: '',
  address: '',
  tax_number:''
}

export interface UserInterface{
  _id: string,
  email: string,
  id_role: string,
  id_userInfo:string,
}

export const initialUserInterface={
  _id: "",
  email: "",
  id_role: "",
  id_userInfo: "",
  role_name: "",
}

export interface UserDetailInterface{
  _id: string,
  name: string,
  phone: string,
  address: string,
  joinDate:string,
}

export const initialUserDetailInterface = {
  _id: "",
  email: "",
  password:"",
  name: "",
  phone: "",
  address: "",
  joinDate:""
}

export interface UserAPIInterface{
  email: string;
  password: string;
  name: string;
  phone: string;
  address: string;
  id_role: string | Object;
}

export const initialUserAPIInterface={
  email: '',
  password: '',
  name: '',
  phone: '',
  address: '',
  id_role: '',
}

export interface StatusInterface{
  label: string;
  value: boolean;
}

export interface ioProductDetailItem{
  id_product: string,
  id_company: string,
  price: number,
  quantity:number
}

export const initialIOProductDetailItem: ioProductDetailItem = {
  id_product: '',
  id_company: '',
  price: 0,
  quantity:0
}

export interface ioProductInterface{
  _id: string,
  date: string,
  id_ioType:string
}

export const initialIOProduct: ioProductInterface = {
  _id: '',
  date: '',
  id_ioType:''
}