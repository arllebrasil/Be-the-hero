const con = require('../database/connection');
module.exports = {
    async index(req,res){
        const {page = 1} = req.query;
        try {
            const [count] = await con('incidents').count();
            const incidents = await con('incidents')
            .join('ongs','ongs.id','=','incidents.ong_id')
            .limit(5)
            .offset((page-1)*5)
            .select(['incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf']);
            res.header('X-Total-Count',count["count(*)"]);
            console.log(count)
            return res.json(incidents) 
        } catch (error) {
            console.log(error.message || 'erro')
            return res.json({message:'Erro!'})
        }
    },
    async create(req,res){
        const {title,description,value} = req.body;
        const ong_id = req.headers.authorization
        try {
            const [id] = await con('incidents').insert({
                title,
                description,
                value,
                ong_id
            });
            console.log(id);
            return res.json({id})
        } catch (err) {
            console.log(err.message||"Err!" );
        }
        return res.json({message:"end.."})
    },
    async delete(req,res){
        const {id} = req.params;
        const ong_id = req.headers.authorization
        try {
            const incident = await con('incidents')
            .where('id',id)
            .select('ong_id')
            .first();
            if(incident.ong_id !== ong_id){
                return res.status(401).json({error:'Operation not permited!'});
            }
            await con('incidents').where('id',id).delete();   
            return res.status(204).send();  
        } catch (error) {
            console.log(error.message||"Erro!")
            return res.json({message:error.message})
        }
    }
}