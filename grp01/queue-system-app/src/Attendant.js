import {useState} from 'react';
import './App.css';

function Attendant() {
  const [ticket, setTicket] = useState()

  async function callNext() {
    let response = await fetch(`http://localhost:8000/tickets`, {method: 'PUT'})
    if (response.ok) {
      if (response.status === 204) {
        setTicket('Sem Senhas')
      } else {
        let result = await response.json()
        setTicket(result.number)
      }
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chamar Senha</h1>
        <h3>{ticket === undefined ? '' : `Senha: ${ticket}`}</h3>
        <button className='App-button' onClick={() => callNext()}>Próxima Senha</button>
      </header>
    </div>
  );
}

export default Attendant;

