import { BrowserRouter, Routes, Route} from 'react-router-dom' 

import ListaPesquisadores from './components/ListaPesquisadoresIncluir';
import FormPesquisador from './components/FormPesquisador';
import FormPesquisadorAlterar from './components/FormPesquisadorAlterar';

import ListaQuestionarios from './components/ListaQuestionarioIncluir';
import FormQuestionario from './components/FormQuestionario';
import FormQuestionarioAlterar from './components/FormQuestionarioAlterar';

import ListaQuestionariosRespPesq from './components/ListaQuestionarioIncluirRespPesq';
import FormQuestionarioRespPesq from './components/FormQuestionarioRespPesq';
import FormQuestionarioAlterarRespPesq from './components/FormQuestionarioAlterarRespPesq';

import ListaQuestionariosResp from './components/ListaQuestionarioIncluirResp';
import FormQuestionarioResp from './components/FormQuestionarioResp';
import FormQuestionarioAlterarResp from './components/FormQuestionarioAlterarResp';

//import ListaRespostas from './components/ListaRespostaIncluir';
//import FormResposta from './components/FormResposta';
//import FormRespostaAlterar from './components/FormRespostaAlterar';

import FormIndex from './components/FormIndex';


export default function App(){

    return(
        <BrowserRouter>
        <Routes>
        <Route path='/' element={<FormIndex/>}/>
            <Route path='/selecionar' element={<ListaPesquisadores/>}/>
            <Route path='/incluir' element={<FormPesquisador/>}/>
            <Route path='/editar/:id' element={<FormPesquisadorAlterar/>}/>

            <Route path='/selecionarQuestionario' element={<ListaQuestionarios/>}/>
            <Route path='/incluirQuestionario' element={<FormQuestionario/>}/>
            <Route path='/alterarQuestionario/:id' element={<FormQuestionarioAlterar/>}/>

            <Route path='/selecionarQuestionarioResp' element={<ListaQuestionariosResp/>}/>
            <Route path='/incluirQuestionarioResp' element={<FormQuestionarioResp/>}/>
            <Route path='/alterarQuestionarioResp/:id' element={<FormQuestionarioAlterarResp/>}/>

            <Route path='/selecionarQuestionarioRespPesq' element={<ListaQuestionariosRespPesq/>}/>
            <Route path='/incluirQuestionarioRespPesq' element={<FormQuestionarioRespPesq/>}/>
            <Route path='/alterarQuestionarioRespPesq/:id' element={<FormQuestionarioAlterarRespPesq/>}/>

        </Routes>
        </BrowserRouter>
    );
}