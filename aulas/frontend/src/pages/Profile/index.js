import React, { useEffect, useState } from 'react';
import logoImg from '../../assets/logo.svg';
import { Link ,useHistory} from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'


import api from '../../services/api';

import './styles.css';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    

    useEffect(() => { }, [
        //toda vez que o conteudo daqui mudar vai executar a função

        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);//array de retorno
        })
    ][ongId]);//toda variavel que usa dentro de um useEffect é melhor colocar como uma dependencia, se o id da ong mudar pra rcarregar

        //recebe o id que vc quer deletar
   async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`,{
            headers: {
                Authorization: ongId,
            }
        });

        //faz uma varredura para manter apenas o elemento que nao tem o id que foi excluido na pagina
        setIncidents(incidents.filter(incident=>incident.id !== id))
        }catch(err){
            alert('Erro ao deletar caso, tente novamente');
        }
    }

    //função  para fazer oo logOUT
    //vai apagar o local storage
    //e depois vai redirecionar para pagina inicial
    function handleLougout(){
        localStorage.clear();
        history.push('/')
    }

    return (

        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the hero" />
                <span>Bem vinda, {ongName}</span>
                <Link className="button" to='/incidents/new'>Cadastrar novo caso</Link>
                {/* chama a função do logOut */}
                <button onClick={handleLougout} type='button'>
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.titulo}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR',{style:'currency', currency:'BRL'}).format(incident.value)}</p>

                        {/* precisa ser uma arrow function pq se nao quando mostrar todos os elemetos vao executar a função e tudo sera deletado */}
                        <button onClick={()=> handleDeleteIncident(incident.id)} type='button'>
                            <FiTrash2 size={20} color=" #a8a8b3" />
                        </button>
                    </li>
                ))}



            </ul>

        </div>
    );
}