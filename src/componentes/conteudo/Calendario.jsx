import { useState } from 'react';
import React from 'react';
import styles from './Calendario.module.css';
import { FaChevronLeft, FaChevronRight, FaCheck } from 'react-icons/fa';
import moment from 'moment';
import 'moment/locale/pt-br';

moment.locale('pt-br');

export default function Calendario({ eventos, onSelecionarData, onConcluirAtividade }) {
  const [dataAtual, setDataAtual] = useState(moment());
  const diasSemana = moment.weekdaysShort(true);

  const gerarDiasDoMes = () => {
    const inicioMes = dataAtual.clone().startOf('month').startOf('week');
    const fimMes = dataAtual.clone().endOf('month').endOf('week');
    
    const dias = [];
    let diaAtual = inicioMes.clone();
    
    while (diaAtual.isSameOrBefore(fimMes, 'day')) {
      dias.push(diaAtual.clone());
      diaAtual.add(1, 'day');
    }
    
    return dias;
  };

  const handleConcluir = (eventoId, e) => {
    e.stopPropagation();
    onConcluirAtividade(eventoId);
  };

  const semanas = [];
  const todosDias = gerarDiasDoMes();
  while (todosDias.length) semanas.push(todosDias.splice(0, 7));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={() => setDataAtual(dataAtual.clone().subtract(1, 'month'))}>
          <FaChevronLeft />
        </button>
        <h2>{dataAtual.format('MMMM [de] YYYY')}</h2>
        <button onClick={() => setDataAtual(dataAtual.clone().add(1, 'month'))}>
          <FaChevronRight />
        </button>
      </div>

      <div className={styles.semana}>
        {diasSemana.map(dia => (
          <div key={dia}>{dia}</div>
        ))}
      </div>

      <div className={styles.grid}>
        {semanas.map((semana, i) => (
          <React.Fragment key={i}>
            {semana.map((dia, j) => {
              const eventosDoDia = eventos.filter(e => moment(e.start).isSame(dia, 'day'));
              const urgencia = eventosDoDia.find(e => e.urgencia)?.urgencia || '';
              
              return (
                <div
                  key={j}
                  className={`${styles.dia} ${dia.isSame(moment(), 'day') ? styles.hoje : ''} ${
                    !dia.isSame(dataAtual, 'month') ? styles.outsideMonth : ''
                  } ${styles[urgencia]}`}
                  onClick={() => onSelecionarData(dia.toDate())}
                >
                  <div className={styles.diaContent}>
                    <div className={styles.numeroDia}>{dia.date()}</div>
                    <div className={styles.eventosContainer}>
                      {eventosDoDia.slice(0, 1).map((evento, k) => (
                        <div key={k} className={styles.evento}>
                          <span>{evento.title.length > 12 ? `${evento.title.substring(0, 10)}..` : evento.title}</span>
                        </div>
                      ))}
                      {eventosDoDia.length > 1 && (
                        <div className={styles.maisEventos}>+{eventosDoDia.length - 1}</div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}