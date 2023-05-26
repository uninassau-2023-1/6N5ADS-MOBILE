import './App.css';
import {Link} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Sistema de Gerenciamento de Senhas</h1>
        <Link role="button" to="/client" className='App-button'>Visão do Cliente</Link>
        <Link role="button" to="/attendant" className='App-button'>Visão do Atendente</Link>
        <Link role="button" to="/panel" className='App-button'>Visão do Painel</Link>
      </header>
    </div>
  );
}

export default App;
