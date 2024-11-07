// session.js - модель сессий
let sessions = [];

function getAllSessions() {
    return sessions; // Возвращаем все активные сессии
}

function addSession(sessionName) {
    const newSession = {
        name: sessionName,
        players: []
    };
    sessions.push(newSession);
    return newSession;
}

module.exports = {
    getAllSessions,
    addSession
};
