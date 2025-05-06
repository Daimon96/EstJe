<template>
    <header class="bg-gradient-to-r from-green-700 to-green-500 text-white shadow-lg">
        <nav class="container mx-auto px-6 py-4">
            <div class="flex justify-between items-center">
                <div class="flex items-center space-x-2">
                    <svg class="w-8 h-8 text-green-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"></path>
                    </svg>
                    <h1 class="text-2xl font-bold tracking-tight">Мастерская <span class="text-green-200">"Картридж"</span></h1>
                </div>
                <div class="hidden md:flex items-center space-x-8">
                    <router-link 
                        v-for="link in links" 
                        :key="link.path"
                        :to="link.path" 
                        class="nav-link relative group"
                        :class="{ 'font-semibold': $route.path === link.path }"
                    >
                        {{ link.name }}
                        <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-200 transition-all group-hover:w-full"></span>
                    </router-link>
                    
                    <template v-if="!isAuthenticated">
                        <router-link to="/login" class="btn-outline-green px-4 py-2 text-sm">
                            Вход
                        </router-link>
                        <router-link to="/register" class="btn-green px-4 py-2 text-sm">
                            Регистрация
                        </router-link>
                    </template>
                    
                    <template v-else>
                        <span class="text-sm bg-green-600 px-3 py-1 rounded-full">{{ userRole }}</span>
                        <button @click="logout" class="flex items-center text-sm hover:text-green-200 transition">
                            <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                            </svg>
                            Выйти
                        </button>
                    </template>
                </div>
                
                <!-- Мобильное меню -->
                <button class="md:hidden focus:outline-none" @click="isMobileMenuOpen = !isMobileMenuOpen">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
            
            <!-- Мобильное меню (выпадающее) -->
            <div v-if="isMobileMenuOpen" class="md:hidden mt-4 space-y-3 pb-3">
                <router-link 
                    v-for="link in links" 
                    :key="link.path"
                    :to="link.path" 
                    class="block px-3 py-2 rounded hover:bg-green-600 transition"
                    @click="isMobileMenuOpen = false"
                >
                    {{ link.name }}
                </router-link>
                
                <div v-if="!isAuthenticated" class="pt-2 border-t border-green-600">
                    <router-link 
                        to="/login" 
                        class="block px-3 py-2 rounded hover:bg-green-600 transition mb-2"
                        @click="isMobileMenuOpen = false"
                    >
                        Вход
                    </router-link>
                    <router-link 
                        to="/register" 
                        class="block btn-green w-full text-center"
                        @click="isMobileMenuOpen = false"
                    >
                        Регистрация
                    </router-link>
                </div>
                
                <div v-else class="pt-2 border-t border-green-600">
                    <div class="px-3 py-2 text-sm">
                        Роль: <span class="font-medium">{{ userRole }}</span>
                    </div>
                    <button 
                        @click="logout" 
                        class="flex items-center w-full px-3 py-2 rounded hover:bg-green-600 transition"
                    >
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                        </svg>
                        Выйти
                    </button>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';

export default {
    setup() {
        const store = useStore();
        const router = useRouter();
        const isMobileMenuOpen = ref(false);

        const links = [
            { name: 'Главная', path: '/' },
            { name: 'О нас', path: '/about' },
            { name: 'Контакты', path: '/contacts' },
            { name: 'Устройства', path: '/devices' },
            { name: 'Услуги', path: '/services' }
        ];

        const isAuthenticated = computed(() => store.getters.isAuthenticated);
        const userRole = computed(() => store.getters.userRole);

        const logout = () => {
            store.dispatch('logout');
            router.push('/login');
            isMobileMenuOpen.value = false;
        };

        return { 
            isAuthenticated, 
            userRole, 
            logout,
            links,
            isMobileMenuOpen
        };
    }
};
</script>

<style scoped>
.nav-link {
    @apply text-white hover:text-green-200 transition-colors;
}

.router-link-active {
    @apply text-green-200;
}
</style>