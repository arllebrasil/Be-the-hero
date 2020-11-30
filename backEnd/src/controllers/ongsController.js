const con = require('../database/connection')
const crypto = require('crypto')
module.exports = {
    async  index(req,res){
        try {
            const ongs = await con('ongs').select('*');
            console.log(ongs);
            return res.json(ongs)
        } catch (err) {
            console.log(err.message||"Err!" );
        }
        return res.json({message:"end.."})
    },
    async create(req,res){
        const {name,email,whatsapp,city,uf} = req.body;
        const id = crypto.randomBytes(4).toString('hex')
        try {
            
            const insertedIds = await con('ongs').insert({
                id,
                name,
                email,
                whatsapp,
                city,
                uf,
            });
            console.log(insertedIds);
            return res.json({id})
        } catch (err) {
            console.log(err.message||"Err!" );
        }
        return res.json({message:"end.."})
    },

}