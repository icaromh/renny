import { INVENTORY_URL } from "../constants";

export default function InventoryRoute(request: Request): Promise<any> {
  // productId=582642395
  // skuList= 582642424,582642416,582642408,582642441,582642432
  const { searchParams } = new URL(request.url)
  const productId = searchParams.get('productId')
  const skuList = searchParams.get('skuList');

  if (skuList) {
    return fetch(`${INVENTORY_URL}&skuList=${skuList}&productId=${productId}`)
      .then(response => response.json())
      .then((response: any) => {
        return response.result.reduce((acc: any, cur: any) => {
          acc[cur.skuId] = cur.purchasable
          return acc  
        }, {})
      })
      .catch((err: any) => {
        return skuList.split(',').reduce((acc: any, cur: any) => {
          acc[cur] = false
          return acc  
        }, {}) 
      })
  }

  return Promise.reject({})
}