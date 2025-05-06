<template>
  <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold text-center mb-12 relative">
          <span class="relative inline-block">
              Контакты
              <span class="absolute -bottom-2 left-0 w-full h-1 bg-green-500 rounded-full"></span>
          </span>
      </h1>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
              <div class="bg-white rounded-xl shadow-md p-6 mb-8">
                  <h2 class="text-2xl font-semibold mb-6 text-green-700">Как нас найти</h2>
                  
                  <div class="space-y-4">
                      <div class="flex items-start">
                          <div class="flex-shrink-0 bg-green-100 p-2 rounded-full mr-4">
                              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                              </svg>
                          </div>
                          <div>
                              <h3 class="font-medium text-lg mb-1">Адрес</h3>
                              <p class="text-gray-600">г. Москва, ул. Примерная, д. 123, офис 45</p>
                          </div>
                      </div>
                      
                      <div class="flex items-start">
                          <div class="flex-shrink-0 bg-green-100 p-2 rounded-full mr-4">
                              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                              </svg>
                          </div>
                          <div>
                              <h3 class="font-medium text-lg mb-1">Телефон</h3>
                              <p class="text-gray-600">+7 (123) 456-78-90</p>
                              <p class="text-gray-600 text-sm mt-1">Телефон для срочных заказов</p>
                          </div>
                      </div>
                      
                      <div class="flex items-start">
                          <div class="flex-shrink-0 bg-green-100 p-2 rounded-full mr-4">
                              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                              </svg>
                          </div>
                          <div>
                              <h3 class="font-medium text-lg mb-1">Email</h3>
                              <p class="text-gray-600">info@repair-shop.example</p>
                              <p class="text-gray-600 text-sm mt-1">Для заявок и вопросов</p>
                          </div>
                      </div>
                  </div>
              </div>

              <!-- Часы работы -->
              <div class="bg-white rounded-xl shadow-md p-6 mb-8">
                  <h2 class="text-2xl font-semibold mb-6 text-green-700">Часы работы</h2>
                  
                  <div class="space-y-3">
                      <div v-for="(hour, index) in workingHours" :key="index" class="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                          <span class="font-medium">{{ hour.day }}</span>
                          <span class="text-gray-600">{{ hour.time }}</span>
                      </div>
                  </div>
              </div>

              <!-- Форма обратной связи -->
              <div class="bg-white rounded-xl shadow-md p-6">
                  <h2 class="text-2xl font-semibold mb-6 text-green-700">Форма обратной связи</h2>
                  
                  <form @submit.prevent="submitForm" class="space-y-4">
                      <div>
                          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Ваше имя *</label>
                          <input 
                              type="text" 
                              id="name" 
                              v-model="form.name"
                              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                              required
                          >
                      </div>
                      
                      <div>
                          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                          <input 
                              type="email" 
                              id="email" 
                              v-model="form.email"
                              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                              required
                          >
                      </div>
                      
                      <div>
                          <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
                          <input 
                              type="tel" 
                              id="phone" 
                              v-model="form.phone"
                              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                          >
                      </div>
                      
                      <div>
                          <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Сообщение *</label>
                          <textarea 
                              id="message" 
                              rows="4" 
                              v-model="form.message"
                              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                              required
                          ></textarea>
                      </div>
                      
                      <div class="flex items-center">
                          <input 
                              type="checkbox" 
                              id="consent" 
                              v-model="form.consent"
                              class="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                              required
                          >
                          <label for="consent" class="ml-2 block text-sm text-gray-700">
                              Я согласен на обработку персональных данных
                          </label>
                      </div>
                      
                      <button 
                          type="submit" 
                          class="btn-green w-full py-3 px-4 text-lg font-medium"
                          :disabled="isSubmitting"
                      >
                          <span v-if="!isSubmitting">Отправить сообщение</span>
                          <span v-else class="flex items-center justify-center">
                              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Отправка...
                          </span>
                      </button>
                  </form>
              </div>
          </div>

          <!-- Правая колонка -->
          <div>
              <!-- Карта -->
              <div class="bg-white rounded-xl shadow-md overflow-hidden mb-8 h-96">
                  <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d333.761987958755!2d37.61991042923342!3d55.75374101582901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a50ac426d83%3A0xfd4dc2a3761a7987!2z0JrRgNCw0YHQvdCw0Y8g0L_Quy4sINCc0L7RgdC60LLQsCwgMTA5MDEy!5e0!3m2!1sru!2sru!4v1743744952845!5m2!1sru!2sru" 
                      width="100%" 
                      height="100%" 
                      style="border:0;" 
                      allowfullscreen="" 
                      loading="lazy" 
                      referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
              </div>

              <!-- Галерея -->
              <div class="bg-white rounded-xl shadow-md p-6">
                  <h2 class="text-2xl font-semibold mb-6 text-green-700">Наш офис</h2>
                  
                  <div class="grid grid-cols-2 gap-4">
                      <div 
                          v-for="(image, index) in officeImages" 
                          :key="index"
                          class="relative overflow-hidden rounded-lg cursor-pointer group"
                          @click="openLightbox(index)"
                      >
                          <img 
                              :src="image" 
                              :alt="'Офис ' + (index + 1)" 
                              class="w-full h-40 object-cover transition duration-500 group-hover:scale-110"
                          >
                          <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 10v4h4v-4h-4z"></path>
                              </svg>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <!-- Лайтбокс для галереи -->
      <div 
          v-if="lightboxOpen"
          class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          @click.self="closeLightbox"
      >
          <button 
              @click="closeLightbox"
              class="absolute top-4 right-4 text-white hover:text-green-300 transition"
          >
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
          </button>
          
          <button 
              @click.stop="prevImage"
              class="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-green-300 transition p-2"
          >
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
          </button>
          
          <div class="max-w-4xl w-full">
              <img 
                  :src="officeImages[currentImageIndex]" 
                  :alt="'Офис ' + (currentImageIndex + 1)" 
                  class="w-full max-h-screen object-contain"
              >
          </div>
          
          <button 
              @click.stop="nextImage"
              class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-green-300 transition p-2"
          >
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
          </button>
          
          <div class="absolute bottom-4 left-0 right-0 text-center text-white">
              {{ currentImageIndex + 1 }} / {{ officeImages.length }}
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
          workingHours: [
              { day: "Понедельник - Пятница", time: "9:00 - 18:00" },
              { day: "Суббота", time: "Выходной" },
              { day: "Воскресенье", time: "Выходной" }
          ],
          officeImages: [
              "/images/office1.png",
              "/images/office2.png",
              "/images/office3.png",
              "/images/office4.png",
              "/images/office5.png",
              "/images/office6.png"
          ],
          form: {
              name: "",
              email: "",
              phone: "",
              message: "",
              consent: false
          },
          isSubmitting: false,
          lightboxOpen: false,
          currentImageIndex: 0
      };
  },
  methods: {
      submitForm() {
          this.isSubmitting = true;
          // Здесь будет логика отправки формы
          setTimeout(() => {
              this.isSubmitting = false;
              alert("Сообщение успешно отправлено!");
              this.form = {
                  name: "",
                  email: "",
                  phone: "",
                  message: "",
                  consent: false
              };
          }, 1500);
      },
      openLightbox(index) {
          this.currentImageIndex = index;
          this.lightboxOpen = true;
          document.body.style.overflow = "hidden";
      },
      closeLightbox() {
          this.lightboxOpen = false;
          document.body.style.overflow = "auto";
      },
      prevImage() {
          this.currentImageIndex = (this.currentImageIndex - 1 + this.officeImages.length) % this.officeImages.length;
      },
      nextImage() {
          this.currentImageIndex = (this.currentImageIndex + 1) % this.officeImages.length;
      }
  }
};
</script>

<style scoped>
input:focus, textarea:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.2);
}
</style>