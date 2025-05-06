<template>
    <div class="min-h-screen bg-green-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
            <div class="text-center mb-8">
                <h1 class="text-3xl font-bold text-green-700 mb-2">Регистрация</h1>
                <p class="text-gray-600">Создайте новый аккаунт</p>
            </div>
            
            <form @submit.prevent="register" class="space-y-6">
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
                
                <div>
                    <label for="confirm-password" class="block text-sm font-medium text-gray-700 mb-1">Подтвердите пароль</label>
                    <input 
                        id="confirm-password" 
                        v-model="confirmPassword" 
                        type="password" 
                        placeholder="Повторите пароль"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                        required
                    />
                </div>
                
                <button 
                    type="submit" 
                    class="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition flex items-center justify-center"
                >
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
                    </svg>
                    Зарегистрироваться
                </button>
                
                <p v-if="error" class="text-red-500 text-center">{{ error }}</p>
            </form>
            
            <div class="mt-6 text-center">
                <p class="text-gray-600">Уже есть аккаунт? 
                    <router-link to="/login" class="text-green-600 font-medium hover:underline">Войдите</router-link>
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
        const confirmPassword = ref('');
        const error = ref('');

        const register = async () => {
            error.value = '';
            if (password.value !== confirmPassword.value) {
                error.value = 'Пароли не совпадают';
                return;
            }
            try {
                const result = await store.dispatch('register', {
                    email: email.value,
                    password: password.value
                });
                if (result.success) {
                    router.push('/login');
                } else {
                    error.value = result.error;
                }
            } catch (err) {
                error.value = err.response?.data?.error || 'Ошибка регистрации';
            }
        };

        return { email, password, confirmPassword, error, register };
    }
};
</script>

<style scoped>
/* Дополнительные стили, если необходимо */
</style>