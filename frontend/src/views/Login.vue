<template>
    <div class="min-h-screen bg-green-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
            <div class="text-center mb-8">
                <h1 class="text-3xl font-bold text-green-700 mb-2">Вход в систему</h1>
                <p class="text-gray-600">Введите ваши учетные данные</p>
            </div>
            
            <form @submit.prevent="login" class="space-y-6">
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                        id="email" 
                        v-model="email" 
                        type="email" 
                        placeholder="Ваш email"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                        required
                    />
                </div>
                
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
                    <input 
                        id="password" 
                        v-model="password" 
                        type="password" 
                        placeholder="Ваш пароль"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                        required
                    />
                </div>
                
                <button 
                    type="submit" 
                    class="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition flex items-center justify-center"
                >
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                    </svg>
                    Войти
                </button>
                
                <p v-if="error" class="text-red-500 text-center">{{ error }}</p>
            </form>
            
            <div class="mt-6 text-center">
                <p class="text-gray-600">Нет аккаунта? 
                    <router-link to="/register" class="text-green-600 font-medium hover:underline">Зарегистрируйтесь</router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const store = useStore();
        const router = useRouter();
        const email = ref('');
        const password = ref('');
        const error = ref('');

        const login = async () => {
            error.value = '';
            const success = await store.dispatch('login', { 
                email: email.value, 
                password: password.value 
            });
            if (success) {
                router.push('/');
            } else {
                error.value = 'Неверный email или пароль';
            }
        };

        return { email, password, error, login };
    }
};
</script>

<style scoped>
/* Дополнительные стили, если необходимо */
</style>