const { sessions, Session } = require('../models/session');

// Создание новой сессии
exports.createSession = (req, res) => {
  const newSession = new Session(req.query.host || 'ГМ');
  sessions.push(newSession);
  res.redirect(`/session/${newSession.id}`);
};

// Получение списка активных сессий
exports.getSessions = (req, res) => {
  const activeSessions = sessions.filter(session => !session.active);
  res.render('join-game', { sessions: activeSessions });
};

// Получение информации о сессии
exports.getSession = (req, res) => {
  const session = sessions.find(s => s.id === req.params.id);
  if (!session) {
    return res.status(404).send('Сессия не найдена');
  }
  res.render('session', { session });
};
