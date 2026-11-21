import React from 'react';
import { moneyFmt } from '../../utils/formatters';

export default function RewardsCards({ balance, upcomingBalance, currency = 'USD' }) {
  return (
    <section className="cards">
      <div className="card">
        <span>Available rewards</span>
        <strong id="homeCardBalance">{moneyFmt(balance, currency)}</strong>
      </div>
      <div className="card">
        <span>
          Upcoming rewards <span className="upcoming-dot" />
        </span>
        <strong>{moneyFmt(upcomingBalance, currency)}</strong>
      </div>
    </section>
  );
}
