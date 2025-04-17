import styles from './Input.module.css'

function Input({ type, name, placeholder, text, min, step, value, onChange, hasError }) {
    return (
        <div className={`${styles.form_control} ${hasError ? styles.invalid : ''}`}>
            <label htmlFor={name}>{text}:</label>
            <input
                required
                type={type}
                name={name}
                placeholder={placeholder}
                min={min}
                step={step}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default Input