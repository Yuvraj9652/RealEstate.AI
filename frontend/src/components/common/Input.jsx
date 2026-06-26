function Input({
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder,
    error,
}) {
    return (
        <div className="input-group">

            <label>{label}</label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />

            {error && (
                <p className="error-text">
                    {Array.isArray(error) ? error[0] : error}
                </p>
            )}

        </div>
    );
}

export default Input;