import React, { useState, useEffect } from 'react';
import { coinFmt, fmt, getCurSym } from '../../utils/formatters';
import Button from '../common/Button';

export default function CustomKeypadSheet({
  isOpen,
  initialCoins = 0,
  maxCoins = 0,
  currency = 'USD',
  onClose,
  onDone
}) {
  const [val, setVal] = useState(String(initialCoins || 0));

  useEffect(() => {
    if (isOpen) {
      setVal(String(initialCoins || 0));
    }
  }, [isOpen, initialCoins]);

  if (!isOpen) return null;

  const currentCoins = Math.min(Number(val) || 0, maxCoins);

  const handleKey = (k) => {
    let next = val;
    if (k === '⌫') {
      next = next.slice(0, -1);
      if (!next) next = '0';
    } else if (k === '000') {
      next = (next === '0' ? '' : next) + '000';
    } else {
      next = (next === '0' ? '' : next) + k;
    }
    const num = Number(next);
    if (!Number.isFinite(num) || num < 0) next = '0';
    if (num > maxCoins) next = String(maxCoins);
    setVal(next);
  };

  const handleAll = () => {
    setVal(String(maxCoins));
  };

  const handleDone = () => {
    onDone(currentCoins);
    onClose();
  };

  return (
    <div
      className="sheet-back"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="sheet">
        <div className="sheet-head">
          <h2>Custom</h2>
          <button type="button" onClick={onClose}>×</button>
        </div>
        <div className="number">
          <div className="caption">Number of Coins</div>
          <div className="number-row">
            <span>🪙</span>&nbsp;<span id="num">{coinFmt(currentCoins)}</span>
            <span className="all" onClick={handleAll}>All</span>
          </div>
          <div className="amount" id="customAmount">
            {getCurSym(currency)}{fmt((currentCoins * 39.35) / 3500)}
          </div>
          <div className="keypad">
            {['1', '2', '3', '⌫', '4', '5', '6', '000', '7', '8', '9', '0'].map((k) => (
              <button
                key={k}
                type="button"
                className="key"
                onClick={() => handleKey(k)}
              >
                {k}
              </button>
            ))}
          </div>
          <div className="policy" onClick={() => alert('Virtual Items Policy')}>
            Virtual Items Policy
          </div>
          <div className="total">
            <span>Total</span>
            <strong id="customTotal">€{fmt((currentCoins * 39.35) / 3500)}</strong>
          </div>
          <Button
            id="customDoneBtn"
            variant="primary"
            style={{ opacity: currentCoins > 0 ? 1 : 0.45 }}
            onClick={handleDone}
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
