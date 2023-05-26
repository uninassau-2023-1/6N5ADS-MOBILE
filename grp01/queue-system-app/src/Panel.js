import {useEffect, useState} from 'react';
import './App.css';

function Panel() {

  const [tickets, setTickets] = useState()

  useEffect(() => {
    const interval = setInterval(() => {
      async function fetchTickets() {
        let response = await fetch(`http://localhost:8000/tickets?size=5`, {method: 'GET'})
        if (response.ok) {
          let result = await response.json()
          setTickets(result)
        }
      }
      fetchTickets()
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Senhas Chamadas</h1>
        <ul className='App-list'>
          {tickets &&
            tickets.map((ticket) => (
              <li key={ticket.number}>
                <p>{ticket.number}</p>
                <p className='small'>Chamado às {new Date(Date.parse(ticket.called_at)).toLocaleTimeString()}</p>
                <hr />
              </li>
            ))
          }
        </ul>
      </header>
    </div>
  );
}

export default Panel;


