import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import styled from "styled-components"
import {FaLocationArrow as Enviar, FaRegTimesCircle as Cancelar} from 'react-icons/fa'

const DivForm = styled.div`
    background-image: url('https://img.freepik.com/premium-photo/ultra-minimalistic-red-lines-ppt-background-simple-black-paper-perfect-presentations_804788-2214.jpg');
    background-size: cover;
    background-position: center center;
    width: 100%;
    min-height: 100vh;
    margin: auto;
    padding: 40px;
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .princ{
        width: 80%;
    }
    
    h1{
        color:white;
        text-align:center;
        margin-bottom: 35px;
        font-size: 3em;
    }
    form{
        width: 60%;
        margin:auto;
    }


    form input{
        width:100%;
        border:none;
        outline-color: #999;
        border-radius: 5px;
        padding: 20px 10px;
        margin-bottom:15px;
    }

    form input::placeholder{
        
        font-size: 20px;
    }


    a{
        background-color: red; 
        border-radius: 8px;
        margin-bottom:5px;
        color:white; 
        text-decoration:none; 
        padding: 8px;
    }
    
    button{
        color: white;
        background-color:green;
        border: none;
        display:inline-block;
        padding:8px; 
        margin-right:10px;
        border-radius: 8px;
        font-size: 16px;
        
    }

    .fim{
        text-align: right;
    }

    @media screen and (max-width: 768px) {
        padding: 10px;

        .princ{
        width: 80%;
    }
    
    h1{
        font-size: 2em;
    }

    form{
        width: 90%;
        margin:auto;
    }


    form input{
        padding: 10px 8px;
    }

    form input::placeholder{
        
        font-size: 16px;
    }
    }
`

export default function FormQuestionarioResp(){

    let {id} = useParams()

    const [novo, setNovo] = useState({
    codigoQuestionarioResp: id,
    questaoUmResp: "",
    questaoDoisResp: "",
    questaoTresResp: "",
    questaoQuatroResp: ""
})

let metodo = "post"

if(id){
    metodo = "put"
}

const handleChange = e =>{
    setNovo({...novo, [e.target.name]:e.target.value})
    }

    const handleSubmit = e =>{
        e.preventDefault()

        fetch(`http://localhost:8080/07-WebApi/api/questionarioresp/${id ? id : ""}`,{
            method: metodo,
            headers:{

                "Content-Type":"application/json"
            },
            body: JSON.stringify(novo)
        }).then(()=>{
            window.location = "/"
        })
    }

    useEffect(()=>{
        if(id){
            fetch(`http://localhost:8080/07-WebApi/api/questionarioresp/${id}`)
            .then((resp)=>{
                return(resp.json())
            }).then(data=>{
                setNovo(data)
            })
        }
    },[id])


    return(
        <DivForm>
        <h1>Incluir Resposta da pesquisa</h1>
        <form onSubmit={handleSubmit}>
            
            <input type="text" 
            name="questaoUmResp"
            value={novo.questaoUmResp}
            placeholder="questaoUmResp" 
            onChange={handleChange}
            /> 
            <br/>
            
            <input 
            type="text"
            name="questaoDoisResp" 
            value={novo.questaoDoisResp}
            placeholder="questaoDoisResp" 
            onChange={handleChange}
            /> 
            <br/>

            <input type="text" 
            name="questaoTresResp"
            value={novo.questaoTresResp}
            placeholder="questaoTresResp" 
            onChange={handleChange}
            /> <br/>
            
            <input type="text" 
            name="questaoQuatroResp" 
            value={novo.questaoQuatroResp}
            placeholder="questaoQuatro"
            onChange={handleChange}
            /> <br/>

            <button><Enviar/> Incluir</button>
            <Link to="/"><Cancelar/> Cancelar</Link>
        </form>
    </DivForm>
    )
}