import { useState } from 'react'
import styles from './ModalAdicionarMateria.module.css'

function ModalAdicionarMateria({ isOpen, onClose, onAdd, materiasExistentes }) {
  const [novaMateria, setNovaMateria] = useState('')
  const [erro, setErro] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!novaMateria.trim()) {
      setErro('Por favor, insira um nome para a matéria')
      return
    }
    
    if (materiasExistentes.includes(novaMateria)) {
      setErro('Esta matéria já está cadastrada')
      return
    }
    
    onAdd(novaMateria)
    setNovaMateria('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>Adicionar Nova Matéria</h3>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={novaMateria}
            onChange={(e) => {
              setNovaMateria(e.target.value)
              setErro('')
            }}
            placeholder="Nome da matéria"
            className={styles.input}
            autoFocus
          />
          
          {erro && <p className={styles.erro}>{erro}</p>}
          
          <div className={styles.buttons}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancelar
            </button>
            <button type="submit" className={styles.addButton}>
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ModalAdicionarMateria