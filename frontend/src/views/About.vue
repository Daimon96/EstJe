<template>
  <div class="container mx-auto px-4 py-8">
      <section class="mb-16">
          <div class="flex flex-col md:flex-row items-center gap-8">
              <div class="md:w-1/2">
                  <h1 class="text-4xl font-bold mb-6 text-green-700">О нашей мастерской</h1>
                  <p class="text-lg mb-4">
                      Наша мастерская работает на рынке услуг уже более 10 лет. Мы предлагаем качественный ремонт и обслуживание вашей техники.
                  </p>
                  <p class="text-lg mb-6">
                      Наша команда состоит из высококвалифицированных специалистов с многолетним опытом работы в сфере ремонта оргтехники.
                  </p>
                  <router-link to="/contacts" class="btn-green inline-flex items-center px-6 py-3">
                      Связаться с нами
                      <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                  </router-link>
              </div>
              <div class="md:w-1/2">
                  <img src="/images/office1.png" alt="Наша мастерская" class="rounded-xl shadow-lg w-full h-auto">
              </div>
          </div>
      </section>

      <section class="mb-16 bg-green-50 rounded-xl p-8">
          <h2 class="text-3xl font-bold text-center mb-12 relative">
              <span class="relative inline-block">
                  Наши преимущества
                  <span class="absolute -bottom-2 left-0 w-full h-1 bg-green-500 rounded-full"></span>
              </span>
          </h2>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="(advantage, index) in advantages" :key="index" class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition flex items-start">
                  <div class="bg-green-100 p-2 rounded-full mr-4">
                      <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                  </div>
                  <div>
                      <h3 class="text-lg font-semibold mb-2">{{ advantage.title }}</h3>
                      <p class="text-gray-600">{{ advantage.description }}</p>
                  </div>
              </div>
          </div>
      </section>

      <section class="mb-16">
          <h2 class="text-3xl font-bold text-center mb-12 relative">
              <span class="relative inline-block">
                  Наша команда
                  <span class="absolute -bottom-2 left-0 w-full h-1 bg-green-500 rounded-full"></span>
              </span>
          </h2>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div v-for="(member, index) in team" :key="index" class="team-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                  <div class="relative h-64 overflow-hidden">
                      <img :src="member.image" :alt="member.name" class="w-full h-full object-cover transition duration-500 hover:scale-105">
                      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div class="p-6">
                      <h3 class="text-xl font-bold mb-1">{{ member.name }}</h3>
                      <p class="text-green-600 font-medium mb-2">{{ member.position }}</p>
                      <p class="text-gray-600 text-sm mb-4">{{ member.experience }}</p>
                      <div class="flex space-x-2">
                          <span v-for="(skill, i) in member.skills" :key="i" class="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              {{ skill }}
                          </span>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <!-- FAQ -->
      <section class="mb-16">
          <h2 class="text-3xl font-bold text-center mb-12 relative">
              <span class="relative inline-block">
                  Частые вопросы
                  <span class="absolute -bottom-2 left-0 w-full h-1 bg-green-500 rounded-full"></span>
              </span>
          </h2>
          
          <div class="max-w-3xl mx-auto space-y-4">
              <div v-for="(faq, index) in faqs" :key="index" class="border border-gray-200 rounded-lg overflow-hidden">
                  <button 
                      class="w-full flex justify-between items-center p-4 text-left bg-white hover:bg-gray-50 transition"
                      @click="toggleFaq(index)"
                  >
                      <h3 class="font-medium text-lg">{{ faq.question }}</h3>
                      <svg 
                          class="w-5 h-5 text-green-600 transition-transform duration-300"
                          :class="{ 'transform rotate-180': faq.open }"
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                      >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                  </button>
                  <div 
                      class="bg-gray-50 transition-all duration-300 overflow-hidden"
                      :class="{ 'max-h-0': !faq.open, 'max-h-96': faq.open }"
                  >
                      <div class="p-4 text-gray-600">
                          {{ faq.answer }}
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <!-- Статистика -->
      <section class="py-12 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl shadow-lg">
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div v-for="(stat, index) in stats" :key="index" class="text-center">
                  <div class="text-4xl font-bold mb-2">{{ stat.value }}</div>
                  <div class="text-sm uppercase tracking-wider text-green-200">{{ stat.label }}</div>
              </div>
          </div>
      </section>
  </div>
