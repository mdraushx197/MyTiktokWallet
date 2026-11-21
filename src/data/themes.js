export const LUXURY_THEMES = [
  {
    id: 'metal-gold',
    name: 'Metal Gold',
    subtitle: 'Classic Gold',
    gradient: 'linear-gradient(135deg, #e67e00 0%, #b85d00 45%, #6d3200 100%)',
    cardGradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 35%, #92400e 75%, #451a03 100%)',
    accentColor: '#f59e0b',
    textColor: '#ffffff',
    isGlitter: false
  },
  {
    id: 'ultra-platinum',
    name: 'Ultra Platinum',
    subtitle: 'Ultra Mirror',
    gradient: 'linear-gradient(135deg, #e2e8f0 0%, #94a3b8 35%, #475569 70%, #1e293b 100%)',
    cardGradient: 'linear-gradient(135deg, #cbd5e1 0%, #94a3b8 30%, #334155 70%, #0f172a 100%)',
    accentColor: '#38bdf8',
    textColor: '#ffffff',
    isGlitter: false
  },
  {
    id: 'rose-gold',
    name: 'Rose Gold',
    subtitle: 'Rose Metal',
    gradient: 'linear-gradient(135deg, #fb7185 0%, #e11d48 40%, #881337 75%, #4c0519 100%)',
    cardGradient: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 35%, #881337 75%, #4c0519 100%)',
    accentColor: '#fda4af',
    textColor: '#ffffff',
    isGlitter: false
  },
  {
    id: 'space-grey',
    name: 'Space Grey',
    subtitle: 'Titanium',
    gradient: 'linear-gradient(135deg, #64748b 0%, #334155 45%, #1e293b 80%, #0f172a 100%)',
    cardGradient: 'linear-gradient(135deg, #64748b 0%, #334155 45%, #1e293b 80%, #0f172a 100%)',
    accentColor: '#94a3b8',
    textColor: '#ffffff',
    isGlitter: false
  },
  {
    id: 'electric-blue',
    name: 'Electric Blue',
    subtitle: 'Electric Neon',
    gradient: 'linear-gradient(135deg, #00d2ff 0%, #0077b6 45%, #4338ca 100%)',
    cardGradient: 'linear-gradient(135deg, #00d2ff 0%, #0077b6 45%, #4338ca 100%)',
    accentColor: '#38bdf8',
    textColor: '#ffffff',
    isGlitter: false
  },
  {
    id: 'emerald-green',
    name: 'Emerald Green',
    subtitle: 'Royal Jade',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 40%, #064e3b 80%, #022c22 100%)',
    cardGradient: 'linear-gradient(135deg, #10b981 0%, #059669 40%, #064e3b 80%, #022c22 100%)',
    accentColor: '#34d399',
    textColor: '#ffffff',
    isGlitter: false
  },
  {
    id: 'obsidian-noir',
    name: 'Obsidian Noir',
    subtitle: 'Stealth Black',
    gradient: 'linear-gradient(135deg, #262626 0%, #171717 50%, #0a0a0a 100%)',
    cardGradient: 'linear-gradient(135deg, #262626 0%, #171717 50%, #0a0a0a 100%)',
    accentColor: '#ffffff',
    textColor: '#ffffff',
    isGlitter: false
  },
  {
    id: 'glitter-shimmer',
    name: 'Glitter Shimmer',
    subtitle: 'Glitter ✨',
    gradient: 'linear-gradient(135deg, #c084fc 0%, #818cf8 40%, #38bdf8 80%, #06b6d4 100%)',
    cardGradient: 'linear-gradient(135deg, #c084fc 0%, #818cf8 35%, #38bdf8 75%, #0284c7 100%)',
    accentColor: '#e879f9',
    textColor: '#ffffff',
    isGlitter: true
  },
  {
    id: 'glitter-gold',
    name: 'Glitter Gold',
    subtitle: 'Gold ✨',
    gradient: 'linear-gradient(135deg, #facc15 0%, #eab308 50%, #ca8a04 100%)',
    cardGradient: 'linear-gradient(135deg, #facc15 0%, #eab308 45%, #ca8a04 85%, #92400e 100%)',
    accentColor: '#fef08a',
    textColor: '#ffffff',
    isGlitter: true
  }
];

export const getThemeById = (id) =>
  LUXURY_THEMES.find((t) => t.id === id) || LUXURY_THEMES[7]; // default to glitter-shimmer (index 7)
