import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const API = ' http://localhost:8000/users'
const FAVORITE_API = ' http://localhost:8000/favorites'

export const getUsers = createAsyncThunk(
    'users/getUsers',
    async () => {
        let res = await axios.get(API)
        // console.log(res);
        return res.data
    }
)

export const getOneUser = createAsyncThunk(
    'user/getOneUser',
    async  (id) => {
        let { data } = await axios.get(`${API}/${id}`);
        return data;
    }
)

export const createUser = createAsyncThunk(
    'users/createUser',
    async (newUserObj, { dispatch }) => {
       await axios.post(API, newUserObj);
       dispatch(getUsers())
    }
);

export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async(id,{dispatch}) => {
        await axios.delete(`${API}/${id}`);
        await axios.delete(`${FAVORITE_API}/favorites-${id}`);
        dispatch(getUsers())
    }
) 

export const saveChanges = createAsyncThunk(
    'users/saveChanger',
    async (updatedUserObj, {dispatch}) => {
        await axios.patch(`${API}/${updatedUserObj.id}`, updatedUserObj);
        let id = updatedUserObj.id
        await axios.patch(`${FAVORITE_API}/favorites-${id}`, updatedUserObj);
        dispatch(getUsers())
    }  
)

export const addToFavorites = createAsyncThunk(
    'users/addToFavorites',
    async (updatedUserObj, { dispatch }) => {
        if(updatedUserObj.favorites) {
            let favoriteObj = {
                id: `favorite-${updatedUserObj.id}`,
                user: updatedUserObj
            };
            await axios.post(FAVORITE_API, favoriteObj);
        } else {
            await axios.delete(`${FAVORITE_API}/favorite-${updatedUserObj.id}`);
        };
        await dispatch(saveChanges(updatedUserObj));
        dispatch(getFavorites());
    }
);

export const getFavorites = createAsyncThunk(
    'users/getFavorites',
    async () => {
        let {data} = await axios.get(FAVORITE_API)
        return data;
    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        favorites: [],
        oneUser: null,
        loading: false,
        error: null
    },
    reducers: {
        cleanOneUser: (state, action) => {
            state.oneUser = null
        }
    },
    extraReducers: {
        [getUsers.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        [getUsers.fulfilled]: (state, action) => {
            // console.log(action);
            state.users = action.payload;
            state.loading = false;
        },
        [getUsers.rejected]: (state, action) => {
            // console.log(action);
            state.error = action.error.message;
            state.loading = false;
        },
        [getOneUser.fulfilled]: (state, action) => {
            state.oneUser = action.payload
        },
        [getFavorites.fulfilled]: (state, action) =>{
            state.favorites = action.payload
        }
    }

});

export const { cleanOneUser } = usersSlice.actions;
export default usersSlice.reducer;
