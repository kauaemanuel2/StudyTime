import { FaChartPie, FaPalette, FaEdit } from 'react-icons/fa'
import { FiBookOpen, FiPlus, FiTrash2 } from 'react-icons/fi'
import { MdAssignmentTurnedIn } from 'react-icons/md'
import styles from './Materias.module.css'
import Sidebar from '../layout/Sidebar'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ModalAdicionarMateria from '../modais/ModalAdicionarMateria'
import ModalEditarMateria from '../modais/ModalEditarMateria'
import ModalSelecionarCor from '../modais/ModalSelecionarCor'
import ModalAtividadesMateria from '../modais/ModalAtividadesMateria'
import ModalEstatisticas from '../modais/ModalEstatisticas'
import ModalConfirmacao from '../modais/ModalConfirmacao'

function Materias() {

  //usa a navegação para redirecionar ao menu principal ao apagar
  const navigate = useNavigate();


  // Carrega matérias com cores salvas
  const [materiasSalvas, setMateriasSalvas] = useState(() => {
    const materias = JSON.parse(localStorage.getItem("materiasUsuario")) || []
    const cores = JSON.parse(localStorage.getItem("materiasCores")) || {}
    return materias.map(materia => ({
      nome: materia,
      cor: cores[materia] || '#457b9d'
    }))
  })

  // Carrega eventos do calendário
  const [eventosCalendario, setEventosCalendario] = useState(() => {
    return JSON.parse(localStorage.getItem("eventos")) || []
  })

  // Estados dos modais
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showColorModal, setShowColorModal] = useState(false)
  const [showAtividadesModal, setShowAtividadesModal] = useState(false)
  const [showEstatisticasModal, setShowEstatisticasModal] = useState(false)
  const [materiaSelecionada, setMateriaSelecionada] = useState(null)
  const [showConfirmModal, setShowConfirmModal] = useState(false);




  // Organiza as tarefas do calendário por matéria
  const tarefasPorMateria = eventosCalendario.reduce((acc, evento) => {
    if (evento.materia) {
      if (!acc[evento.materia]) {
        acc[evento.materia] = {
          total: 0,
          concluidas: 0,
          atividades: []
        }
      }
      acc[evento.materia].total++
      acc[evento.materia].atividades.push(evento)
      if (evento.concluido) {
        acc[evento.materia].concluidas++
      }
    }
    return acc
  }, {})

  // Atualiza a lista de eventos quando houver mudanças no localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setEventosCalendario(JSON.parse(localStorage.getItem("eventos")) || [])
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Função para adicionar nova matéria
  const handleAddMateria = (novaMateria) => {
    const novasMaterias = [...materiasSalvas, { nome: novaMateria, cor: '#457b9d' }]
    setMateriasSalvas(novasMaterias)

    // Atualiza localStorage
    localStorage.setItem("materiasUsuario", JSON.stringify(novasMaterias.map(m => m.nome)))
  }


  // Função para editar matéria
  const handleUpdateMateria = (nomeAntigo, novoNome) => {
    const novasMaterias = materiasSalvas.map(m =>
      m.nome === nomeAntigo ? { ...m, nome: novoNome } : m
    )
    setMateriasSalvas(novasMaterias)

    // Atualiza localStorage
    localStorage.setItem("materiasUsuario", JSON.stringify(novasMaterias.map(m => m.nome)))

    // Atualiza eventos do calendário
    const eventosAtualizados = eventosCalendario.map(evento =>
      evento.materia === nomeAntigo ? { ...evento, materia: novoNome } : evento
    )
    localStorage.setItem("eventos", JSON.stringify(eventosAtualizados))
    setEventosCalendario(eventosAtualizados)

    // Atualiza cores associadas
    const cores = JSON.parse(localStorage.getItem("materiasCores")) || {}
    if (cores[nomeAntigo]) {
      cores[novoNome] = cores[nomeAntigo]
      delete cores[nomeAntigo]
      localStorage.setItem("materiasCores", JSON.stringify(cores))
    }
  }

  //função que remove uma materia especifica
  const handleDeleteMateria = (materia) => {
    // 1. Remove a matéria da lista
    const novasMaterias = materiasSalvas.filter(m => m.nome !== materia.nome);
    setMateriasSalvas(novasMaterias);

    // 2. Atualiza localStorage das matérias
    localStorage.setItem("materiasUsuario", JSON.stringify(novasMaterias.map(m => m.nome)));

    // 3. Remove a cor associada
    const cores = JSON.parse(localStorage.getItem("materiasCores")) || {};
    if (cores[materia.nome]) {
      delete cores[materia.nome];
      localStorage.setItem("materiasCores", JSON.stringify(cores));
    }

    // 4. Remove eventos associados a essa matéria
    const eventosAtualizados = eventosCalendario.filter(evento => evento.materia !== materia.nome);
    localStorage.setItem("eventos", JSON.stringify(eventosAtualizados));
    setEventosCalendario(eventosAtualizados);
  };

  // Função para atualizar cor da matéria
  const handleUpdateCor = (materia, novaCor) => {
    const novasMaterias = materiasSalvas.map(m =>
      m.nome === materia.nome ? { ...m, cor: novaCor } : m
    )
    setMateriasSalvas(novasMaterias)

    const cores = JSON.parse(localStorage.getItem("materiasCores")) || {}
    cores[materia.nome] = novaCor
    localStorage.setItem("materiasCores", JSON.stringify(cores))
  }

  //função que reseta o sistema
  const handleResetProgress = () => {
    setShowConfirmModal(true);
  };

  const confirmReset = () => {
    // 1. Limpeza total do localStorage
    localStorage.clear();

    // 2. Reset de todos os estados locais
    setMateriasSalvas([]);
    setEventosCalendario([]);
    setMateriaSelecionada(null);

    // 3. Fechar todos os modais
    setShowConfirmModal(false);

    // 4. Redirecionar para a tela inicial
    navigate('/', { replace: true });

    // 5. Recarregar para garantir limpeza completa
    window.location.reload();
  };

  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h2 className={styles.titulo}>
            <FiBookOpen className={styles.iconTitulo} />
            Minhas Matérias
          </h2>
          <div className={styles.headerButtons}>
            <button
              onClick={() => setShowAddModal(true)}
              className={styles.addButton}
            >
              <FiPlus /> Adicionar
            </button>
            <button
              onClick={handleResetProgress}
              className={styles.resetButton}
            >
              <FiTrash2 /> Resetar Sistema
            </button>
          </div>
        </header>

        <div className={styles.contentWrapper}>
          {materiasSalvas.length === 0 ? (
            <p className={styles.semMaterias}>Nenhuma matéria cadastrada ainda.</p>
          ) : (
            <ul className={styles.lista}>
              {materiasSalvas.map((materia, index) => (
                <li
                  key={index}
                  className={styles.card}
                  style={{ borderLeft: `4px solid ${materia.cor}` }}
                >
                  <span
                    className={styles.materiaNome}
                    onClick={() => {
                      setMateriaSelecionada(materia)
                      setShowAtividadesModal(true)
                    }}
                  >
                    <MdAssignmentTurnedIn style={{ color: materia.cor }} />
                    {materia.nome}
                    <span className={styles.badge}>
                      {tarefasPorMateria[materia.nome]?.total || 0}
                    </span>
                  </span>

                  <div className={styles.cardActions}>
                    <button
                      onClick={() => {
                        setMateriaSelecionada(materia)
                        setShowEstatisticasModal(true)
                      }}
                      className={styles.statsButton}
                      title="Ver estatísticas"
                    >
                      <FaChartPie />
                    </button>

                    <div className={styles.actionButtons}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setMateriaSelecionada(materia)
                          setShowColorModal(true)
                        }}
                        className={styles.colorButton}
                        title="Alterar cor"
                      >
                        <FaPalette />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setMateriaSelecionada(materia)
                          setShowEditModal(true)
                        }}
                        className={styles.editButton}
                        title="Editar matéria"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteMateria(materia);
                        }}
                        className={styles.removeButton}
                        title="Remover matéria"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      {/* Modais */}
      {showAddModal && (
        <ModalAdicionarMateria
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddMateria}
          materiasExistentes={materiasSalvas.map(m => m.nome)}
        />
      )}

      {showEditModal && materiaSelecionada && (
        <ModalEditarMateria
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleUpdateMateria}
          materia={materiaSelecionada}
        />
      )}

      {showColorModal && materiaSelecionada && (
        <ModalSelecionarCor
          isOpen={showColorModal}
          onClose={() => setShowColorModal(false)}
          onSelect={handleUpdateCor}
          materia={materiaSelecionada}
          corAtual={materiaSelecionada.cor}
        />
      )}

      {showAtividadesModal && materiaSelecionada && (
        <ModalAtividadesMateria
          isOpen={showAtividadesModal}
          onClose={() => setShowAtividadesModal(false)}
          materia={materiaSelecionada}
          atividades={tarefasPorMateria[materiaSelecionada.nome]?.atividades || []}
          onAtividadeUpdate={(updatedAtividades) => {
            // Atualiza os eventos no calendário
            const outrosEventos = eventosCalendario.filter(e => e.materia !== materiaSelecionada.nome)
            const novosEventos = [...outrosEventos, ...updatedAtividades]
            localStorage.setItem("eventos", JSON.stringify(novosEventos))
            setEventosCalendario(novosEventos)
          }}
        />
      )}

      {showEstatisticasModal && materiaSelecionada && (
        <ModalEstatisticas
          isOpen={showEstatisticasModal}
          onClose={() => setShowEstatisticasModal(false)}
          materia={materiaSelecionada}
          total={tarefasPorMateria[materiaSelecionada.nome]?.total || 0}
          concluidas={tarefasPorMateria[materiaSelecionada.nome]?.concluidas || 0}
        />
      )}

      {showConfirmModal && (
        <ModalConfirmacao
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={confirmReset}
          titulo="Resetar Sistema Completo"
          mensagem="⚠️ ATENÇÃO: Todos os dados serão permanentemente apagados!"
          textoConfirmar="Confirmar Reset"
          textoCancelar="Cancelar"
        />
      )}
    </div>
  )
}

export default Materias