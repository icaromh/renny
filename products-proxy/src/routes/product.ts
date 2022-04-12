import { PRODUCT_URL } from "../constants";

export default async function ProductRoute(request: Request): Promise<any> {
  const { searchParams } = new URL(request.url)
  const productId = searchParams.get('productId')
  const skuId = searchParams.get('skuId');

  if (skuId) {
    return fetch(`${PRODUCT_URL}&skuId=${skuId}&productId=${productId}`)
      .then(response => response.json())
      .then((response: any) => {
        return {
          purchasable: response.purchasable,
          onSale: response.onSale,
          salePriceFormatted: response.salePriceFormatted,
          listPriceFormatted: response.listPriceFormatted,
          mediaSets: response.mediaSets
        }
      }).catch(console.log)
  }

  return Promise.reject({})
}
