const connection = require("./connection")

async function getPessoasFaladas(id){
    const q = "SELECT u.id AS idUsuario, u.username AS nome_usuario, m.idMessage AS ultima_mensagem_id, m.message AS ultima_mensagem FROM users u INNER JOIN messages m ON u.id = m.idSend OR u.id = m.idReceive WHERE m.idMessage = ( SELECT MAX(idMessage) FROM messages WHERE idSend = ? OR idReceive = ?) ORDER BY ultima_mensagem_id DESC;"
    const res = await connection.execute(q, [id, id])
    return res[0]
}

async function getConversa(id, nomeDoOutro){
    const q = "SELECT * FROM selectMessages WHERE (idSend = ? AND usernameReceive = ?) OR (idReceive = ? AND usernameSend = ?)"
    const res = await connection.execute(q, [id, nomeDoOutro, id, nomeDoOutro])
    return res[0]
}

async function postMessages(id, nomeDoOutro, message){
    const [idReceive] = await connection.execute("SELECT id FROM users WHERE username = ?", [nomeDoOutro])
    const q = "INSERT INTO messages (idSend, idReceive, message) VALUES (?, ?, ?)"
    const res = await connection.execute(q, [id, idReceive[0].id, message])
    return res[0]
}

module.exports = {
    getPessoasFaladas,
    getConversa,
    postMessages
}