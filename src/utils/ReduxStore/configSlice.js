import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
    name : "config",
    initialState:{
        language : "en",
        theme : "dark" ,
        previousPage: null,
    },
    reducers : {
        changeLanguage: (state,action) => {
            state.language = action.payload;
        },
        changeTheme : (state,action)=>{
            state.theme = action.payload;
        },
        setPreviousPage: (state, action) => {
            state.previousPage = action.payload;
            sessionStorage.setItem("previousPage", action.payload); // ✅ persist so that
            //  back to browse button doesnt disappear on watch page on refresh
        },
    },
});

export const {changeLanguage , changeTheme , setPreviousPage} = configSlice.actions;
export default configSlice.reducer
