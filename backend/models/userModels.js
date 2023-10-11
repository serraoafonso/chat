const connection = require("./connection")
const bcrypt = require('bcrypt')

async function register(username, password){
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    const q = "INSERT INTO users (username, password) VALUES (?, ?)"

    await connection.execute(q, [username, hashedPassword])

    const q1 = "SELECT * FROM users WHERE username = ?"
    const res = await connection.execute(q1, [username])
    return res[0][0]
}

async function login(username, password){
    const data = await connection.execute('SELECT * FROM users WHERE username = ?', [username])

    if(data.length < 1) throw new Error('Wrong username')

    const checkPassword = await bcrypt.compare(password, data[0][0]?.password)
    if(!checkPassword){
        throw new Error('Wrong password')
    }else{
      return {username, id: data[0][0].id}
    }
}

async function getAll(){
    const data = await connection.execute('SELECT username FROM users')
    return data[0]
}

module.exports = {
    register,
    login,
    getAll
}