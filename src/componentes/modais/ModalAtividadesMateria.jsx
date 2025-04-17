import { useState } from 'react'
import { FaCheck, FaTrash, FaEdit } from 'react-icons/fa'
import styles from './ModalAtividadesMateria.module.css'

function ModalAtividadesMateria({ isOpen, onClose, materia, atividades, onAtividadeUpdate }) {
  const [editando, setEditando] = useState(null)
  const [textoEditado, setTextoEditado] = useState('')

  const handleConcluir = (id) => {
    const atividadesAtualizadas = atividades.map(atividade => {
      if (atividade.id === id) {
        return {
          ...atividade,
          concluido: !atividade.concluido,
          dataConclusao: !atividade.concluido ? new Date().toISOString() : null
        };
      }
      return atividade;
    });
    
    onAtividadeUpdate(atividadesAtualizadas)
  }

  const handleRemover = (id) => {
    const atividadesAtualizadas = atividades.filter(atividade => atividade.id !== id)
    onAtividadeUpdate(atividadesAtualizadas)
  }

  const handleEditar = (atividade) => {
    setEditando(atividade.id)
    setTextoEditado(atividade.title)
  }

  const handleSalvarEdicao = (id) => {
    const atividadesAtualizadas = atividades.map(atividade => 
      atividade.id === id ? { ...atividade, title: textoEditado } : atividade
    )
    onAtividadeUpdate(atividadesAtualizadas)
    setEditando(null)
  }

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>
          Atividades de {materia.nome}
          <span className={styles.badge}>{atividades.length}</span>
        </h3>
        
        {atividades.length === 0 ? (
          <p className={styles.semAtividades}>Nenhuma atividade cadastrada para esta matéria.</p>
        ) : (
          <ul className={styles.listaAtividades}>
            {atividades.map((atividade) => (
              <li key={atividade.id} className={styles.atividadeItem}>
                {editando === atividade.id ? (
                  <div className={styles.editingContainer}>
                    <input
                      type="text"
                      value={textoEditado}
                      onChange={(e) => setTextoEditado(e.target.value)}
                      className={styles.editInput}
                      autoFocus
                    />
                    <button
                      onClick={() => handleSalvarEdicao(atividade.id)}
                      className={styles.saveEditButton}
                    >
                      Salvar
                    </button>
                  </div>
                ) : (
                  <>
                    <div className={styles.atividadeInfo}>
                      <button
                        onClick={() => handleConcluir(atividade.id)}
                        className={`${styles.concluirButton} ${atividade.concluido ? styles.concluido : ''}`}
                      >
                        <FaCheck />
                      </button>
                      <span className={`${styles.atividadeTexto} ${atividade.concluido ? styles.concluido : ''}`}>
                        {atividade.title}
                      </span>
                      <span className={styles.atividadeData}>
                        {new Date(atividade.start).toLocaleDateString()}
                      </span>
                    </div>
                    <div className={styles.atividadeAcoes}>
                      <button
                        onClick={() => handleEditar(atividade)}
                        className={styles.editarButton}
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleRemover(atividade.id)}
                        className={styles.removerButton}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}

        <div className={styles.modalFooter}>
          <button onClick={onClose} className={styles.fecharButton}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalAtividadesMateria