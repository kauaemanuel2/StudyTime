import { useState, useEffect } from 'react'
import Sidebar from '../layout/Sidebar'
import Calendario from '../conteudo/Calendario'
import AtividadesProximas from '../conteudo/AtividadesProximas'
import ModalAdicionarAtividade from '../modais/ModalAdicionarAtividade'
import styles from './Dashboard.module.css'

function Dashboard() {
  const nomeUsuario = localStorage.getItem('nomeUsuario') || 'Usuário'
  const materiasSalvas = JSON.parse(localStorage.getItem('materiasUsuario')) || []

  const [eventos, setEventos] = useState(() => {
    try {
      const eventosSalvos = localStorage.getItem('eventos')
      return eventosSalvos ? JSON.parse(eventosSalvos) : []
    } catch (error) {
      console.error('Erro ao carregar eventos do localStorage:', error)
      return []
    }
  })
  
  const [showModal, setShowModal] = useState(false)
  const [dataSelecionada, setDataSelecionada] = useState(null)

  const handleSelecionarData = (data) => {
    setDataSelecionada(data)
    setShowModal(true)
  }

  const handleAddEvento = (evento) => {
    const hoje = new Date();
    const dataEvento = new Date(evento.start);
    const diffDias = Math.ceil((dataEvento - hoje) / (1000 * 60 * 60 * 24));
  
    let urgencia = diffDias <= 3 ? 'urgente' : 
                  diffDias <= 7 ? 'moderada' : 'baixa';
  
    setEventos(prev => [...prev, {
      ...evento,
      urgencia: urgencia,
      id: evento.id || `evt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      concluido: false
    }]);
  };
  
  const handleRemoverEvento = (evento) => {
    setEventos(prev => prev.filter(e => e !== evento))
  }

  const handleConcluirAtividade = (eventoId) => {
    setEventos(prev => prev.map(evento => {
      if (evento.id === eventoId) {
        return {
          ...evento,
          concluido: !evento.concluido,
          dataConclusao: !evento.concluido ? new Date().toISOString() : null
        };
      }
      return evento;
    }));
  };

  useEffect(() => {
    try {
      localStorage.setItem('eventos', JSON.stringify(eventos))
    } catch (error) {
      console.error('Erro ao salvar eventos no localStorage:', error)
    }
  }, [eventos])

  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>
      
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1>Olá, {nomeUsuario}!</h1>
          <p>Veja suas atividades e programe seus estudos</p>
        </header>

        <div className={styles.contentWrapper}>
          <Calendario
            eventos={eventos}
            onSelecionarData={handleSelecionarData}
            onConcluirAtividade={handleConcluirAtividade}
            className={styles.calendario}
          />
          
          <AtividadesProximas 
            eventos={eventos}
            className={styles.atividades}
            onRemover={handleRemoverEvento}
          />
        </div>
      </main>

      {showModal && (
        <ModalAdicionarAtividade
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onAdd={handleAddEvento}
          dataSelecionada={dataSelecionada}
        />
      )}
    </div>
  )
}

export default Dashboard