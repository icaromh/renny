import { INITIAL_STATE } from './constants'

function reducer(state, action) {
  switch (action.type) {
    case 'SET_SEARCH':
      console.log('SET_SEARCH', action.value)
      return {
        ...state,
        search: action.value
      }
    case 'RESET':
      return { ...INITIAL_STATE };

    case 'SET_FETCH_STATUS':
      return {
        ...state,
        fetchStatus: action.value
      }

    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.value
      }

    case 'LOAD_MORE_PRODUCTS':
      return {
        ...state,
        pagination: {
          pages: action.value.total,
          current: state.pagination.current,
        },
        products: [...state.products, ...action.value.data]
      }

    case 'LOAD_PAGE':
      return {
        ...state,
        pagination: {
          pages: action.value.total,
          current: action.value.page,
        },
        products: action.value.products
      }
    default:
      throw new Error();
  }
}

export default reducer