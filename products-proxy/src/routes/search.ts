import { RESULTS_PER_PAGE, SEARCH_URL } from '../constants'

type Product = {
  name: string
  id: string
  size: Array<string>
  sku_list: Array<string>
  imageId: string
  linkId: string
  gender: Array<string>
  categoryName: Array<string>
}

function mapProducts(product: any): Product {
  return {
    name: product.name,
    id: product.parent_product_id,
    size: product.size,
    sku_list: product.sku_list,
    imageId: product.imageId,
    linkId: product.linkId,
    gender: product.gender,
    categoryName: product.categoryName,
  }
}

function SearchRoute(request: Request): Promise<any> {
  const { searchParams } = new URL(request.url)

  const term = searchParams.get('query')
  const page: number = parseInt(searchParams.get('page') || '0', 10)
  const searchUrl = `${SEARCH_URL}&query=${term}&start=${page * RESULTS_PER_PAGE}`

  return fetch(searchUrl)
    .then((response) => response.json())
    .then((response: any) => {
      const placement = response.placements[0]
      try {
        const products = placement.docs.map(mapProducts)
        return {
          data: products,
          total: placement.numFound,
        }
      } catch (err: any) {
        return {
          err: err.message,
          response,
        }
      }
    })
    .catch((err) => {
      return {
        err: err.message,
      }
    })
}

export default SearchRoute
