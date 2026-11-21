import React from 'react';
import { moneyFmt, dollars } from '../../utils/formatters';

export default function ExchangeConfirmModal({
  isOpen,
  username,
  selectedCoins,
  currency = 'USD',
  confirmTitle,
  actionTitle = 'Recharge',
  onClose,
  onConfirm
}) {
  if (!isOpen) return null;

  const amountStr = moneyFmt(dollars(selectedCoins), currency);
  const titleText = confirmTitle ? `Complete ${confirmTitle.toLowerCase()}?` : `Complete ${actionTitle.toLowerCase()}?`;
  const btnText = actionTitle || confirmTitle || 'Recharge';

  return (
    <div
      className="confirm-modal-back"
      id="confirmModalBack"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="confirm-modal-card">
        <button
          type="button"
          className="confirm-modal-close"
          onClick={onClose}
        >
          ×
        </button>

        <div className="confirm-modal-icon-wrap">
          <div className="confirm-coin-badge">
            <svg className="orbit-arrow orbit-left" viewBox="0 0 24 24" width="22" height="22">
              <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0 0 20 12c0-4.42-3.58-8-8-8z" fill="#20d5ec" />
            </svg>
            <div className="confirm-coin-circle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff">
                <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.901 2.868 2.893 2.893 0 0 1-2.892-2.892 2.896 2.896 0 0 1 2.892-2.894c.277 0 .542.04.794.113V9.38a6.34 6.34 0 0 0-.794-.052 6.353 6.353 0 0 0-6.35 6.35 6.353 6.353 0 0 0 6.35 6.35 6.354 6.354 0 0 0 6.349-6.35V8.847a8.214 8.214 0 0 0 4.767 1.503V6.905c-.34 0-.677-.074-.995-.219z" />
              </svg>
            </div>
            <svg className="orbit-arrow orbit-right" viewBox="0 0 24 24" width="22" height="22">
              <path d="M12 20v3l4-4-4-4v3c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 0 0 4 12c0 4.42 3.58 8 8 8z" fill="#ff6699" />
            </svg>
          </div>
        </div>

        <h3 className="confirm-modal-title">{titleText}</h3>
        <p className="confirm-modal-desc">
          {amountStr} will be deducted from LIVE rewards balance and sent to @{username}
        </p>

        <div className="confirm-modal-actions">
          <button
            type="button"
            className="confirm-btn-back"
            onClick={onClose}
          >
            Go back
          </button>
          <button
            type="button"
            className="confirm-btn-exchange"
            onClick={onConfirm}
          >
            {btnText}
          </button>
        </div>
      </div>
    </div>
  );
}
