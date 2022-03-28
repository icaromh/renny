export const SEARCH_URL = 'http://127.0.0.1:8787/search'
export const PER_PAGE = 80


export const REQUEST_STATUS = {
    IDLE: 'IDLE',
    LOADING: 'LOADING',
    FAILED: 'FAILED',
    SUCCESS: 'SUCCESS',
}

export const INITIAL_STATE = {
    search: null,
    fetchStatus: REQUEST_STATUS.IDLE,
    pagination: {
        pages: null,
        current: 0,
    },
    products: [],
    selectedProduct: null,
};
