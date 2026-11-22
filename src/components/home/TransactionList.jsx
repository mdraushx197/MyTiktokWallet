import React from 'react';
import { moneyFmt, coinFmt } from '../../utils/formatters';
import { TikTokCoinIcon } from '../common/Coin';

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
                    e.currentTarget.style.display = 'none';
                    if (e.currentTarget.nextElementSibling) {
                      e.currentTarget.nextElementSibling.style.display = 'inline-flex';
                    }
                  }}
                />
              ) : null}
              <div
                className="avatar"
                style={{
                  display: tx.avatar ? 'none' : 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'none'
                }}
              >
                <TikTokCoinIcon size={24} />
              </div>
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
