import { createSlice } from '@reduxjs/toolkit';

export interface Profile {
    user: {
        profile: {
            id: number;
            email: string;
            password: string;
            name: string;
            spread: number;
            role: string;
        };
    };
}

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        profile: {
            id: 0,
            email: '',
            password: '',
            name: '',
            spread: 0,
            role: '',
        },
    },
    reducers: {
        setUser: (state, action) => {
            console.log(action.payload);
            state.profile = {
                id: action.payload.id,
                email: action.payload.email,
                password: action.payload.password,
                name: action.payload.name,
                spread: action.payload.spread,
                role: action.payload.role,
            };
        },
        clearUser: (state) => {
            state.profile = {
                id: 0,
                email: '',
                password: '',
                name: '',
                spread: 0,
                role: '',
            };
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice;
