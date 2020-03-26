import React, {useState}from 'react';
import logoImg from '../../assets/logo.svg';

import { Link , useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import "./styles.css";

import api from "../../services/api"


export default function NewIncident(){

    const [titulo,setTitulo] = useState('');
    const [description,setDescription] = useState('');
    const [value,setValue] = useState('');

    const ongId = localStorage.getItem('ongId');

    const history = useHistory();


    async function handleNewIncident(e){
        e.preventDefault();

        const data ={
            titulo,
            description,
            value,
        };

        try{
            await api.post('/incidents',data,{
                headers:{
                    Authorization:ongId,
                }
            });

            history.push('/profile');
        }catch (err){
            alert('Not was possible create new incident')
        }
        


    }




    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The hero" />

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um heroi para resolver isso.</p>

                    <Link className='back-link' to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                    Voltar para Home
                </Link>
                </section>


                <form onSubmit={handleNewIncident}>
                    <input 
                    placeholder="Titulo do caso" 
                    value={titulo}
                    onChange={e=>setTitulo(e.target.value)}
                    />

                    <textarea 
                    placeholder="Descrição"
                    value={description}
                    onChange={e=>setDescription(e.target.value)}
                    />

                    <input 
                    placeholder="Valor em Reais"
                    value={value}
                    onChange={e=>setValue(e.target.value)}
                    />

                <button className="button" type="submit">Cadastrar</button>
                </form>
           
                </div>
            </div>
    )
}