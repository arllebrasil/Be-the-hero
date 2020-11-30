const con = require('../database/connection');
module.exports = {
    async create(req,res){
        const {ong_id} = req.body;
        try {
            const ong = await con('ongs')
            .where('id',ong_id)
            .select('name')
            .first();
            if(!ong){
                return res.status(400).json({Error:'No ONG found wich this ID'});
            }
            return res.json(ong)
        } catch (error) {
            console.log(error.message||'Error!');
        }
    }
}