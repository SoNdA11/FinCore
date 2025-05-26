// Este componente React exibe um modal de alerta para confirmar operações de exclusão,
// garantindo que o usuário realmente deseja prosseguir com a ação.

import React from 'react';

const DeleteAlert = ({ content, onDelete }) => {
    return (
        <div>
            <p className="text-sm ">{content}</p>
            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    className="add-btn add-btn-fill"
                    onClick={onDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default DeleteAlert;