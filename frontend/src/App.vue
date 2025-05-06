<template>
    <div class="min-h-screen flex flex-col">
        <Header />
        <main class="flex-grow">
            <router-view />
        </main>
        <Footer />
    </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
    components: { Header, Footer }
};
</script>
<style scoped>
/* Основные цвета темы */
:root {
  --primary-green: #2e7d32;
  --primary-green-light: #4caf50;
  --primary-green-dark: #1b5e20;
  --secondary-green: #81c784;
  --accent-green: #a5d6a7;
  --light-bg: #f1f8e9;
  --dark-text: #263238;
  --light-text: #eceff1;
}

body {
  font-family: 'Roboto', sans-serif;
  background-color: #f9f9f9;
  color: var(--dark-text);
  line-height: 1.6;
}

/* Глобальные анимации */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fadeIn 0.5s ease-in;
}

/* Кастомные кнопки */
.btn-green {
  background-color: var(--primary-green);
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.btn-green:hover {
  background-color: var(--primary-green-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.btn-outline-green {
  background-color: transparent;
  color: var(--primary-green);
  border: 2px solid var(--primary-green);
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-outline-green:hover {
  background-color: var(--primary-green);
  color: white;
}
/* Стили для таблиц */
.table-container {
  @apply overflow-x-auto shadow-md rounded-lg;
}

.table {
  @apply w-full text-left text-gray-700;
}

.table thead {
  @apply bg-green-600 text-white;
}

.table th {
  @apply px-6 py-4 font-medium;
}

.table tbody tr {
  @apply bg-white border-b hover:bg-green-50 transition;
}

.table td {
  @apply px-6 py-4;
}

.table-actions {
  @apply flex space-x-2;
}

/* Стили для кнопок в таблице */
.btn-table {
  @apply px-3 py-1 rounded text-sm font-medium transition;
}

.btn-view {
  @apply bg-green-500 text-white hover:bg-green-600;
}

.btn-edit {
  @apply bg-yellow-500 text-white hover:bg-yellow-600;
}

.btn-delete {
  @apply bg-red-500 text-white hover:bg-red-600;
}

.btn-add {
  @apply bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition;
}
</style>