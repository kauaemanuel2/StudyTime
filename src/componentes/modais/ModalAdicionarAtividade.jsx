import { useState } from 'react'
import moment from 'moment'
import styles from './ModalAdicionarAtividade.module.css'

function ModalAdicionarAtividade({ isOpen, onClose, onAdd, dataSelecionada }) {

  const materiasSalvas = JSON.parse(localStorage.getItem('materiasUsuario')) || []

  const [titulo, setTitulo] = useState('')
  const [materiaSelecionada, setMateriaSelecionada] = useState('')
  const [erro, setErro] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!titulo.trim()) {
      setErro('O nome da atividade é obrigatório');
      return;
    }

    if (!materiaSelecionada) {
      setErro('Selecione uma matéria');
      return;
    }

    const diasRestantes = moment(dataSelecionada).diff(moment(), 'days');
    const urgencia = diasRestantes <= 3 ? 'urgente' :
      diasRestantes <= 7 ? 'moderada' : 'baixa';

    onAdd({
      title: titulo.trim(),
      start: dataSelecionada,
      materia: materiaSelecionada,
      urgencia: urgencia,
      id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      concluido: false
    });

    onClose();
  };



  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Adicionar Atividade</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Título da atividade"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className={styles.input}
          />

          <div className={styles.materiasContainer}>
            <h3>Selecione a Matéria:</h3>
            {materiasSalvas.length > 0 ? (
              <div className={styles.materiasLista}>
                {materiasSalvas.map((materia, index) => (
                  <label key={index} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={materiaSelecionada === materia}
                      onChange={() => setMateriaSelecionada(materia)}
                    />
                    {materia}
                  </label>
                ))}
              </div>
            ) : (
              <p>Você ainda não adicionou matérias.</p>
            )}
          </div>

          <div className={styles.botoes}>
            <button type="submit" className={styles.botaoAdd}>Adicionar</button>
            <button type="button" onClick={onClose} className={styles.botaoCancelar}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ModalAdicionarAtividade
