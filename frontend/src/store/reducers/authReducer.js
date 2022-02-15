import { createSlice } from "@reduxjs/toolkit";

/**
 * Redux Toolkit's createSlice function lets you
 * write immutable updates easier (instead of using spread operator)
 * 
 * createSLice uses a library called Immer. Immer uses
 * a special js tool called a proxy to wrap the data you provide.
 * Immer tracks all the changes you've tried to make,
 * and then uses that list of changes to return a safely
 * immutable updated value.
 */
export const currentPerson = createSlice({
    name: 'person',
    initialState: {
        name: 'reduxname',
        surname: 'reduxsurname',
        pnr: 'reduxpnr',
        email: 'reduxemail',
        password: 'reduxpassword',
        username: 'reduxusername',
    },
    reducers: {
        setCurrentPerson: (state, action) => {
            return state = {
                name: action.payload.person.name,
                surname: action.payload.person.surname,
                pnr: action.payload.person.pnr,
                email: action.payload.person.email,
                password: action.payload.person.password,
                username: action.payload.person.username
            }
        },
    },
});

export const selectPerson = state => state.person;

export const { setCurrentPerson } = currentPerson.actions;
export default currentPerson.reducer;