// Cloudflare supports the GET, POST, HEAD, and OPTIONS methods from any origin,
// and allow any header on requests. These headers must be present
// on all responses to all CORS preflight requests. In practice, this means
// all responses to OPTIONS requests.
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
  'Access-Control-Max-Age': '86400',
}

import ProductRoute from './routes/product'
import SearchRoute from './routes/search'
import InventoryRoute from './routes/inventory'

export async function handleRequest(request: Request): Promise<Response> {
  const { pathname } = new URL(request.url)

  if (pathname.startsWith('/search')) {
    return SearchRoute(request)
      .then((response) => {
        return new Response(JSON.stringify(response), {
          status: 200,
          headers: {
            ...corsHeaders,
            'content-type': 'application/json;charset=UTF-8',
          },
        })
      })
      .catch((reason) => {
        return new Response(JSON.stringify(reason), {
          status: 500,
          headers: {
            ...corsHeaders,
            'content-type': 'application/json;charset=UTF-8',
          },
        })
      })
  }

  if (pathname.startsWith('/product')) {
    return ProductRoute(request)
      .then(response => {
        return new Response(JSON.stringify(response), {
          status: 200,
          headers: {
            ...corsHeaders,
            'content-type': 'application/json;charset=UTF-8',
          },
        })
      })
      .catch((reason) => {
        return new Response(JSON.stringify(reason), {
          status: 500,
          headers: {
            ...corsHeaders,
            'content-type': 'application/json;charset=UTF-8',
          },
        })
      })
  }

  if (pathname.startsWith('/inventory')) {
    return InventoryRoute(request)
      .then(response => {
        return new Response(JSON.stringify(response), {
          status: 200,
          headers: {
            ...corsHeaders,
            'content-type': 'application/json;charset=UTF-8',
          },
        })
      })
      .catch((reason) => {
        return new Response(JSON.stringify(reason), {
          status: 500,
          headers: {
            ...corsHeaders,
            'content-type': 'application/json;charset=UTF-8',
          },
        })
      })
  }

  return fetch('https://welcome.developers.workers.dev')
}