</template>

<script>
export default {
  data() {
      return {
          advantages: [
              {
                  title: "Опытные мастера",
                  description: "Все наши специалисты имеют профессиональное образование и многолетний опыт работы."
              },
              {
                  title: "Оригинальные запчасти",
                  description: "Мы используем только оригинальные или качественные совместимые комплектующие."
              },
              {
                  title: "Гарантия на работы",
                  description: "Предоставляем гарантию на все виды работ от 6 месяцев до 1 года."
              },
              {
                  title: "Быстрое выполнение",
                  description: "Большинство ремонтов выполняем в течение 1-3 рабочих дней."
              },
              {
                  title: "Доступные цены",
                  description: "Гибкая система ценообразования и прозрачные расценки."
              },
              {
                  title: "Бесплатная диагностика",
                  description: "Первичная диагностика неисправности проводится бесплатно."
              }
          ],
          team: [
              {
                  name: "Алексей",
                  position: "Специалист по принтерам",
                  experience: "Стаж: 8 лет",
                  skills: ["Принтеры", "МФУ", "Картриджи"],
                  image: "/images/team1.png"
              },
              {
                  name: "Дмитрий",
                  position: "Специалист по компьютерам",
                  experience: "Стаж: 10 лет",
                  skills: ["ПК", "Ноутбуки", "Жесткие диски"],
                  image: "/images/team2.png"
              },
              {
                  name: "Григорий",
                  position: "Специалист по ноутбукам",
                  experience: "Стаж: 6 лет",
                  skills: ["Ноутбуки", "Материнские платы", "Видеокарты"],
                  image: "/images/team3.png"
              },
              {
                  name: "Михаил",
                  position: "Специалист по мониторам",
                  experience: "Стаж: 6 лет",
                  skills: ["Мониторы", "Матрицы", "Подсветка"],
                  image: "/images/team4.png"
              },
              {
                  name: "Виталий",
                  position: "Технический специалист",
                  experience: "Стаж: 6 лет",
                  skills: ["Диагностика", "Ремонт", "Тестирование"],
                  image: "/images/team5.png"
              },
              {
                  name: "Константин",
                  position: "Фото на память",
                  experience: "Стаж: 13 лет",
                  skills: ["Фотография", "Видеосъемка", "Обработка"],
                  image: "/images/team6.png"
              }
          ],
          faqs: [
              {
                  question: "Как долго длится ремонт?",
                  answer: "Сроки ремонта зависят от сложности проблемы. Обычно это занимает от 1 до 3 рабочих дней. В случае сложных неисправностей мы обязательно уведомим вас о возможных сроках.",
                  open: false
              },
              {
                  question: "Предоставляете ли вы гарантию?",
                  answer: "Да, мы предоставляем гарантию на все виды работ сроком от 6 месяцев до 1 года. Гарантия распространяется как на выполненные работы, так и на установленные комплектующие.",
                  open: false
              },
              {
                  question: "Можно ли привезти технику самостоятельно?",
                  answer: "Конечно! Вы можете доставить технику в нашу мастерскую лично в рабочее время. Также мы предлагаем услуги курьерской доставки и выезд мастера на место (услуга платная).",
                  open: false
              },
              {
                  question: "Как происходит оплата?",
                  answer: "Оплата производится после выполнения ремонта и проверки работы устройства клиентом. Мы принимаем наличные, банковские карты и безналичный расчет для юридических лиц.",
                  open: false
              }
          ],
          stats: [
              { value: "10+", label: "Лет опыта" },
              { value: "5000+", label: "Ремонтов" },
              { value: "98%", label: "Довольных клиентов" },
              { value: "24/7", label: "Поддержка" }
          ]
      };
  },
  methods: {
      toggleFaq(index) {
          this.faqs[index].open = !this.faqs[index].open;
      }
  }
};
</script>

<style scoped>
.team-card {
  transition: all 0.3s ease;
}

.team-card:hover {
  transform: translateY(-5px);
}
</style>