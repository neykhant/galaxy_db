import {
  SHOW_VOUCHERS,
  SHOW_VOUCHER,
  FILTER_VOUCHERS,
  ERROR_VOUCHERS,
  PAGINATE_VOUCHERS,
} from '../type'

const initialState = {
  vouchers: [],
  voucher: {},
  error: {},
  total: 0,
  total_credit: 0,
  total_final_total: 0,
  total_paid: 0,
}

const item = (state = initialState, action) => {
  switch (action.type) {
    case PAGINATE_VOUCHERS:
      return {
        ...state,
        vouchers: action.payload.data.map((voucher) => {
          return {
            ...voucher,
            key: voucher.id,
          }
        }),
        total: action.payload.total,
        total_credit: action.payload.total_credit,
        total_final_total: action.payload.total_final_total,
        total_paid: action.payload.total_paid,
      }
    case SHOW_VOUCHERS:
      return {
        ...state,
        vouchers: action.vouchers,
      }
    case SHOW_VOUCHER:
      return {
        ...state,
        voucher: action.vouchers,
      }
    case FILTER_VOUCHERS:
      const filterVouchers = state.vouchers.filter((v) => v.id !== action.id)
      return {
        ...state,
        vouchers: filterVouchers,
      }
    case ERROR_VOUCHERS:
      return {
        ...state,
        error: action.error,
      }
    default:
      return state
  }
}

export default item
