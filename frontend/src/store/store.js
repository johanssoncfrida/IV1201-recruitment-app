//Import configureStore api from Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';

//import reducer function and add to store
import authReducer from './reducers/authReducer';

//Redux Store
export default configureStore({
    /**
     * This is an object of slice reducers, we can add other reducers if we would like to keep things separately.
     * In this case, configureStore will automatically create the root reduser by passing this object to Redux CombineRedusers.
     * e.g:
     * 
     * rootreduser = combineReducers({person: personReducer, somethingelse: sometingReducer})
     * Will provide following state:
     * {
     *      person:{
     *          state stuff regardin person
     *      },
     *      somethingelse: {
     *          state stuff regarding somethingelse
     *      }
     * }
     */
    reducer: {
        person: authReducer
    },
});