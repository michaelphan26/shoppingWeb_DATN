import axios from 'axios';
import { CartInterface, CompanyInterface, JustNameItemInterface, ProductItem, ReceiptInterface, UserInfo } from './common';

export const api_url = 'http://192.168.1.15:5000/api';

export const productListUrl = 'product/product-list';
export const productDetailUrl = 'product/product-detail';
export const getUserDetailUrl = '/user/me';
export const receiptListUrl = 'receipt/receipt-list';
export const receiptTypeListUrl = 'receipt-type/get-list';
export const receiptDetailUrl = 'receipt/receipt-detail';
export const categoryListUrl = 'category/category-list';
export const getCompanyUrl = 'company/';

//Admin
export const adminGetMainSummaryUrl = 'admin/main-summary';
export const adminAddCategoryUrl = 'admin/add-category/';
export const adminEditCategoryUrl = 'admin/edit-category/';
export const adminDeleteCategoryUrl = 'admin/delete-category/';
export const adminAddReceiptTypeUrl = 'admin/add-receipt-type/';
export const adminEditReceiptTypeUrl = 'admin/edit-receipt-type/';
export const adminDeleteReceiptTypeUrl = 'admin/delete-receipt-type/';
export const adminAddIOTypeUrl = 'admin/add-io-type/';
export const adminEditIOTypeUrl = 'admin/edit-io-type/';
export const adminDeleteIOTypeUrl = 'admin/delete-io-type/';
export const adminAddRoleUrl = 'admin/add-role/';
export const adminEditRoleUrl = 'admin/edit-role/';
export const adminDeleteRoleUrl = 'admin/delete-role/';
export const adminAddCompanyUrl = 'admin/add-company/';
export const adminEditCompanyUrl = 'admin/edit-company/';
export const adminDeleteCompanyUrl = 'admin/delete-company/';
export const adminAddProductUrl = 'admin/add-product/';
export const adminEditProductUrl = 'admin/edit-product/';
export const adminDeleteProductUrl = 'admin/delete-product/';
export const adminAddIOProductUrl = 'admin/add-io/';

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

export async function getMainSummaryAPI() {
  const token = await window.sessionStorage.getItem("token");
  let mainSummaryList = [] as any;
  if (token) {
    await axios({
      url: `${adminGetMainSummaryUrl}`,
      method: 'get',
      baseURL: `${api_url}`,
    responseType: 'json',
    headers: {
        "x-auth-token":token
      }
    })
      .then((res) => {
        console.log(res);
        if (res.data['code'] === 200) {
          mainSummaryList = res.data['data'];
        }
        else return res.data['message'] as string
      })
      .catch((err) => {
        return err.response.data['message'] as string
      });
  return mainSummaryList;
  }
}

export async function getIOTypeListFromAPI() {
  const token = await window.sessionStorage.getItem("token");
  let IOTypeList = [] as any;
  if (token) {
    await axios({
    url: `io-type/get-list`,
    baseURL: `${api_url}`,
    method: 'get',
    headers: {
      "x-auth-token":token
    },
    responseType:'json',
  }).then(res => {
    if (res.data['code'] === 200) {
      IOTypeList = res.data['data'];
    }
    else return res.data['message']
  }).catch(err => {
    return err.response.data['message'];
  })

  return IOTypeList;
  }
  
}

export async function getRoleFromAPI() {
  const token = await window.sessionStorage.getItem("token");
  let roleList = [] as any;
  if (token) {
    await axios({
    url: `role/get-list`,
    baseURL: `${api_url}`,
    method: 'get',
    headers: {
      "x-auth-token":token
    },
    responseType:'json',
  }).then(res => {
    if (res.data['code'] === 200) {
      roleList = res.data['data'];
    }
    else return res.data['message']
  }).catch(err => {
    return err.response.data['message'];
  })

  return roleList;
  }
  
}

export async function addJustName(url:string, name: string) {
  const token = await window.sessionStorage.getItem("token");
  let code: number = 0
  if (token) {
    await axios({
      url: `${url}`,
      baseURL: `${api_url}`,
      method: 'post',
      headers: {
        "x-auth-token": token
      },
      data: {
        "name": name
      }
    }).then(res => {
      code = res.data['code'] as number;
      return code
    })
      .catch(err => {
        code = err.response.data['code'] as number
        return code
      })
    return code;
  }
}

export async function deleteJustName(url:string, item:JustNameItemInterface) {
  const token = await window.sessionStorage.getItem("token");
  let code: number = 0
  if (token) {
    await axios({
    url: `${url}${item._id}`,
    baseURL: `${api_url}`,
    method: 'delete',
    headers: {
      "x-auth-token":token
    },
  }).then(res => {
    code = res.data['code'] as number;
    return code
  })
    .catch(err => {
      code = err.response.data['code'] as number
      return code
    })
  return code;
  }
  
}

export async function editJustName(url:string,item: JustNameItemInterface) {
  const token = await window.sessionStorage.getItem("token");
  let code: number = 0
  if (token) {
    await axios({
    url: `${url}${item._id}`,
    baseURL: `${api_url}`,
    method: 'put',
    headers: {
      "x-auth-token":token
    },
    data: {
      "name":item.name
    }
  }).then(res => {
    code = res.data['code'] as number;
    return code;
  })
    .catch(err => {
      code = err.response.data['code'] as number
      return code
    })
    return code;
  }
  
}

export async function getCompanyListFromAPI() {
  const token = await window.sessionStorage.getItem("token");
  let companyList = [] as any
  if (token) {
    await axios({
    url: 'company/get-list',
    baseURL: `${api_url}`,
    headers: {
      "x-auth-token":token
    },
    responseType:'json'
  }).then(res => {
    if (res.data['code'] === 200)
      companyList = res.data['data']
    else return res.data['message']
  }).catch(err =>{
    return err.response['data']
  })
  return companyList
  }
  
}

export async function addCompanyToAPI(companyInfo:CompanyInterface) {
  const token = await window.sessionStorage.getItem("token");
  let code: number = 0
  if (token) {
    await axios({
    url: `${adminAddCompanyUrl}`,
    baseURL: `${api_url}`,
    method: 'post',
    headers: {
      "x-auth-token":token
    },
    responseType: 'json',
    data:companyInfo
  }).then(res => {
    code=res.data['code']
  }).catch(err => {
    code= err.response.data['code'];
  })
  return code
  }
  
}

export async function editCompanyAPI(_id:string,companyInfo:CompanyInterface) {
  const token = await window.sessionStorage.getItem("token");
  let code: number = 0
  if (token) {
    await axios({
    url: `${adminEditCompanyUrl}${_id}`,
    baseURL: `${api_url}`,
    method: 'put',
    headers: {
      "x-auth-token":token
    },
    responseType: 'json',
    data:companyInfo
  }).then(res => {
    code=res.data['code']
  }).catch(err => {
    code= err.response.data['code'];
  })
  return code
  }
  
}

export async function deleteCompany(_id:string) {
  const token = await window.sessionStorage.getItem("token");
  let code: number = 0
  if (token) {
    await axios({
    url: `${adminDeleteCompanyUrl}${_id}`,
    baseURL: `${api_url}`,
    method: 'delete',
    headers: {
      "x-auth-token":token
    },
  }).then(res => {
    code = res.data['code'] as number;
    return code
  })
    .catch(err => {
      code = err.response.data['code'] as number
      return code
    })
  return code
  }
  
}