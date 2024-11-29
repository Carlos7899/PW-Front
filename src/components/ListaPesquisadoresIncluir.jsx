import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaEdit, FaTrash } from 'react-icons/fa';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const DivLista = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 50px;
  font-family: Arial;
  background-image: url('https://img.freepik.com/premium-photo/ultra-minimalistic-red-lines-ppt-background-simple-black-paper-perfect-presentations_804788-2214.jpg');
  background-size: cover;
  background-position: center center;
  position: relative;

  h1 {
    color: white;
    text-align: center;
    padding: 25px;
    padding-top: 40px;
  }

  .btn--pesquisar {
    text-decoration: none;
    margin-bottom: 20px;
    background-color: rgb(16, 154, 14);
    color: white;
    display: inline-block;
    border-radius: 10px;
    padding: 15px 20px;
    transition: all .2s ease-in-out;
  }

  .btn--pesquisar:hover {
    transform: scale(1.1);
  }

  .btn--voltar {
    text-decoration: none;
    margin-bottom: 20px;
    background-color: rgb(24, 59, 163);
    color: white;
    display: inline-block;
    border-radius: 10px;
    padding: 15px 20px;
    transition: all .2s ease-in-out;
  }

  .btn--voltar:hover {
    transform: scale(1.1);
  }

  .table--control {
    margin: auto;
    overflow-x: auto;
    width: 100%;
  }

  table {
    width: 100%;
    min-width: 900px;
    margin: auto;
  }

  .col--btn {
    width: 80px;
  }

  thead tr {
    background-color: rgb(146, 18, 12);
    color: white;
  }

  thead tr th {
    padding: 10px;
  }

  tbody tr:nth-child(2n-1) {
    background-color: #fff;
  }

  tbody tr:nth-child(2n) {
    background-color: #ccc;
  }

  tbody tr td {
    padding: 10px;
  }

  tbody tr :nth-child(4) {
    text-align: center;
    font-size: 20px;
  }

  tbody tr td a {
    background-color: none;
    margin-bottom: 5px;
    margin-right: 10px;
    color: blue;
  }

  tbody tr td button {
    color: red;
    background-color: none;
    border: none;
    font-size: 18px;
  }

  tfoot tr td {
    text-align: center;
    background-color: #333;
    color: white;
    padding: 10px;
  }

  .fim {
    text-align: right;
    padding: 10px;
  }

  .btn-download {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #f1c40f;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

export default function ListaPesquisadores() {
  const [pesquisadores, setPesquisadores] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/07-WebApi/api/pesquisador/')
      .then((resp) => resp.json())
      .then((resp) => setPesquisadores(resp))
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/07-WebApi/api/pesquisador/${id}`, {
      method: 'delete',
    })
      .then(() => {
        window.location = '/';
      })
      .catch((error) => console.log(error));
  };

  const handleDownloadPDF = () => {
    const input = document.body;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      let imgHeight = (canvas.height * pdfWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      const pageCount = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(9);
        pdf.text('Desenvolvedor: Rafael Ronqui', pdfWidth - 60, pdfHeight - 10);
      }

      pdf.save('pagina.pdf');
    });
  };

  return (
    <DivLista>
      <button className="btn-download" onClick={handleDownloadPDF}>Baixar PDF</button>
      <h1>Lista Pesquisadores</h1>
      <Link to="/incluir" className="btn--pesquisar">Inserir Pesquisador</Link>
      <div className="table--control">
        <table>
          <colgroup>
            <col />
            <col />
            <col />
            <col className="col--btn" />
          </colgroup>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Nível</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {pesquisadores.map((pesquisador) => (
              <tr key={pesquisador.codigo}>
                <td>{pesquisador.nome}</td>
                <td>{pesquisador.nivel}</td>
                <td>
                  <Link to={`/editar/${pesquisador.codigo}`}><FaEdit /></Link>
                  <button onClick={() => handleDelete(pesquisador.codigo)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">Pesquisadores</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="fim">
        <Link to={`/`} className="btn--voltar">Voltar para o portal</Link>
      </div>
    </DivLista>
  );
}
