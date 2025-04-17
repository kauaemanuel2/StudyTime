import { FiAlertTriangle, FiTrash2, FiX, FiInfo } from 'react-icons/fi';
import styles from './ModalConfirmacao.module.css';

function ModalConfirmacao({ 
  isOpen, 
  onClose, 
  onConfirm,
  titulo = "Confirmação",
  mensagem,
  textoConfirmar = "Confirmar",
  textoCancelar = "Cancelar",
  tipo = "perigo" // 'perigo' ou 'info'
}) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={`${styles.header} ${styles[tipo]}`}>
          {tipo === 'perigo' ? <FiAlertTriangle /> : <FiInfo />}
          <h3>{titulo}</h3>
          <button onClick={onClose} className={styles.closeButton}>
            <FiX />
          </button>
        </div>
        
        <div className={styles.body}>
          <p>{mensagem}</p>
        </div>
        
        <div className={styles.footer}>
          <button onClick={onClose} className={styles.cancelButton}>
            {textoCancelar}
          </button>
          <button 
            onClick={onConfirm} 
            className={`${styles.confirmButton} ${styles[tipo]}`}
          >
            {tipo === 'perigo' ? <FiTrash2 /> : null}
            {textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirmacao;