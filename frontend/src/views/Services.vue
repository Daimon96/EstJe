<template>
    <div class="container mx-auto p-4">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-bold text-green-700">Услуги</h1>
            <button 
                v-if="isAdmin" 
                @click="showForm = true" 
                class="btn-add flex items-center"
            >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Добавить услугу
            </button>
        </div>

        <!-- Таблица услуг -->
        <div class="table-container">
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th>Категория</th>
                        <th>Изображение</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="service in services" :key="service.id">
                        <td>{{ service.id }}</td>
                        <td>{{ service.title }}</td>
                        <td>{{ service.category }}</td>
                        <td>
                            <img 
                                :src="getImageUrl(service.image)" 
                                alt="Service" 
                                class="w-16 h-16 object-cover rounded"
                            />
                        </td>
                        <td>
                            <div class="table-actions">
                                <button 
                                    @click="viewService(service)"
                                    class="btn-view flex items-center"
                                >
                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                    </svg>
                                    Просмотр
                                </button>
                                <button 
                                    v-if="isAdmin" 
                                    @click="editService(service)"
                                    class="btn-edit flex items-center"
                                >
                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                    </svg>
                                    Редактировать
                                </button>
                                <button 
                                    v-if="isAdmin" 
                                    @click="deleteService(service.id)"
                                    class="btn-delete flex items-center"
                                >
                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                    Удалить
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Пагинация -->
        <div class="mt-6 flex justify-center items-center space-x-2">
            <button 
                :disabled="currentPage === 1" 
                @click="currentPage = 1"
                class="px-3 py-1 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
            >
                В начало
            </button>
            <button 
                :disabled="currentPage === 1" 
                @click="currentPage--"
                class="px-3 py-1 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
            >
                Назад
            </button>
            <button 
                v-for="page in displayedPages" 
                :key="page" 
                @click="currentPage = page" 
                :class="[
                    'px-4 py-1 rounded-lg transition',
                    currentPage === page ? 'bg-green-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
                ]"
            >
                {{ page }}
            </button>
            <button 
                :disabled="currentPage === totalPages" 
                @click="currentPage++"
                class="px-3 py-1 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
            >
                Вперед
            </button>
            <button 
                :disabled="currentPage === totalPages" 
                @click="currentPage = totalPages"
                class="px-3 py-1 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
            >
                В конец
            </button>
        </div>
        <!-- Форма добавления/редактирования -->
        <div v-if="showForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div class="bg-white p-6 rounded max-w-lg w-full">
                <h2 class="text-xl font-bold mb-4">{{ form.id ? 'Редактировать услугу' : 'Добавить услугу' }}</h2>
                <Form @submit="saveService">
                    <div class="grid grid-cols-1 gap-4">
                        <input v-model="form.title" type="text" placeholder="Название" class="border p-2 rounded" required />
                        <textarea v-model="form.description" placeholder="Описание" class="border p-2 rounded"></textarea>
                        <input v-model="form.price" type="number" placeholder="Цена" class="border p-2 rounded" required />
                        <input v-model="form.duration" type="text" placeholder="Продолжительность" class="border p-2 rounded" required />
                        <input v-model="form.category" type="text" placeholder="Категория" class="border p-2 rounded" required />
                        <select v-model="form.is_available" class="border p-2 rounded" required>
                            <option :value="true">Доступно</option>
                            <option :value="false">Недоступно</option>
                        </select>
                        <input v-model="form.technician" type="text" placeholder="Техник" class="border p-2 rounded" />
                        <input type="file" @change="handleFileChange" class="border p-2 rounded" />
                    </div>
                </Form>
                <button @click="showForm = false" class="mt-4 bg-gray-500 text-white px-4 py-2 rounded">
                    Отмена
                </button>
            </div>
        </div>
        <!-- Модальное окно просмотра -->
        <div v-if="showView" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div class="bg-white p-6 rounded max-w-lg w-full">
                <h2 class="text-xl font-bold mb-4">Просмотр услуги</h2>
                <div class="grid grid-cols-1 gap-4">
                    <p><strong>ID:</strong> {{ viewServiceData.id }}</p>
                    <p><strong>Название:</strong> {{ viewServiceData.title }}</p>
                    <p><strong>Описание:</strong> {{ viewServiceData.description || 'Не указано' }}</p>
                    <p><strong>Цена:</strong> {{ viewServiceData.price }}</p>
                    <p><strong>Продолжительность:</strong> {{ viewServiceData.duration }}</p>
                    <p><strong>Категория:</strong> {{ viewServiceData.category }}</p>
                    <p><strong>Доступность:</strong> {{ viewServiceData.is_available ? 'Доступно' : 'Недоступно' }}</p>
                    <p><strong>Техник:</strong> {{ viewServiceData.technician || 'Не указано' }}</p>
                    <img :src="getImageUrl(viewServiceData.image)" alt="Service"
                        class="w-32 h-32 object-cover rounded" />
                </div>
                <button @click="showView = false" class="mt-4 bg-gray-500 text-white px-4 py-2 rounded">
                    Закрыть
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import Table from '../components/Table.vue';
import Form from '../components/Form.vue';

