<template>
  <div class="container mx-auto px-4 py-8">
      <section class="hero bg-gradient-to-r from-green-600 to-green-700 text-black rounded-xl shadow-lg p-8 mb-12 relative overflow-hidden">
          <div class="relative z-10 max-w-2xl">
              <h1 class="text-4xl md:text-5xl font-bold mb-4 leading-tight">Добро пожаловать в нашу мастерскую!</h1>
              <p class="text-xl mb-6">Мы специализируемся на ремонте оргтехники любой сложности с гарантией качества.</p>
              <div class="flex space-x-4">
                  <router-link to="/services" class="btn-green px-6 py-3 font-medium">
                      Наши услуги
                  </router-link>
                  <router-link to="/devices" class="btn-green px-6 py-3 font-medium">
                      Наши устройства
                  </router-link>
                  <router-link to="/contacts" class="btn-outline-green px-6 py-3 font-medium">
                      Контакты
                  </router-link>
              </div>
          </div>
          <div class="absolute -right-20 -bottom-20 opacity-20 z-0">
              <svg class="w-64 h-64" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"></path>
              </svg>
          </div>
      </section>

      <section class="mb-16">
          <h2 class="text-3xl font-bold text-center mb-12 relative">
              <span class="relative inline-block">
                  Наши работы
                  <span class="absolute -bottom-2 left-0 w-full h-1 bg-green-500 rounded-full"></span>
              </span>
          </h2>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div v-for="(work, index) in works" :key="index" class="card bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  <div class="relative overflow-hidden h-48">
                      <img :src="work.image" :alt="work.title" class="w-full h-full object-cover transition duration-500 hover:scale-105">
                      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div class="p-6">
                      <h3 class="text-xl font-semibold mb-2 text-green-700">{{ work.title }}</h3>
                      <p class="text-gray-600">{{ work.description }}</p>
                      <div class="mt-4 flex justify-end">
                          <span class="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">{{ work.tag }}</span>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <section class="mb-16 bg-green-50 rounded-xl p-8">
          <h2 class="text-3xl font-bold text-center mb-12 relative">
              <span class="relative inline-block">
                  Почему выбирают нас?
                  <span class="absolute -bottom-2 left-0 w-full h-1 bg-green-500 rounded-full"></span>
              </span>
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div v-for="(feature, index) in features" :key="index" class="feature-card bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500 hover:shadow-md transition">
                  <div class="flex items-center mb-4">
                      <div class="flex-shrink-0 bg-green-100 p-3 rounded-full">
                          <component :is="feature.icon" class="w-6 h-6 text-green-600"></component>
                      </div>
                      <h3 class="ml-3 text-lg font-medium text-gray-900">{{ feature.title }}</h3>
                  </div>
                  <p class="text-gray-600">{{ feature.description }}</p>
              </div>
          </div>
      </section>

      <!-- Отзывы клиентов -->
      <section class="mb-16">
          <h2 class="text-3xl font-bold text-center mb-12 relative">
              <span class="relative inline-block">
                  Отзывы клиентов
                  <span class="absolute -bottom-2 left-0 w-full h-1 bg-green-500 rounded-full"></span>
              </span>
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div v-for="(testimonial, index) in testimonials" :key="index" class="testimonial-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                  <div class="flex items-center mb-4">
                      <div class="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <span class="text-green-600 font-medium">{{ testimonial.initials }}</span>
                      </div>
                      <div class="ml-3">
                          <h3 class="text-sm font-medium text-gray-900">{{ testimonial.name }}</h3>
                          <div class="flex text-yellow-400">
                              <svg v-for="i in 5" :key="i" class="w-4 h-4" :class="{ 'text-gray-300': i > testimonial.rating }" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                          </div>
                      </div>
                  </div>
                  <p class="italic text-gray-600">"{{ testimonial.text }}"</p>
              </div>
          </div>
      </section>
  </div>
</template>

<script>
import { 
  CheckIcon, 
  ClockIcon, 
  ShieldCheckIcon, 
  CurrencyDollarIcon, 
  HandThumbUpIcon as ThumbUpIcon, 
  StarIcon 
} from '@heroicons/vue/24/outline'

export default {
  components: {
      CheckIcon,
      ClockIcon,
      ShieldCheckIcon,
      CurrencyDollarIcon,
      ThumbUpIcon,
      StarIcon
  },
  data() {
      return {
          works: [
              {
                  title: "Ремонт принтеров",
                  description: "Профессиональный ремонт принтеров всех марок и моделей",
                  image: "/images/home1.png",
                  tag: "Принтеры"
              },
              {
                  title: "Ремонт компьютеров",
                  description: "Диагностика и ремонт ПК и ноутбуков любой сложности",
                  image: "/images/home2.png",
                  tag: "Компьютеры"
              },
              {
                  title: "Ремонт мониторов",
                  description: "Устранение неисправностей мониторов и замена матриц",
                  image: "/images/home3.png",
                  tag: "Мониторы"
              }
          ],
          features: [
              {
                  title: "Гарантия качества",
                  description: "Мы предоставляем гарантию на все виды работ от 6 месяцев до 1 года.",
                  icon: "ShieldCheckIcon"
              },
              {
                  title: "Срочный ремонт",
                  description: "Выполняем работы в кратчайшие сроки без потери качества.",
                  icon: "ClockIcon"
              },
              {
                  title: "Доступные цены",
                  description: "Разумные цены без скрытых платежей и переплат.",
                  icon: "CurrencyDollarIcon"
              }
          ],
          testimonials: [
              {
                  name: "Мария Иванова",
                  initials: "МИ",
                  text: "Очень довольна работой мастеров! Принтер теперь работает как новый!",
                  rating: 5
              },
              {
                  name: "Игорь Петров",
                  initials: "ИП",
                  text: "Быстро и качественно починили мой ноутбук. Рекомендую!",
                  rating: 4
              },
              {
                  name: "Анна Сидорова",
                  initials: "АС",
                  text: "Профессиональный подход и доступные цены. Спасибо!",
                  rating: 5
              }
          ]
      };
  }
};
</script>

<style scoped>
.hero {
  background-image: url('/images/tech-bg.jpg');
  background-size: cover;
  background-blend-mode: multiply;
}

.card {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.feature-card:hover {
  transform: translateY(-5px);
}
</style>