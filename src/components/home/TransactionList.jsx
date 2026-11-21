import React from 'react';
import { moneyFmt, coinFmt } from '../../utils/formatters';

export default function TransactionList({
  transactions = [],
  currency = 'USD',
  transferLabel
}) {
  return (
    <section className="section">
      <div className="section-head">
        <h2>Transactions</h2>
        <span className="month">Sep 2026</span>
      </div>
      {transactions.length ? (
        transactions.map((tx) => (
          <div key={tx.id || tx.time} className="tx">
            <div className="txleft">
              {tx.avatar ? (
                <img
                  src={tx.avatar}
                  className="avatar-img"
                  alt={tx.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.outerHTML = '<div class="avatar">🪙</div>';
                  }}
                />
              ) : (
                <div className="avatar">🪙</div>
              )}
              <div>
                <div className="txname">{tx.name}</div>
                <div className="txsub">
                  {transferLabel
                    ? `${transferLabel} to @${tx.handle || tx.name}`
                    : `Sent ${coinFmt(tx.coins)} Coins to @${tx.handle || tx.name}`}
                </div>
                <div className="txtime">{tx.time}</div>
              </div>
            </div>
            <div className="negative">-{moneyFmt(tx.amount, currency)}</div>
          </div>
        ))
      ) : (
        <div className="empty">No transactions yet.</div>
      )}
    </section>
  );
}
