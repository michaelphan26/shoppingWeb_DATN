import axios from 'axios';

export const api_url = 'http://192.168.1.13:5000/api';

export const productListUrl = 'product/product-list';

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