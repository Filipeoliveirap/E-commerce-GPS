import React, { useState } from "react";
import "./DeleteAccountModal.css";

export default function DeleteAccountModal({ isOpen, onClose, onConfirm, loading }) {
  const [checked, setChecked] = useState(false);

  const handleConfirm = () => {
    if (checked) {
      onConfirm();
      setChecked(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content delete-account-modal">
        <div className="modal-header">
          <h2>Deletar Conta</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="warning-icon">⚠️</div>
          <p className="warning-text">
            Você está prestes a <strong>deletar permanentemente</strong> sua conta.
          </p>
          <p className="warning-description">
            Esta ação é <strong>irreversível</strong> e removerá:
          </p>
          <ul className="warning-list">
            <li>Seus dados pessoais (nome, email, CPF, telefone)</li>
            <li>Seu histórico de compras</li>
            <li>Suas preferências e configurações</li>
            <li>Acesso à sua conta</li>
          </ul>

          <div className="confirmation-checkbox">
            <input
              type="checkbox"
              id="confirm-delete"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            <label htmlFor="confirm-delete">
              Entendi que esta ação é irreversível e desejo deletar minha conta
            </label>
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="btn-cancel"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            className="btn-delete"
            onClick={handleConfirm}
            disabled={!checked || loading}
          >
            {loading ? "Deletando..." : "Deletar Permanentemente"}
          </button>
        </div>
      </div>
    </div>
  );
}
