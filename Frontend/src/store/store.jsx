import { configureStore } from '@reduxjs/toolkit'
import backendUrlReducer from './Reducers/backendUrlReducer'
import numReducer from './Reducers/numReducer'
import tokenReducer from './Reducers/tokenReducer'
import rcbproductsReducer from './Reducers/rcbproductsReducer'
import kkrproductsReducer from './Reducers/kkrproductsReducer'
import miproductsReducer from './Reducers/miproductsReducer'
import cartReducer from './Reducers/cartReducer'
import userIdReducer from './Reducers/userIdReducer'
import totalNumberOfItemsReducer from './Reducers/totalNumberOfItems'
import orderReducer from './Reducers/orderReducer'
import reviewReducer from './Reducers/reviewReducer'
export default configureStore({
  reducer: {    
    backendUrl: backendUrlReducer,
    num: numReducer,
    token: tokenReducer,
    rcbproducts: rcbproductsReducer,
    kkrproducts: kkrproductsReducer,
    miproducts: miproductsReducer,
    cart: cartReducer,
    userId: userIdReducer,
    totalNumberOfItems: totalNumberOfItemsReducer,
    order:orderReducer,
    review:reviewReducer
  }
})