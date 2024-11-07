// app.js
const express = require('express');
const { sessions, createSession } = require('./models/session'); // Импортируем массив сессий и функцию создания

const app = express();
const PORT = 3000;

// Middleware и настройки
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Middleware для парсинга тела запросов
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Маршруты для главной страницы, регистрации и авторизации
app.get('/', (req, res) => {
    res.render('index'); // Главная страница
});

app.get('/register', (req, res) => {
    res.render('register'); // Страница регистрации
});

app.get('/login', (req, res) => {
    res.render('login'); // Страница авторизации
});

// POST обработчики для регистрации и логина

// Обработка регистрации
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    // Логика для сохранения нового пользователя
    console.log(`Зарегистрирован: ${username}`);
    res.redirect('/'); // После регистрации перенаправление на главную
});

// Обработка авторизации
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Логика для проверки авторизации
    console.log(`Авторизация: ${username}`);
    res.redirect('/'); // После входа перенаправление на главную
});

// Маршруты
app.get('/create-game', (req, res) => {
    res.render('create-game'); // Отображаем страницу создания игры
});

app.post('/create-game', (req, res) => {
    const host = req.body.host || 'ГМ'; // Получаем хоста из формы
    createSession(host); // Создаем новую сессию
    console.log(sessions); // Выводим сессии в консоль для отладки
    res.redirect('/join-game'); // Перенаправляем на страницу присоединения
});

app.get('/join-game', (req, res) => {
    res.render('join-game', { sessions }); // Отображаем страницу подключения к игре
});

app.get('/sessions', (req, res) => {
    res.json({ sessions }); // Отправляем список сессий в формате JSON
});


// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
