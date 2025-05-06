import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        user: null, // { token, role }
        isAuthenticated: false
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            state.isAuthenticated = !!user;
        },
        clearUser(state) {
            state.user = null;
            state.isAuthenticated = false;
        }
    },
    actions: {
        async register({ commit }, { email, password }) {
            try {
                await axios.post('/api/register', { email, password });
                return { success: true };
            } catch (error) {
                console.error('Registration failed:', error.response?.data?.error || error.message);
                return {
                    success: false,
                    error: error.response?.data?.error || 'Registration failed'
                };
            }
        },
        async login({ commit }, { email, password }) {
            try {
                const response = await axios.post('/api/login', { email, password });
                const { token, role } = response.data;
                localStorage.setItem('token', token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                commit('setUser', { token, role });
                return true;
            } catch (error) {
                console.error('Login failed:', error);
                return false;
            }
        },
        logout({ commit }) {
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
            commit('clearUser');
        },
        initAuth({ commit }) {
            const token = localStorage.getItem('token');
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                commit('setUser', { token, role: 'user' }); // Роль уточняется при логине
            }
        }
    },
    getters: {
        isAuthenticated: (state) => state.isAuthenticated,
        userRole: (state) => state.user?.role || null
    }
});