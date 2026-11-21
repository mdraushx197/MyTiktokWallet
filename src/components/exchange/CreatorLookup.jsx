import React from 'react';

export default function CreatorLookup({
  username,
  onChange,
  onClear,
  onSubmitImmediate
}) {
  const hasUser = Boolean(username && username.trim());

  return (
    <div className="field">
      <label>Creator username</label>
      <div className="handle">
        <b id="handleAt" style={{ display: hasUser ? 'inline' : 'none' }}>@</b>
        <input
          id="creatorInput"
          value={username}
          placeholder="@your-TikTok Handle"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              if (onSubmitImmediate) onSubmitImmediate();
            }
          }}
        />
        <button
          type="button"
          id="clearUsernameBtn"
          className={`clear-btn ${hasUser ? '' : 'hidden'}`}
          onClick={onClear}
          title="Clear input"
        >
          ×
        </button>
      </div>
    </div>
  );
}