export default {
    components: { Table, Form },
    setup() {
        const store = useStore();
        const services = ref([]);
        const currentPage = ref(1);
        const limit = 10;
        const total = ref(0);
        const showForm = ref(false);
        const showView = ref(false);
        const viewServiceData = ref({});
        const form = ref({
            id: null,
            title: '',
            description: '',
            price: null,
            image: null,
            duration: '',
            category: '',
            is_available: true,
            technician: ''
        });
        const file = ref(null);
        const isAdmin = computed(() => store.getters.userRole === 'admin');
        const totalPages = computed(() => Math.ceil(total.value / limit));

        // Вычисление отображаемых страниц
        const displayedPages = computed(() => {
            const maxPagesToShow = 5;
            const pages = [];
            const half = Math.floor(maxPagesToShow / 2);
            let start = Math.max(1, currentPage.value - half);
            let end = Math.min(totalPages.value, start + maxPagesToShow - 1);
            if (end - start + 1 < maxPagesToShow) {
                start = Math.max(1, end - maxPagesToShow + 1);
            }
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            return pages;
        });

        const fetchServices = async () => {
            try {
                const response = await axios.get(`/api/services?page=${currentPage.value}&limit=${limit}`);
                services.value = response.data.services;
                total.value = response.data.total;
            } catch (error) {
                console.error('Failed to fetch services:', error);
            }
        };

        const saveService = async () => {
  const formData = new FormData();
  formData.append('title', form.value.title);
  formData.append('description', form.value.description);
  formData.append('price', form.value.price.toString());
  formData.append('duration', form.value.duration);
  formData.append('category', form.value.category);
  formData.append('is_available', form.value.is_available.toString());
  formData.append('technician', form.value.technician);
  
  if (file.value) {
    formData.append('image', file.value);
  } else if (form.value.image) {
    // Если редактируем и не меняем изображение
    formData.append('image', form.value.image);
  }

  try {
    const url = form.value.id 
      ? `/api/services/${form.value.id}`
      : '/api/services';
    
    const method = form.value.id ? 'put' : 'post';
    
    const response = await axios({
      method,
      url,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Добавляем токен
      }
    });
    
    console.log('Server response:', response.data);
    fetchServices();
    resetForm();
    showForm.value = false;
  } catch (error) {
    console.error('Full error:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      alert(`Ошибка сохранения: ${error.response.data.error || error.message}`);
    } else {
      alert('Ошибка сети или сервера');
    }
  }
};

        const editService = (service) => {
            form.value = { ...service };
            file.value = null;
            showForm.value = true;
        };

        const deleteService = async (id) => {
            if (confirm('Удалить услугу?')) {
                try {
                    await axios.delete(`/api/services/${id}`);
                    fetchServices();
                } catch (error) {
                    console.error('Failed to delete service:', error);
                }
            }
        };

        const viewService = (service) => {
            viewServiceData.value = { ...service };
            showView.value = true;
        };

        const resetForm = () => {
            form.value = {
                id: null,
                title: '',
                description: '',
                price: null,
                image: null,
                duration: '',
                category: '',
                is_available: true,
                technician: ''
            };
            file.value = null;
            showForm.value = false;
        };

        const handleFileChange = (event) => {
            file.value = event.target.files[0];
        };

        const getImageUrl = (image) => {
            return image ? `${image}` : '/images/placeholder.jpg';
        };

        watch(currentPage, fetchServices, { immediate: true });

        return {
            services,
            currentPage,
            totalPages,
            displayedPages,
            showForm,
            showView,
            viewServiceData,
            form,
            isAdmin,
            saveService,
            editService,
            deleteService,
            viewService,
            handleFileChange,
            getImageUrl
        };
    }
};
</script>