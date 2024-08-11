import { createSlice } from "@reduxjs/toolkit";

// auth slice
export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null,
        posts: []
    },
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        setLogout: (state) => {
            state.user = null
            state.token = null
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts
        },
        setPost: (state, action) => {
            const updatedPosts = state.payload.map((post) => {
                if (post._id === action.payload.post_id) {
                    return post
                }
            })
            state.posts = updatedPosts
        }
    } 
})

export const { setLogin, setLogout, setPosts, setPost } = authSlice.actions

export default authSlice.reducer