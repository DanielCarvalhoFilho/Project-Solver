interface ModalProps {
    onConfirm: () => void;
    onCancel: () => void;
    filename: string;
}

const Modal: React.FC<ModalProps> = ({ onConfirm, onCancel, filename }) => {
    return (
        <>
            <div className="modal-backdrop fade show"></div>
            <div className="modal fade show d-block" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirmar Importação</h5>
                        </div>
                        <div className="modal-body">
                            <p>
                                Deseja importar o arquivo{" "}
                                <strong className="text-primary">{filename}</strong>?
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={onConfirm}>
                                Importar
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={onCancel}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modal