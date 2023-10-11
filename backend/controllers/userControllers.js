const userModels = require('../models/userModels')

async function register(req, res){
    const {username, password} = req.body
    try{
    const data = await userModels.register(username, password)
    return res.status(200).json(data)
    }catch(err){
        return res.status(404).json(err.message)
    }
}

async function login(req, res){
    const {username, password} = req.body
    try{
    const user = await userModels.login(username, password)
    return res.status(200).json(user)
    }catch(err){
        return res.status(404).json(err)
    }
}

async function getAll(req, res){
    try{
        const data = await userModels.getAll()
        return res.status(200).json(data)
    }catch(err){
        return res.status(404).json()
    }
}

module.exports = {
    register,
    login,
    getAll
}