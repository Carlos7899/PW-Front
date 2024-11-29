import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const DivLista = styled.div`
    min-height: 100vh;
    display: flex;

    .bg-makenzie {
        width: 50%;
        background-color: royalblue;
        background-image: url('https://www.mackenzie.br/fileadmin/ARQUIVOS/Public/top/midias_noticias/noticias/2020/NOT%C3%8DCIAS_GEST%C3%83O_DE_CONTE%C3%9ADO_2020/Higien%C3%B3polis_SP__145_.jpg');
        background-size: cover;
        background-position: center center;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .bg-makenzie img {
        width: 350px;
        display: block;
        padding-bottom: 200px;
    }

    .menu {
        width: 50%;
        background-color: #f3f4f5;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .menu h1 {
        margin-bottom: 80px;
        font-size: 3em;
    }

    .menu a {
        display: block;
        max-width: 90%;
        text-decoration: none;
        color: white;
        font-weight: bold;
        background-color: rgb(190, 24, 16);
        border-radius: 10px;
        padding: 20px 30px;
        margin-bottom: 30px;
        transition: all .2s ease-in-out;
    }
    .menu a:hover {
        transform: scale(1.1);
    }

    @media screen and (max-width: 768px) {
        flex-direction: column;

        .bg-makenzie {
            width: 100%;
            height: 30vh;
        }

        .bg-makenzie img {
            max-width: 80%;
            display: block;
            padding-bottom: 20px;
        }

        .menu {
            width: 100%;
            flex-grow: 1;
            justify-content: flex-start;
        }

        .menu h1 {
            margin: 20px;
        }

        .menu a {
            text-align: center;
            border-radius: 8px;
            padding: 10px 15px;
            width: 70%;
            margin: 10px auto 10px auto;
            transition: all .2s ease-in-out;
        }
    }
`;

const Modal = styled.div`
    display: ${({ show }) => (show ? 'block' : 'none')};
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);

    .modal-content {
        background-color: #fefefe;
        margin: 15% auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
        max-width: 300px;
    }

    .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }
    .close:hover,
    .close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
    }
`;

export default function ListaPesquisadores() {
    
    const [questionariosresppesq, setQuestionariosRespPesq] = useState([]);

    const [pesquisadores, setPesquisadores] = useState([]);
    const [questionarios, setQuestionarios] = useState([]);
    const [respostas, setRespostas] = useState([]);
    const [showModal, setShowModal] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const sessionUser = sessionStorage.getItem('username');
        const sessionPassword = sessionStorage.getItem('password');
        if (sessionUser === 'Ronqui' && sessionPassword === '123') {
            setShowModal(false);
        }
    }, []);

    const handleLogin = () => {
        if (username === 'Ronqui' && password === '123') {
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('password', password);
            setShowModal(false);
        } else {
            setErrorMessage('Usuário e/ou senha incorreto(s)');
        }
    };

    return (
        <>
            <Modal show={showModal}>
                <div className="modal-content">
                    <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                    <h2>Login</h2>
                    <label>
                        Usuário:
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Senha:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <br />
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <button onClick={handleLogin}>Entrar</button>
                </div>
            </Modal>
            <DivLista>
                <div className="bg-makenzie">
                    <img src="mackenzie-logo.png" alt="Logo Machenzie" />
                </div>
                <div className="menu">
                    <h1>Página principal</h1>
                    <Link to={`/selecionar`}>Clique aqui para visualizar os cadastros dos pesquisadores</Link><br/>
                    <Link to={`/selecionarQuestionario`}>Clique aqui para visualizar os cadastros das questões</Link>
                    <Link to={`/selecionarQuestionarioResp`}>Clique aqui para visualizar as respostas</Link>
                    <Link to={`/selecionarQuestionarioRespPesq`}>Clique aqui para cadastrar as respostas do pesquisador</Link>
                </div>
            </DivLista>
        </>
    );
}
