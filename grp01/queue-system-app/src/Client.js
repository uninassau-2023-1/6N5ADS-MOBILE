import {useState} from 'react';
import './App.css';

function Client() {

  const [ticket, setTicket] = useState()

  async function requestTicket(ticketType) {
    // TODO: extrair URL para arquivo de configuração
    let response = await fetch(`http://localhost:8000/tickets/${ticketType}`, {method: 'POST'})
    if (response.ok) {
      let result = await response.json()
      setTicket(result.number)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Solicitar Senha</h1>
        <h3>{ticket === undefined ? '' : `Senha: ${ticket}`}</h3>
        <button className='App-button' onClick={() => requestTicket("SG")}>Geral</button>
        <button className='App-button' onClick={() => requestTicket("SP")}>Prioritário</button>
        <button className='App-button' onClick={() => requestTicket("SE")}>Resultado de Exames</button>
      </header>
    </div>
  );
}

export default Client;

