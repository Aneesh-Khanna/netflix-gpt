import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice(
    {
        name : 'user' ,
        initialState :  null,
        reducers : {
            addUser : (state,action)=>{     // for signin .
                return action.payload;     
            } ,

            removeUser: (state,action)=>{   // for signout .
                return null;
            }
        }
    }
);


export const {addUser , removeUser } = userSlice.actions ;

export default userSlice.reducer ;