import { useState } from 'react'
import styles from './ModalSelecionarCor.module.css'

const CORES_PREDEFINIDAS = [
  '#457b9d', '#1d3557', '#2a9d8f', 
  '#e63946', '#a8dadc', '#ffd166',
  '#06d6a0', '#118ab2', '#073b4c',
  '#7209b7', '#f72585', '#3a0ca3'
]

function ModalSelecionarCor({ isOpen, onClose, onSelect, materia, corAtual }) {
  const [corSelecionada, setCorSelecionada] = useState(corAtual)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSelect(materia, corSelecionada)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>Selecionar Cor para {materia.nome}</h3>
        
        <div className={styles.coresContainer}>
          {CORES_PREDEFINIDAS.map((cor, index) => (
            <button
              key={index}
              className={`${styles.corOption} ${corSelecionada === cor ? styles.selected : ''}`}
              style={{ backgroundColor: cor }}
              onClick={() => setCorSelecionada(cor)}
              title={cor}
            />
          ))}
        </div>

        <div className={styles.selectedColor}>
          <span>Cor selecionada:</span>
          <div 
            className={styles.corPreview} 
            style={{ backgroundColor: corSelecionada }}
          />
        </div>

        <div className={styles.buttons}>
          <button type="button" onClick={onClose} className={styles.cancelButton}>
            Cancelar
          </button>
          <button type="button" onClick={handleSubmit} className={styles.saveButton}>
            Aplicar Cor
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalSelecionarCor