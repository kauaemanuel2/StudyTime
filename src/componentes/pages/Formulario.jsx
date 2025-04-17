import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Submit from '../form/Submit'
import Input from "../form/Input"
import styles from "./Formulario.module.css"

function Formulario() {
    const [nome, setNome] = useState("")
    const [materias, setMaterias] = useState("")
    const [meta, setMeta] = useState("")
    const [mensagem, setMensagem] = useState("")

    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
    
        if(nome.trim() === "" || materias.trim() === "" || meta.trim() === "") {
            setMensagem("Preencha todos os campos corretamente para continuar!")
            return
        }
    
        localStorage.setItem('nomeUsuario', nome)
        localStorage.setItem('materiasUsuario', JSON.stringify(materias.split(',').map(m => m.trim())))
        localStorage.setItem('metaUsuario', meta)
    
        navigate('/dashboard')
    }

    return (
        <div className={styles.formContainer}>
            <div className={styles.formHeader}>
                <h1>Configurações Iniciais</h1>
                <p className={styles.subtitle}>Vamos personalizar sua experiência de estudos</p>
                
                {mensagem && <p className={styles.mensagemErro}>{mensagem}</p>}
            </div>

            <form onSubmit={handleSubmit} className={styles.formContent}>
                <Input
                    required
                    name="nome"
                    text="Seu Nome Completo"
                    type="text"
                    placeholder="Ex: Kauã Emanuel"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    hasError={!!mensagem}
                />

                <Input
                    required
                    name="materias"
                    text="Matérias (separadas por vírgula)"
                    type="text"
                    placeholder="Ex: Anatomia, Fisiologia, Bioquímica"
                    value={materias}
                    onChange={(e) => setMaterias(e.target.value)}
                    hasError={!!mensagem}
                />

                <Input
                    required
                    name="meta"
                    text="Meta Diária de Estudo (horas)"
                    type="number"
                    placeholder="Ex: 2"
                    min="0.5"
                    step="0.5"
                    value={meta}
                    onChange={(e) => setMeta(e.target.value)}
                    hasError={!!mensagem}
                />

                <div className={styles.formActions}>
                    <Submit text="Salvar e Continuar" />
                </div>
            </form>
        </div>
    )
}

export default Formulario