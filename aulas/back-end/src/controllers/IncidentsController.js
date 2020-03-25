const connection = require('../database/connections');

module.exports={

    async index(request, response){

        const {page = 1 } = request.query;
        const [count] = await connection('incidents').count()

        

        const incidents = await connection('incidents')
        .join('ongs','ongs.id', '=', 'incidents.ong_id')

        .limit(5)
        .offset((page -1 )*5)
        
        .select(['incidents.*',
        'ongs.name',
        'ongs.email', 
        'ongs.whatsapp', 
        'ongs.city', 
        'ongs.uf']);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },



    async create (request, response){
        const {titulo, description, value} = request.body;

       const ong_id = request.headers.authorization;

     const [id] = await connection('incidents').insert({
           titulo,
           description,
           value,
           ong_id
       });

       return response.json({id})
    },

    async delete(request,response){

        
        const {id}= request.params;//pegar o id
        const ong_id = request.headers.authorization;//id da ong logada para ver se realmete foi criado 

        const incident = await connection('incidents')
        .where('id',id) //procurar um especifico onde o id é igual o id que eu peguei
        .select('ong_id')//selecionar apenas a coluna ong id
        .first()//retornar apenas um resultado

        if(incident.ong_id !== ong_id){ // id do incident for diferente que estiver logado da o erro
            return response.status(401).json({error:'operação nao permitida'});

        }

        await connection('incidents').where('id',id).delete()// deleta do banco 

        return response.status(204).send()
    }
}