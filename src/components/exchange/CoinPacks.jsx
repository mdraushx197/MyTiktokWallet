import React from 'react';
import { coinFmt, fmt, getCurSym } from '../../utils/formatters';
import { TikTokCoinIcon } from '../common/Coin';

export const RECHARGE_PACKS = [
  { coins: 30, price: 0.34 },
  { coins: 350, price: 3.95 },
  { coins: 700, price: 7.89 },
  { coins: 1400, price: 15.75 },
  { coins: 3500, price: 39.35 }
];

export default function CoinPacks({
  selected,
  onSelectPack,
  onOpenCustom,
  currency = 'USD'
}) {
  const isPresetSelected = RECHARGE_PACKS.some(p => p.coins === selected);
  const isCustomActive = selected > 0 && !isPresetSelected;

  const sym = getCurSym(currency);

  return (
    <div className="field">
      <label>Exchange earnings for Coins</label>

      {/* 3x2 Grid matching Image 1 */}
      <div className="recharge-grid">
        {RECHARGE_PACKS.map((p) => {
          const isActive = selected === p.coins;
          return (
            <button
              key={p.coins}
              type="button"
              className={`recharge-pack ${isActive ? 'active' : ''}`}
              onClick={() => onSelectPack(p.coins)}
            >
              <div className="recharge-pack-top">
                <TikTokCoinIcon size={18} />
                <span className="recharge-pack-coins">{coinFmt(p.coins)}</span>
              </div>
              <div className="recharge-pack-price">
                {sym}{fmt(p.price)}
              </div>
            </button>
          );
        })}

        {/* 6th Item: Custom */}
        <button
          type="button"
          className={`recharge-pack recharge-custom-pack ${isCustomActive ? 'active' : ''}`}
          onClick={onOpenCustom}
        >
          {isCustomActive ? (
            <>
              <div className="recharge-pack-top">
                <TikTokCoinIcon size={18} />
                <span className="recharge-pack-coins">{coinFmt(selected)}</span>
              </div>
              <div className="recharge-pack-price">
                {sym}{fmt((selected * 39.35) / 3500)}
              </div>
            </>
          ) : (
            <span className="recharge-custom-label">Custom</span>
          )}
        </button>
      </div>

      {selected > 0 && (
        <div className="exchange-preview">
          {coinFmt(selected)} Coins (≈ {sym}{fmt((selected * 39.35) / 3500)})
        </div>
      )}

      <div className="policy" onClick={() => alert('Virtual Items Policy')}>
        Virtual Items Policy
      </div>
    </div>
  );
}
