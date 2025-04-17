import { useState } from 'react'
import styles from './ModalEditarMateria.module.css'

function ModalEditarMateria({ isOpen, onClose, onUpdate, materia }) {
  const [novoNome, setNovoNome] = useState(materia.nome)
  const [erro, setErro] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!novoNome.trim()) {
      setErro('Por favor, insira um nome válido para a matéria')
      return
    }
    
    if (novoNome === materia.nome) {
      onClose()
      return
    }
    
    onUpdate(materia.nome, novoNome)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>Editar Matéria</h3>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={novoNome}
            onChange={(e) => {
              setNovoNome(e.target.value)
              setErro('')
            }}
            className={styles.input}
            autoFocus
          />
          
          {erro && <p className={styles.erro}>{erro}</p>}
          
          <div className={styles.buttons}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancelar
            </button>
            <button type="submit" className={styles.saveButton}>
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ModalEditarMateria