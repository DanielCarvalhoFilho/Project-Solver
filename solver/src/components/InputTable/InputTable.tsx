interface InputTableProps {
    type?: 'text' | 'number';
    value?: string | number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    fontWeight?: 'normal' | 'bold';
}

const InputTable: React.FC<InputTableProps> = ({
    type = 'text',
    value = "",
    onChange,
    fontWeight = 'normal',
}) => {
    return (
        <input style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', textAlign: 'center', fontWeight: fontWeight }} type={type} value={value} onChange={onChange} />
    );
};

export default InputTable