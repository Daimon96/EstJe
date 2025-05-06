const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// Настройка подключения к MySQL
const db = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

// Массивы для генерации данных
const deviceNames = ['Принтер', 'Сканер', 'Копир', 'МФУ', 'Монитор', 'Ноутбук', 'Плоттер', 'Компьютер'];
const deviceModels = ['Xerox 3025', 'HP LaserJet 1020', 'Canon LBP6030', 'Epson L3150', 'Samsung SCX-4623F', 'Lenovo ThinkPad T480'];
const categories = ['Принтеры', 'Сканеры', 'МФУ', 'Компьютеры', 'Мониторы'];
const technicians = ['Иван Петров', 'Анна Сидорова', 'Михаил Кузнецов', 'Елена Смирнова', 'Дмитрий Васильев'];
const statuses = ['available', 'unavailable'];
const durations = ['1 час', '2 часа', '3 часа', '4 часа', '5 часов'];

// Функция для генерации случайного элемента из массива
const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

// Функция для генерации случайной цены
const getRandomPrice = () => Math.floor(Math.random() * 5000 + 500); // От 500 до 5500 рублей

// Основная функция для заполнения базы
async function populateDatabase() {
    try {
        // Заполнение таблицы devices
        for (let i = 1; i <= 100; i++) {
            await db.query(
                'INSERT INTO devices (name, model, description, image, price, status, client_name, client_phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    getRandomItem(deviceNames),
                    getRandomItem(deviceModels),
                    `Описание устройства ${i}`,
                    '/uploads/placeholder.jpg',
                    getRandomPrice(),
                    getRandomItem(statuses),
                    `Клиент ${i}`,
                    `+79991234${String(500 + i).padStart(3, '0')}`
                ]
            );
        }
        console.log('Inserted 100 devices');

        // Заполнение таблицы services
        for (let i = 1; i <= 100; i++) {
            await db.query(
                'INSERT INTO services (title, description, price, image, duration, category, is_available, technician) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    `Услуга ${i}`,
                    `Описание услуги ${i}`,
                    getRandomPrice(),
                    '/uploads/placeholder.jpg',
                    getRandomItem(durations),
                    getRandomItem(categories),
                    Math.random() < 0.8, // 80% шанс быть доступным
                    getRandomItem(technicians)
                ]
            );
        }
        console.log('Inserted 100 services');

        // Закрытие соединения
        await db.end();
        console.log('Database population completed');
    } catch (error) {
        console.error('Error populating database:', error);
    }
}

// Выполнение скрипта
populateDatabase();