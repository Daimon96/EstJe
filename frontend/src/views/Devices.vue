<template>
    <div class="container mx-auto p-4">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-bold text-green-700">Устройства</h1>
            <button 
                v-if="isAdmin" 
                @click="showForm = true" 
                class="btn-add flex items-center"
            >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Добавить устройство
            </button>
        </div>

        <!-- Таблица устройств -->
        <div class="table-container">
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th>Модель</th>
                        <th>Изображение</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="device in devices" :key="device.id">
                        <td>{{ device.id }}</td>
                        <td>{{ device.name }}</td>
                        <td>{{ device.model }}</td>
                        <td>
                            <img 
                                :src="getImageUrl(device.image)" 
                                alt="Device" 
                                class="w-16 h-16 object-cover rounded"
                            />
                        </td>
                        <td>
                            <div class="table-actions">
                                <button 
                                    @click="viewDevice(device)"
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
                                    @click="editDevice(device)"
                                    class="btn-edit flex items-center"
                                >
                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                    </svg>
                                    Редактировать
                                </button>
                                <button 
                                    v-if="isAdmin" 
                                    @click="deleteDevice(device.id)"
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
                <h2 class="text-xl font-bold mb-4">{{ form.id ? 'Редактировать устройство' : 'Добавить устройство' }}</h2>
                <Form @submit="saveDevice">
                    <div class="grid grid-cols-1 gap-4">
                        <input v-model="form.name" type="text" placeholder="Название" class="border p-2 rounded" required />
                        <input v-model="form.model" type="text" placeholder="Модель" class="border p-2 rounded" required />
                        <textarea v-model="form.description" placeholder="Описание" class="border p-2 rounded"></textarea>
                        <input v-model="form.price" type="number" placeholder="Цена" class="border p-2 rounded" required />
                        <select v-model="form.status" class="border p-2 rounded" required>
                            <option value="available">Доступно</option>
                            <option value="unavailable">Недоступно</option>
                        </select>
                        <input v-model="form.client_name" type="text" placeholder="Имя клиента" class="border p-2 rounded" />
                        <input v-model="form.client_phone" type="text" placeholder="Телефон клиента" class="border p-2 rounded" />
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
                <h2 class="text-xl font-bold mb-4">Просмотр устройства</h2>
                <div class="grid grid-cols-1 gap-4">
                    <p><strong>ID:</strong> {{ viewDeviceData.id }}</p>
                    <p><strong>Название:</strong> {{ viewDeviceData.name }}</p>
                    <p><strong>Модель:</strong> {{ viewDeviceData.model }}</p>
                    <p><strong>Описание:</strong> {{ viewDeviceData.description || 'Не указано' }}</p>
                    <p><strong>Цена:</strong> {{ viewDeviceData.price }}</p>
                    <p><strong>Статус:</strong> {{ viewDeviceData.status }}</p>
                    <p><strong>Имя клиента:</strong> {{ viewDeviceData.client_name || 'Не указано' }}</p>
                    <p><strong>Телефон клиента:</strong> {{ viewDeviceData.client_phone || 'Не указано' }}</p>
                    <img :src="getImageUrl(viewDeviceData.image)" alt="Device"
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
        const devices = ref([]);
        const currentPage = ref(1);
        const limit = 10;
        const total = ref(0);
        const showForm = ref(false);
        const showView = ref(false);
        const viewDeviceData = ref({});
        const form = ref({
            id: null,
            name: '',
            model: '',
            description: '',
            price: null,
            status: '',
            client_name: '',
            client_phone: '',
            image: null
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

        const fetchDevices = async () => {
            try {
                const response = await axios.get(`/api/devices?page=${currentPage.value}&limit=${limit}`);
                devices.value = response.data.devices;
                total.value = response.data.total;
            } catch (error) {
                console.error('Failed to fetch devices:', error);
            }
        };

        const saveDevice = async () => {
            const formData = new FormData();
            formData.append('name', form.value.name);
            formData.append('model', form.value.model);
            formData.append('description', form.value.description);
            formData.append('price', form.value.price);
            formData.append('status', form.value.status);
            formData.append('client_name', form.value.client_name);
            formData.append('client_phone', form.value.client_phone);
            if (file.value) formData.append('image', file.value);
            else if (form.value.image) formData.append('image', form.value.image);

            try {
                if (form.value.id) {
                    await axios.put(`/api/devices/${form.value.id}`, formData);
                } else {
                    await axios.post(`/api/devices`, formData);
                }
                fetchDevices();
                resetForm();
            } catch (error) {
                console.error('Failed to save device:', error);
            }
        };

        const editDevice = (device) => {
            form.value = { ...device };
            file.value = null;
            showForm.value = true;
        };

        const deleteDevice = async (id) => {
            if (confirm('Удалить устройство?')) {
                try {
                    await axios.delete(`/api/devices/${id}`);
                    fetchDevices();
                } catch (error) {
                    console.error('Failed to delete device:', error);
                }
            }
        };

        const viewDevice = (device) => {
            viewDeviceData.value = { ...device };
            showView.value = true;
        };

        const resetForm = () => {
            form.value = {
                id: null,
                name: '',
                model: '',
                description: '',
                price: null,
                status: '',
                client_name: '',
                client_phone: '',
                image: null
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

        watch(currentPage, fetchDevices, { immediate: true });

        return {
            devices,
            currentPage,
            totalPages,
            displayedPages,
            showForm,
            showView,
            viewDeviceData,
            form,
            isAdmin,
            saveDevice,
            editDevice,
            deleteDevice,
            viewDevice,
            handleFileChange,
            getImageUrl
        };
    }
};
</script>