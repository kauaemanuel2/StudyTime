import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import styles from './ModalEstatisticas.module.css'

const COLORS = ['#2a9d8f', '#e9c46a'];

function ModalEstatisticas({ isOpen, onClose, materia, total, concluidas }) {
  const data = [
    { name: 'Concluídas', value: concluidas },
    { name: 'Pendentes', value: total - concluidas }
  ]

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>Estatísticas - {materia.nome}</h3>
        
        <div className={styles.statsContainer}>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{total}</span>
            <span className={styles.statLabel}>Total de Atividades</span>
          </div>
          
          <div className={styles.statCard}>
            <span className={styles.statValue}>{concluidas}</span>
            <span className={styles.statLabel}>Atividades Concluídas</span>
          </div>
          
          <div className={styles.statCard}>
            <span className={styles.statValue}>
              {total > 0 ? Math.round((concluidas / total) * 100) : 0}%
            </span>
            <span className={styles.statLabel}>Taxa de Conclusão</span>
          </div>
        </div>

        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.modalFooter}>
          <button onClick={onClose} className={styles.fecharButton}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalEstatisticas