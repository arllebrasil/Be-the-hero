const con = require('../database/connection');
module.exports = {
    async index(req,res){
        const ong_id = req.headers.authorization;
        try {
            const incidents = await con('incidents').where('ong_id',ong_id).select('*');
            return res.json(incidents) 
        } catch (error) {
            console.log(error.message || 'erro')
            return res.json({message:'Erro!'})
        }
    },
}