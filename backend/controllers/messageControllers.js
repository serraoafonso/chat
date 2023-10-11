const messageModels = require('../models/messageModels')

async function getPessoasFaladas(req,res){
  const {id} = req.params
  try{
    const dados = await messageModels.getPessoasFaladas(id)
    return res.status(200).json(dados)
  }catch(err){
    return res.status(404).json(err)
  }
}

async function getConversa(req, res){
  const {id} = req.params;
  const {username} = req.body
  try{
    const response = await messageModels.getConversa(id, username)
    return res.status(200).json(response) 
  }catch(err){
    return res.status(404).json(err)
  }
}

async function postMessages(req, res){
  const {id} = req.params;
  const {message, username} = req.body
  try{
    await messageModels.postMessages(id, username, message)
    return res.status(200).json('Message posted')
  }catch(err){
    return res.status(404).json(err)
  }
}

module.exports = {
    getPessoasFaladas,
    getConversa,
    postMessages
}