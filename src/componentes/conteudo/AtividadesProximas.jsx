import { FaTrash } from 'react-icons/fa'
import styles from './AtividadesProximas.module.css'

function AtividadesProximas({ eventos, onRemover }) {
  const hoje = new Date()

  const eventosProximos = eventos
    .filter(evento => {
      const dataEvento = new Date(evento.start)
      return dataEvento >= hoje
    })
    .sort((a, b) => new Date(a.start) - new Date(b.start))

  return (
    <div className={styles.atividadesContainer}>
      <header className={styles.header}>
        <h3>Atividades Próximas</h3>
      </header>

      <div className={styles.listaAtividades}>
        {eventosProximos.length === 0 ? (
          <p>Nenhuma atividade cadastrada</p>
        ) : (
          <ul>
            {eventosProximos.map((evento, i) => (
              <li key={i} className={styles[evento.urgencia]}>
                <div className={styles.atividadeInfo}>
                  <strong>{evento.title}</strong> {evento.materia} - {new Date(evento.start).toLocaleDateString()}
                </div>
                <button className={styles.removerBtn} onClick={() => onRemover(evento)}>
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default AtividadesProximas
