import axios from 'axios';
import { CartInterface, ProductItem, ReceiptInterface, UserInfo } from './common';

export const api_url = 'http://192.168.1.15:5000/api';

export const productListUrl = 'product/product-list';
export const productDetailUrl = 'product/product-detail';
export const getUserDetailUrl = '/user/me';
export const receiptListUrl = 'receipt/receipt-list';
export const receiptTypeListUrl = 'receipt-type/get-list';
export const receiptDetailUrl = 'receipt/receipt-detail';
export const categoryListUrl = 'category/category-list';

export async function getProductListFromAPI():Promise<string|any> {
  let productList= [] as any;
  await axios({
      url: `/product/product-list`,
      baseURL: `${api_url}`,
      method: 'get',
      responseType: 'json',
    })
      .then((res) => {
        if (res.data['code'] === 200) {
           productList=res.data['data'];
        }
        else {
          return res.data['message'] as string
        }
      })
    .catch((err) => {
        return "Error";
      });
    return productList;
}
export async function getProductDetailFromAPI(_id:string) {
  let productDetail = {} as ProductItem;
  await axios({
    url: `${productDetailUrl}/${_id}`,
    baseURL: `${api_url}`,
    method: 'get',
    responseType:'json',
  }).then(res => {
    if (res.data['code'] === 200) {
      productDetail = res.data['data'];
    }
    else return res.data['message'] as string;
  }).catch(err => {
    return err.response.data['message'] as string;
  })

  return productDetail;
}

export async function getUserInfoFromAPI() {
  const token = await window.sessionStorage.getItem('token');
  if (token) {
    let userInfo = {} as UserInfo;
    await axios({
      url: `${getUserDetailUrl}`,
      baseURL: `${api_url}`,
      method: 'get',
      headers: {
        'x-auth-token': token,
      },
    })
      .then((res) => {
        if (res.data['code'] === 200) {
          userInfo=res.data['data']
        }
        else {
          return res.data['message'] as string;
        }
      })
      .catch((err) => {
        return err.response.data['message'] as string
      });
    return userInfo;  
  }
  else {
    const msg = "No token";
    return msg;
  }
}

export async function addReceiptAPI(cart:CartInterface) {
  const token = await window.sessionStorage.getItem("@token");
  if (token) {
    await axios({
      url: 'receipt/add-receipt',
      baseURL: `${api_url}`,
      method: 'post',
      headers: {
        "x-auth-token":token  
      },
      data:cart,
      responseType:'json'
    }).then(res => {
      if (res.data['code'] !== 200) {
        return res.data['message'] as string;
      }
    }).catch(err => {
      return err.response.data['message'] as string
    })
  }
}

export async function getReceiptListFromAPI() {
  const token = await window.sessionStorage.getItem("token");
  let receiptList = [] as any;
  if (token) {
    await axios({
    url: `${receiptListUrl}`,
    baseURL: `${api_url}`,
    method: 'get',
    headers: {
      "x-auth-token":token
    },
    responseType:'json',
  }).then(res => {
    if (res.data['code'] === 200) {
      receiptList = res.data['data'] as ReceiptInterface;
    }
    else return res.data['message'] as string
  }).catch(err => {
    return err.response.data['message'] as string;
  })

  return receiptList;
  }
}

export async function getReceiptTypeListFromAPI(){
  const token = await window.sessionStorage.getItem("token");
  let receiptTypeList = [] as any;
  if (token) {
    await axios({
    url: `${receiptTypeListUrl}`,
    baseURL: `${api_url}`,
    method: 'get',
    headers: {
      "x-auth-token":token
    },
    responseType:'json',
    }).then(res => {
      if (res.data['code'] === 200) {
        receiptTypeList = res.data['data'];
      }
      else return res.data['message']
    }).catch(err => {
      return err.response.data['message'];
    })

    return receiptTypeList;
  }
  
}

export async function getReceiptDetailFromAPI(_id:string){
  const token = await window.sessionStorage.getItem("token");
  let receiptDetailList = [] as any;
  if (token) {
    await axios({
    url: `${receiptDetailUrl}/${_id}`,
    baseURL: `${api_url}`,
    method: 'get',
    headers: {
      "x-auth-token":token
    },
    responseType:'json',
  }).then(res => {
    if (res.data['code'] === 200) {
      receiptDetailList = res.data['data'];
    }
    else return res.data['message']
  }).catch(err => {
    return err.response.data['message'];
  })

  return receiptDetailList;
  }
  
}

export async function getCategoryListFromAPI() {
  let categoryList = [] as any;
  await axios({
      url: `${categoryListUrl}`,
      method: 'get',
      baseURL: `${api_url}`,
      responseType: 'json',
    })
      .then((res) => {
        if (res.data['code'] === 200) {
          categoryList = res.data['data'];
        }
        else return res.data['message'] as string
      })
      .catch((err) => {
        return err.response.data['message'] as string
      });
  return categoryList;
}

export async function getProductByCategoryFromAPI(id_category:string) {
  let productList = [] as any;
  await axios({
      url: `/category/get-product-list/${id_category}`,
      baseURL: `${api_url}`,
      method: 'get',
      responseType: 'json',
    })
      .then((res) => {
        if (res.data['code'] === 200) {
          productList=res.data['data']
        }
        else {
          return res.data['message'] as string;
        }
      })
      .catch((err) => {
        return err.response.data['message'] as string;
      });
  return productList;
}