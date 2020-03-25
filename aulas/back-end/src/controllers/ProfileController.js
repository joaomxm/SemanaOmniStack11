const connection = require('../database/connections');


module.exports ={
    async index(request, response){
        //acessar os dados da ong que ta logada 
        const ong_id = request.headers.authorization;

        const incidents = await connection('incidents')
        .where('ong_id',ong_id)
        .select('*');

        return response.json(incidents);



    }}