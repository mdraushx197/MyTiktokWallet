const state = {
  screen: 'home', // 'home' | 'exchange' | 'success' | 'toolbox'
  balance: 9690899.43, // Default from TikTok LIVE Rewards screenshot
  coins: 798525002, // Default coin equivalent
  upcomingBalance: 2000000, // Default from screenshot
  username: '',
  selected: 0,
  profile: null,
  profileLoading: false,
  profileError: null,
  animateHome: false,
  lastDeduction: null,
  showExchangeModal: false,
  notificationTimeout: null,

  // Toolbox settings (Images 2 & 3)
  toolbox: {
    walletMode: 'coins', // 'transfer' | 'exchange' | 'coins'
    exchangeCompleteStyle: 'green', // 'green' | 'red'
    autoAtRemove: true,
    randomProfileForUnknown: true,
    confirmWithdrawalTitle: 'Transfer details',
    transferDetailsTitle: 'Transfer details',
    transferLabel: 'LIVE rewards transfer to TikTok',
    currency: 'USD', // 'USD' | 'EUR' | 'TRY' | 'GBP' | 'BRL'
    followerTextSize: 2, // 1 to 6
    theme: 'glitter-shimmer',
    paymentLoading: {
      enabled: true,
      style: 'dots', // 'classic' | 'modern' | 'ring' | 'dots' | 'squares'
      duration: 1 // in seconds
    },
    searchLoading: {
      enabled: true,
      style: 'classic',
      duration: 1
    }
  },

  transactions: []
};

const currencyMap = {
  USD: '$',
  EUR: '€',
  TRY: '₺',
  GBP: '£',
  BRL: 'R$'
};

const getCurSym = () => currencyMap[state.toolbox.currency] || '$';

const rate = 250 / 3.03; // coins per USD
const fmt = n => new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
const moneyFmt = n => `${getCurSym()}${fmt(n)}`;
const coinFmt = n => new Intl.NumberFormat('en-US').format(Math.floor(n));
const dollars = coins => coins / rate;

function numFmt(n) {
  if (n == null || isNaN(n)) return '0';
  if (n >= 1e9) return (n / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
  return new Intl.NumberFormat('en-US').format(n);
}

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[m]));
}

function cleanHandle(raw) {
  if (!raw) return '';
  let str = String(raw).trim();
  str = str.replace(/^https?:\/\/(www\.)?tiktok\.com\/@?/i, '');
  if (state.toolbox.autoAtRemove) {
    str = str.replace(/^@+/, '');
  }
  str = str.split('?')[0].split('/')[0].trim();
  return str;
}

const randomAvatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80"
];

// 100+ Realistic Creator Profiles Database with follower & like counts
const CREATOR_DATABASE = [
  { username: "roshan", nickname: "Roshan", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80", followers: 2450000, likes: 38200000, verified: true },
  { username: "raushx", nickname: "Alex D", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", followers: 850000, likes: 14200000, verified: true },
  { username: "apple", nickname: "Apple", avatar: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=400&q=80", followers: 6800000, likes: 45100000, verified: true },
  { username: "samsung", nickname: "Samsung", avatar: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=400&q=80", followers: 5200000, likes: 29800000, verified: true },
  { username: "mrbeast", nickname: "MrBeast", avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=400&q=80", followers: 104500000, likes: 982000000, verified: true },
  { username: "khaby.lame", nickname: "Khaby Lame", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80", followers: 162800000, likes: 2400000000, verified: true },
  { username: "charlidamelio", nickname: "charli d'amelio", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80", followers: 155600000, likes: 11700000000, verified: true },
  { username: "bellapoarch", nickname: "Bella Poarch", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80", followers: 94200000, likes: 2300000000, verified: true },
  { username: "addisonre", nickname: "Addison Rae", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80", followers: 88500000, likes: 5800000000, verified: true },
  { username: "zachking", nickname: "Zach King", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80", followers: 82100000, likes: 1100000000, verified: true },
  { username: "willsmith", nickname: "Will Smith", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", followers: 75200000, likes: 540000000, verified: true },
  { username: "tiktok", nickname: "TikTok", avatar: "https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&w=400&q=80", followers: 80400000, likes: 320000000, verified: true },
  { username: "cznburak", nickname: "Czn Burak", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80", followers: 74900000, likes: 1500000000, verified: true },
  { username: "therock", nickname: "The Rock", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80", followers: 74500000, likes: 542000000, verified: true },
  { username: "domelipa", nickname: "domelipa", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80", followers: 74100000, likes: 4800000000, verified: true },
  { username: "dixiedamelio", nickname: "Dixie", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80", followers: 56400000, likes: 3300000000, verified: true },
  { username: "jasonderulo", nickname: "Jason Derulo", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", followers: 58700000, likes: 1300000000, verified: true },
  { username: "spencerx", nickname: "Spencer X", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80", followers: 55100000, likes: 1300000000, verified: true },
  { username: "lorengray", nickname: "Loren Gray", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80", followers: 54200000, likes: 3000000000, verified: true },
  { username: "justmaiko", nickname: "Michael Le", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80", followers: 51800000, likes: 1400000000, verified: true },
  { username: "kallmekris", nickname: "Kris HC", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80", followers: 50400000, likes: 2200000000, verified: true },
  { username: "brentrivera", nickname: "Brent Rivera", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", followers: 47900000, likes: 1600000000, verified: true },
  { username: "avani", nickname: "Avani", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80", followers: 42800000, likes: 3100000000, verified: true },
  { username: "selenagomez", nickname: "Selena Gomez", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80", followers: 59300000, likes: 620000000, verified: true },
  { username: "kyliejenner", nickname: "Kylie Jenner", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80", followers: 55800000, likes: 1200000000, verified: true },
  { username: "billieeilish", nickname: "Billie Eilish", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80", followers: 60100000, likes: 410000000, verified: true },
  { username: "arianagrande", nickname: "Ariana Grande", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80", followers: 36400000, likes: 340000000, verified: true },
  { username: "taylorswift", nickname: "Taylor Swift", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80", followers: 32500000, likes: 290000000, verified: true },
  { username: "shakira", nickname: "Shakira", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80", followers: 41200000, likes: 280000000, verified: true },
  { username: "dualipa", nickname: "Dua Lipa", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80", followers: 15800000, likes: 180000000, verified: true },
  { username: "ed.sheeran", nickname: "Ed Sheeran", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", followers: 14600000, likes: 155000000, verified: true },
  { username: "justinbieber", nickname: "Justin Bieber", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80", followers: 27900000, likes: 175000000, verified: true },
  { username: "bts_official_bighit", nickname: "BTS", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80", followers: 65400000, likes: 1400000000, verified: true },
  { username: "blackpinkofficial", nickname: "BLACKPINK", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80", followers: 48900000, likes: 620000000, verified: true },
  { username: "alanwalker", nickname: "Alan Walker", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80", followers: 18200000, likes: 125000000, verified: true },
  { username: "marshmello", nickname: "Marshmello", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", followers: 32100000, likes: 380000000, verified: true },
  { username: "ishowspeed", nickname: "Speed", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80", followers: 28500000, likes: 310000000, verified: true },
  { username: "kai_cenat", nickname: "Kai Cenat", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80", followers: 16400000, likes: 195000000, verified: true },
  { username: "adinross", nickname: "Adin Ross", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", followers: 9800000, likes: 88000000, verified: true },
  { username: "xqc", nickname: "xQc", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80", followers: 4500000, likes: 45000000, verified: true },
  { username: "ninja", nickname: "Ninja", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80", followers: 19100000, likes: 145000000, verified: true },
  { username: "pokimane", nickname: "Pokimane", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80", followers: 6800000, likes: 62000000, verified: true },
  { username: "valkyrae", nickname: "Valkyrae", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80", followers: 3400000, likes: 38000000, verified: true },
  { username: "pewdiepie", nickname: "PewDiePie", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", followers: 13500000, likes: 98000000, verified: true },
  { username: "stokes_twins", nickname: "Stokes Twins", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80", followers: 24200000, likes: 580000000, verified: true },
  { username: "bayashi.tiktok", nickname: "Bayashi", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80", followers: 54300000, likes: 1800000000, verified: true },
  { username: "gordonramsayofficial", nickname: "Gordon Ramsay", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80", followers: 40200000, likes: 620000000, verified: true },
  { username: "nusr_et", nickname: "Salt Bae", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", followers: 22800000, likes: 190000000, verified: true },
  { username: "cristiano", nickname: "Cristiano Ronaldo", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80", followers: 18900000, likes: 140000000, verified: true },
  { username: "leomessi", nickname: "Leo Messi", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80", followers: 16200000, likes: 110000000, verified: true },
  { username: "neymarjr", nickname: "Neymar Jr", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80", followers: 32400000, likes: 270000000, verified: true },
  { username: "k.mbappe", nickname: "Kylian Mbappé", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", followers: 22100000, likes: 160000000, verified: true },
  { username: "erling.haaland", nickname: "Erling Haaland", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80", followers: 12800000, likes: 95000000, verified: true },
  { username: "virat.kohli", nickname: "Virat Kohli", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80", followers: 15300000, likes: 130000000, verified: true },
  { username: "nike", nickname: "Nike", avatar: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80", followers: 8900000, likes: 78000000, verified: true },
  { username: "adidas", nickname: "Adidas", avatar: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=400&q=80", followers: 7200000, likes: 64000000, verified: true },
  { username: "netflix", nickname: "Netflix", avatar: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=400&q=80", followers: 38600000, likes: 890000000, verified: true },
  { username: "google", nickname: "Google", avatar: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=400&q=80", followers: 5400000, likes: 42000000, verified: true },
  { username: "microsoft", nickname: "Microsoft", avatar: "https://images.unsplash.com/photo-1583321500900-828764eb92a3?auto=format&fit=crop&w=400&q=80", followers: 3800000, likes: 28000000, verified: true },
  { username: "playstation", nickname: "PlayStation", avatar: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80", followers: 14800000, likes: 160000000, verified: true },
  { username: "xbox", nickname: "Xbox", avatar: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=400&q=80", followers: 8400000, likes: 92000000, verified: true },
  { username: "redbull", nickname: "Red Bull", avatar: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=400&q=80", followers: 19300000, likes: 310000000, verified: true },
  { username: "tesla", nickname: "Tesla", avatar: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=400&q=80", followers: 4800000, likes: 38000000, verified: true },
  { username: "nasa", nickname: "NASA", avatar: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80", followers: 11200000, likes: 130000000, verified: true },
  { username: "natgeo", nickname: "National Geographic", avatar: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80", followers: 14500000, likes: 195000000, verified: true },
  { username: "nba", nickname: "NBA", avatar: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=400&q=80", followers: 21800000, likes: 480000000, verified: true },
  { username: "fifaworldcup", nickname: "FIFA World Cup", avatar: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=400&q=80", followers: 18400000, likes: 320000000, verified: true },
  { username: "starbucks", nickname: "Starbucks", avatar: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=400&q=80", followers: 3200000, likes: 35000000, verified: true },
  { username: "mcdonalds", nickname: "McDonald's", avatar: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80", followers: 5900000, likes: 68000000, verified: true },
  { username: "gucci", nickname: "Gucci", avatar: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=400&q=80", followers: 4200000, likes: 48000000, verified: true },
  { username: "louisvuitton", nickname: "Louis Vuitton", avatar: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80", followers: 3800000, likes: 39000000, verified: true },
  { username: "zara", nickname: "Zara", avatar: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=400&q=80", followers: 6100000, likes: 52000000, verified: true },
  { username: "mina.chou992", nickname: "Mina Chou 💕 MRSN", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80", followers: 654000, likes: 8200000, verified: true },
  { username: "danieltiffin", nickname: "Daniel Tiffin", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", followers: 480000, likes: 5400000, verified: false },
  { username: "alexeid", nickname: "Alexei", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80", followers: 320000, likes: 4100000, verified: false },
  { username: "david_beckham", nickname: "David Beckham", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80", followers: 9800000, likes: 82000000, verified: true },
  { username: "tomholland", nickname: "Tom Holland", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80", followers: 14200000, likes: 135000000, verified: true },
  { username: "zendaya", nickname: "Zendaya", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80", followers: 18500000, likes: 190000000, verified: true },
  { username: "jennaortega", nickname: "Jenna Ortega", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80", followers: 22400000, likes: 240000000, verified: true },
  { username: "milliebobbybrown", nickname: "Millie Bobby Brown", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80", followers: 16800000, likes: 180000000, verified: true },
  { username: "olivia.rodrigo", nickname: "Olivia Rodrigo", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80", followers: 21600000, likes: 260000000, verified: true },
  { username: "sabrinacarpenter", nickname: "Sabrina Carpenter", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80", followers: 19400000, likes: 230000000, verified: true },
  { username: "lanadelrey", nickname: "Lana Del Rey", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80", followers: 12800000, likes: 140000000, verified: true },
  { username: "ladygaga", nickname: "Lady Gaga", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80", followers: 13900000, likes: 110000000, verified: true },
  { username: "rihanna", nickname: "Rihanna", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80", followers: 9400000, likes: 85000000, verified: true },
  { username: "beyonce", nickname: "Beyoncé", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80", followers: 6800000, likes: 45000000, verified: true },
  { username: "drake", nickname: "Drake", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", followers: 11200000, likes: 98000000, verified: true },
  { username: "travis.scott", nickname: "Travis Scott", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80", followers: 8400000, likes: 76000000, verified: true },
  { username: "snoopdogg", nickname: "Snoop Dogg", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80", followers: 28900000, likes: 240000000, verified: true },
  { username: "theweeknd", nickname: "The Weeknd", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80", followers: 14500000, likes: 120000000, verified: true },
  { username: "badbunny", nickname: "Bad Bunny", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", followers: 34200000, likes: 360000000, verified: true },
  { username: "karolg", nickname: "Karol G", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80", followers: 52800000, likes: 480000000, verified: true },
  { username: "maluma", nickname: "Maluma", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80", followers: 16800000, likes: 135000000, verified: true },
  { username: "jbalvin", nickname: "J Balvin", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80", followers: 22400000, likes: 190000000, verified: true },
  { username: "rosalia", nickname: "Rosalía", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80", followers: 33600000, likes: 390000000, verified: true },
  { username: "camilacabello", nickname: "Camila Cabello", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80", followers: 17500000, likes: 155000000, verified: true },
  { username: "shawnmendes", nickname: "Shawn Mendes", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", followers: 16900000, likes: 145000000, verified: true },
  { username: "harrystyles", nickname: "Harry Styles", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80", followers: 12400000, likes: 115000000, verified: true },
  { username: "johncena", nickname: "John Cena", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80", followers: 8600000, likes: 72000000, verified: true },
  { username: "robertdowneyjr", nickname: "Robert Downey Jr", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80", followers: 15800000, likes: 140000000, verified: true },
  { username: "emmawatson", nickname: "Emma Watson", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80", followers: 7200000, likes: 65000000, verified: true },
  { username: "charlieputh", nickname: "Charlie Puth", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", followers: 23500000, likes: 310000000, verified: true },
  { username: "postmalone", nickname: "Post Malone", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80", followers: 15600000, likes: 140000000, verified: true },
  { username: "eminem", nickname: "Eminem", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80", followers: 12800000, likes: 115000000, verified: true },
  { username: "espn", nickname: "ESPN", avatar: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=400&q=80", followers: 44500000, likes: 1100000000, verified: true },
  { username: "dominos", nickname: "Domino's Pizza", avatar: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80", followers: 2800000, likes: 32000000, verified: true },
  { username: "riyaz.14", nickname: "Riyaz Aly", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80", followers: 46100000, likes: 2100000000, verified: true },
  { username: "mr_faisu_07", nickname: "Faisal Shaikh", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", followers: 33200000, likes: 1900000000, verified: true },
  { username: "jannatzubair29", nickname: "Jannat Zubair", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80", followers: 40800000, likes: 1800000000, verified: true },
  { username: "sarah_smith", nickname: "Sarah Smith", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80", followers: 210000, likes: 2800000, verified: false },
  { username: "emily_walker", nickname: "Emily Walker", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80", followers: 430000, likes: 5900000, verified: false },
  { username: "jessica.clark", nickname: "Jessica Clark", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80", followers: 185000, likes: 2100000, verified: false },
  { username: "michael_brown", nickname: "Michael Brown", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80", followers: 520000, likes: 6400000, verified: false },
  { username: "david_miller", nickname: "David Miller", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", followers: 340000, likes: 3900000, verified: false },
  { username: "chris_evans", nickname: "Chris Evans", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80", followers: 16500000, likes: 152000000, verified: true }
];

// Direct typo / alias mapping for user's explicit examples & common typing slips
const typoAliases = {
  'raush': 'roshan',
  'raushan': 'roshan',
  'roushan': 'roshan',
  'rosh': 'roshan',
  'roshn': 'roshan',
  'aple': 'apple',
  'appl': 'apple',
  'applr': 'apple',
  'appel': 'apple',
  'samsng': 'samsung',
  'samsun': 'samsung',
  'samung': 'samsung',
  'smsung': 'samsung',
  'mrbest': 'mrbeast',
  'mrbeat': 'mrbeast',
  'mrbestt': 'mrbeast',
  'beast': 'mrbeast',
  'khabi': 'khaby.lame',
  'khaby': 'khaby.lame',
  'khabilame': 'khaby.lame',
  'charl': 'charlidamelio',
  'charli': 'charlidamelio',
  'charlie': 'charlidamelio',
  'bella': 'bellapoarch',
  'bellapoarc': 'bellapoarch',
  'adison': 'addisonre',
  'addison': 'addisonre',
  'addisonrae': 'addisonre',
  'speed': 'ishowspeed',
  'spead': 'ishowspeed',
  'ishow': 'ishowspeed',
  'kai': 'kai_cenat',
  'kaicenat': 'kai_cenat',
  'adin': 'adinross',
  'ronaldo': 'cristiano',
  'cr7': 'cristiano',
  'cristianoronaldo': 'cristiano',
  'messi': 'leomessi',
  'lionelmessi': 'leomessi',
  'neymar': 'neymarjr',
  'mbappe': 'k.mbappe',
  'mbape': 'k.mbappe',
  'haaland': 'erling.haaland',
  'haland': 'erling.haaland',
  'nik': 'nike',
  'adida': 'adidas',
  'netfix': 'netflix',
  'netflx': 'netflix',
  'gogle': 'google',
  'googl': 'google',
  'microsft': 'microsoft',
  'microsof': 'microsoft',
  'playstatn': 'playstation',
  'playstaton': 'playstation',
  'starbuks': 'starbucks',
  'starbuck': 'starbucks',
  'macdonald': 'mcdonalds',
  'macdonalds': 'mcdonalds',
  'mcdonald': 'mcdonalds'
};

const LUXURY_THEMES = [
  {
    id: 'metal-gold',
    name: 'Metal Gold',
    subtitle: 'Classic Gold',
    gradient: 'linear-gradient(135deg, #e67e00 0%, #b85d00 45%, #6d3200 100%)',
    cardGradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 35%, #92400e 75%, #451a03 100%)',
    cardShadow: '0 12px 32px rgba(184, 93, 0, 0.35), 0 2px 8px rgba(0, 0, 0, 0.25)',
    accentColor: '#f59e0b',
    textColor: '#ffffff',
    subTextColor: 'rgba(255, 255, 255, 0.85)',
    dividerColor: 'rgba(255, 255, 255, 0.18)',
    pageBg: 'linear-gradient(180deg, #fffbeb 0%, #ffffff 360px)',
    btnGradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)',
    btnShadow: '0 4px 16px rgba(217, 119, 6, 0.4)',
    btnTextColor: '#ffffff',
    isGlitter: false
  },
  {
    id: 'ultra-platinum',
    name: 'Ultra Platinum',
    subtitle: 'Ultra Mirror',
    gradient: 'linear-gradient(135deg, #e2e8f0 0%, #94a3b8 35%, #475569 70%, #1e293b 100%)',
    cardGradient: 'linear-gradient(135deg, #94a3b8 0%, #475569 35%, #1e293b 75%, #0f172a 100%)',
    cardShadow: '0 12px 32px rgba(30, 41, 59, 0.35), 0 2px 8px rgba(0, 0, 0, 0.25)',
    accentColor: '#38bdf8',
    textColor: '#ffffff',
    subTextColor: 'rgba(255, 255, 255, 0.85)',
    dividerColor: 'rgba(255, 255, 255, 0.18)',
    pageBg: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 360px)',
    btnGradient: 'linear-gradient(135deg, #475569 0%, #334155 50%, #1e293b 100%)',
    btnShadow: '0 4px 16px rgba(30, 41, 59, 0.35)',
    btnTextColor: '#ffffff',
    isGlitter: false
  },
  {
    id: 'rose-gold',
    name: 'Rose Gold',
    subtitle: 'Rose Metal',
    gradient: 'linear-gradient(135deg, #fb7185 0%, #e11d48 40%, #881337 75%, #4c0519 100%)',
    cardGradient: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 35%, #881337 75%, #4c0519 100%)',
    cardShadow: '0 12px 32px rgba(225, 29, 72, 0.35), 0 2px 8px rgba(0, 0, 0, 0.25)',
    accentColor: '#fb7185',
    textColor: '#ffffff',
    subTextColor: 'rgba(255, 255, 255, 0.85)',
    dividerColor: 'rgba(255, 255, 255, 0.18)',
    pageBg: 'linear-gradient(180deg, #fff1f2 0%, #ffffff 360px)',
    btnGradient: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
    btnShadow: '0 4px 16px rgba(225, 29, 72, 0.4)',
    btnTextColor: '#ffffff',
    isGlitter: false
  },
  {
    id: 'space-grey',
    name: 'Space Grey',
    subtitle: 'Titanium',
    gradient: 'linear-gradient(135deg, #64748b 0%, #334155 45%, #1e293b 80%, #0f172a 100%)',
    cardGradient: 'linear-gradient(135deg, #475569 0%, #334155 40%, #1e293b 75%, #0f172a 100%)',
    cardShadow: '0 12px 32px rgba(15, 23, 42, 0.4), 0 2px 8px rgba(0, 0, 0, 0.25)',
    accentColor: '#94a3b8',
    textColor: '#ffffff',
    subTextColor: 'rgba(255, 255, 255, 0.85)',
    dividerColor: 'rgba(255, 255, 255, 0.18)',
    pageBg: 'linear-gradient(180deg, #f1f5f9 0%, #ffffff 360px)',
    btnGradient: 'linear-gradient(135deg, #334155 0%, #1e293b 100%)',
    btnShadow: '0 4px 16px rgba(15, 23, 42, 0.35)',
    btnTextColor: '#ffffff',
    isGlitter: false
  },
  {
    id: 'electric-blue',
    name: 'Electric Blue',
    subtitle: 'Electric Neon',
    gradient: 'linear-gradient(135deg, #00d2ff 0%, #0077b6 45%, #4338ca 100%)',
    cardGradient: 'linear-gradient(135deg, #00d2ff 0%, #0077b6 40%, #312e81 80%, #1e1b4b 100%)',
    cardShadow: '0 12px 32px rgba(0, 119, 182, 0.35), 0 2px 8px rgba(0, 0, 0, 0.25)',
    accentColor: '#00d2ff',
    textColor: '#ffffff',
    subTextColor: 'rgba(255, 255, 255, 0.85)',
    dividerColor: 'rgba(255, 255, 255, 0.18)',
    pageBg: 'linear-gradient(180deg, #f0f7ff 0%, #ffffff 360px)',
    btnGradient: 'linear-gradient(135deg, #00b4d8 0%, #0077b6 50%, #4338ca 100%)',
    btnShadow: '0 4px 16px rgba(0, 119, 182, 0.4)',
    btnTextColor: '#ffffff',
    isGlitter: false
  },
  {
    id: 'emerald-green',
    name: 'Emerald Green',
    subtitle: 'Royal Jade',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 40%, #064e3b 80%, #022c22 100%)',
    cardGradient: 'linear-gradient(135deg, #10b981 0%, #059669 40%, #064e3b 75%, #022c22 100%)',
    cardShadow: '0 12px 32px rgba(5, 150, 105, 0.35), 0 2px 8px rgba(0, 0, 0, 0.25)',
    accentColor: '#34d399',
    textColor: '#ffffff',
    subTextColor: 'rgba(255, 255, 255, 0.85)',
    dividerColor: 'rgba(255, 255, 255, 0.18)',
    pageBg: 'linear-gradient(180deg, #f0fdf4 0%, #ffffff 360px)',
    btnGradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    btnShadow: '0 4px 16px rgba(5, 150, 105, 0.4)',
    btnTextColor: '#ffffff',
    isGlitter: false
  },
  {
    id: 'obsidian-noir',
    name: 'Obsidian Noir',
    subtitle: 'Stealth Black',
    gradient: 'linear-gradient(135deg, #262626 0%, #171717 50%, #0a0a0a 100%)',
    cardGradient: 'linear-gradient(135deg, #262626 0%, #171717 50%, #0a0a0a 100%)',
    cardShadow: '0 12px 32px rgba(0, 0, 0, 0.45), 0 2px 8px rgba(0, 0, 0, 0.3)',
    accentColor: '#fe2c55',
    textColor: '#ffffff',
    subTextColor: 'rgba(255, 255, 255, 0.85)',
    dividerColor: 'rgba(255, 255, 255, 0.18)',
    pageBg: 'linear-gradient(180deg, #fafafa 0%, #ffffff 360px)',
    btnGradient: 'linear-gradient(135deg, #fe2c55 0%, #e02449 100%)',
    btnShadow: '0 4px 16px rgba(254, 44, 85, 0.35)',
    btnTextColor: '#ffffff',
    isGlitter: false
  },
  {
    id: 'glitter-shimmer',
    name: 'Glitter Shimmer',
    subtitle: 'Glitter ✨',
    gradient: 'linear-gradient(135deg, #c084fc 0%, #818cf8 40%, #38bdf8 80%, #06b6d4 100%)',
    cardGradient: 'linear-gradient(135deg, #c084fc 0%, #818cf8 35%, #0284c7 75%, #0c4a6e 100%)',
    cardShadow: '0 12px 32px rgba(129, 140, 248, 0.35), 0 2px 8px rgba(0, 0, 0, 0.25)',
    accentColor: '#38bdf8',
    textColor: '#ffffff',
    subTextColor: 'rgba(255, 255, 255, 0.88)',
    dividerColor: 'rgba(255, 255, 255, 0.2)',
    pageBg: 'linear-gradient(180deg, #faf5ff 0%, #f0f9ff 180px, #ffffff 360px)',
    btnGradient: 'linear-gradient(135deg, #c084fc 0%, #818cf8 45%, #38bdf8 100%)',
    btnShadow: '0 4px 16px rgba(129, 140, 248, 0.4)',
    btnTextColor: '#ffffff',
    isGlitter: true
  },
  {
    id: 'glitter-gold',
    name: 'Glitter Gold',
    subtitle: 'Gold ✨',
    gradient: 'linear-gradient(135deg, #facc15 0%, #eab308 50%, #ca8a04 100%)',
    cardGradient: 'linear-gradient(135deg, #facc15 0%, #eab308 35%, #ca8a04 70%, #78350f 100%)',
    cardShadow: '0 12px 32px rgba(202, 138, 4, 0.35), 0 2px 8px rgba(0, 0, 0, 0.25)',
    accentColor: '#eab308',
    textColor: '#ffffff',
    subTextColor: 'rgba(255, 255, 255, 0.88)',
    dividerColor: 'rgba(255, 255, 255, 0.2)',
    pageBg: 'linear-gradient(180deg, #fefce8 0%, #ffffff 360px)',
    btnGradient: 'linear-gradient(135deg, #facc15 0%, #eab308 50%, #ca8a04 100%)',
    btnShadow: '0 4px 16px rgba(202, 138, 4, 0.4)',
    btnTextColor: '#ffffff',
    isGlitter: true
  }
];

function getLuxuryTheme(id) {
  return LUXURY_THEMES.find(t => t.id === id) || LUXURY_THEMES[7];
}

// Fast Levenshtein distance algorithm for typo matching
function levenshteinDistance(a, b) {
  a = String(a || '').toLowerCase();
  b = String(b || '').toLowerCase();
  const m = a.length;
  const n = b.length;
  if (!m) return n;
  if (!n) return m;

  const row = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    let prev = i - 1;
    row[0] = i;
    for (let j = 1; j <= n; j++) {
      const cur = a[i - 1] === b[j - 1] ? prev : Math.min(prev, row[j], row[j - 1]) + 1;
      prev = row[j];
      row[j] = cur;
    }
  }
  return row[n];
}

// Find the closest creator profile from 100+ database with intelligent typo tolerance
function findClosestCreator(raw) {
  if (!raw) return null;
  const clean = cleanHandle(raw).toLowerCase();
  if (!clean) return null;

  // 1. Direct typo / alias check (e.g. raush -> roshan, aple -> apple, samsng -> samsung)
  if (typoAliases[clean]) {
    const aliasTarget = typoAliases[clean].toLowerCase();
    const found = CREATOR_DATABASE.find(c => c.username.toLowerCase() === aliasTarget);
    if (found) return found;
  }

  // 2. Exact username match
  const exactUser = CREATOR_DATABASE.find(c => c.username.toLowerCase() === clean);
  if (exactUser) return exactUser;

  // 3. Exact nickname match
  const exactNick = CREATOR_DATABASE.find(c => c.nickname.toLowerCase() === clean);
  if (exactNick) return exactNick;

  // 4. Prefix / Substring match for fast autocomplete feel
  if (clean.length >= 3) {
    const prefixMatch = CREATOR_DATABASE.find(c => 
      c.username.toLowerCase().startsWith(clean) || 
      c.nickname.toLowerCase().startsWith(clean)
    );
    if (prefixMatch) return prefixMatch;
  }

  // 5. Intelligent Fuzzy Distance & Score Ranking across 100+ profiles
  let bestProfile = null;
  let bestScore = -Infinity;

  for (const c of CREATOR_DATABASE) {
    const u = c.username.toLowerCase();
    const n = c.nickname.toLowerCase();

    const distU = levenshteinDistance(clean, u);
    const distN = levenshteinDistance(clean, n);
    const minDist = Math.min(distU, distN);

    const maxLen = Math.max(clean.length, u.length);
    let similarity = 1 - (minDist / maxLen);

    // Boost score if initial characters match
    if (u[0] === clean[0] || n[0] === clean[0]) similarity += 0.15;
    if (clean.length >= 2 && (u.startsWith(clean.slice(0, 2)) || n.startsWith(clean.slice(0, 2)))) {
      similarity += 0.2;
    }
    // Boost if substring is contained
    if (u.includes(clean) || clean.includes(u)) similarity += 0.25;

    if (similarity > bestScore) {
      bestScore = similarity;
      bestProfile = c;
    }
  }

  if (bestProfile && (bestScore >= 0.65 || levenshteinDistance(clean, bestProfile.username.toLowerCase()) <= 2)) {
    return bestProfile;
  }

  return getRandomProfile(clean);
}

function getRandomProfile(clean) {
  let hash = 0;
  for (let i = 0; i < clean.length; i++) {
    hash = (hash * 31 + clean.charCodeAt(i)) & 0xffffff;
  }
  hash = Math.abs(hash);

  const avatar = randomAvatars[hash % randomAvatars.length];
  const followers = 15000 + (hash % 650000);
  const likes = followers * 6 + (hash % 120000);
  const nickname = clean.charAt(0).toUpperCase() + clean.slice(1);

  return {
    username: clean,
    nickname: nickname,
    avatar: avatar,
    followers: followers,
    likes: likes,
    verified: false
  };
}

const profileCache = new Map();
let debounceTimer = null;
let currentAbortController = null;

function animateNumber({ startVal, endVal, duration, onUpdate, onDone }) {
  const startTime = performance.now();
  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = startVal - (startVal - endVal) * ease;
    onUpdate(current, progress);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      onUpdate(endVal, 1);
      if (onDone) onDone();
    }
  }
  requestAnimationFrame(step);
}

function set(s) {
  Object.assign(state, s);
  render();
}

function openExchange() {
  set({
    screen: 'exchange',
    username: '',
    selected: 0,
    profile: null,
    profileLoading: false,
    profileError: null,
    showExchangeModal: false
  });
}

function openToolbox() {
  set({ screen: 'toolbox' });
}

function home() {
  const theme = getLuxuryTheme(state.toolbox.theme || 'glitter-shimmer');
  return `
    <!-- Topbar: < arrow opens Toolbox, LIVE rewards centered, X does nothing -->
    <header class="home-topbar">
      <button class="icon" onclick="openToolbox()" title="Settings">‹</button>
      <h2 class="home-title">LIVE rewards</h2>
      <button class="icon home-close-btn" onclick="/* do nothing as requested */" title="Close">×</button>
    </header>
    
    <!-- Modern TikTok LIVE Rewards Container Card with Dynamic Theme -->
    <div class="rewards-card-container">
      <div class="rewards-dark-card ${theme.isGlitter ? 'has-glitter' : ''}" style="background: ${theme.cardGradient}; box-shadow: ${theme.cardShadow};">
        <svg class="rewards-watermark" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.901 2.868 2.893 2.893 0 0 1-2.892-2.892 2.896 2.896 0 0 1 2.892-2.894c.277 0 .542.04.794.113V9.38a6.34 6.34 0 0 0-.794-.052 6.353 6.353 0 0 0-6.35 6.35 6.353 6.353 0 0 0 6.35 6.35 6.354 6.354 0 0 0 6.349-6.35V8.847a8.214 8.214 0 0 0 4.767 1.503V6.905c-.34 0-.677-.074-.995-.219z"/>
        </svg>

        <!-- Profile & Level 50 Apex Section -->
        <div class="rewards-profile-section">
          <div class="rewards-profile-avatar-wrap">
            <img
              src="/assets/apex_profile.jpg"
              alt="Apex"
              class="rewards-profile-avatar"
              onerror="this.onerror=null;this.src='/assets/avatar.jpg'"
            />
          </div>
          <div class="rewards-profile-info">
            <div class="rewards-profile-name" style="color:${theme.textColor};text-shadow:0 1px 3px rgba(0,0,0,0.45);">Apex</div>
            <div class="rewards-level-badge" title="Apex Gifter Level 50">
              <svg width="19" height="19" viewBox="0 0 100 100" fill="none" style="display:inline-block;vertical-align:middle;flex-shrink:0;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.35));">
                <defs>
                  <linearGradient id="goldRimScript" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stop-color="#FFF2A3" />
                    <stop offset="40%" stop-color="#FFAA00" />
                    <stop offset="70%" stop-color="#D47800" />
                    <stop offset="100%" stop-color="#FFD24D" />
                  </linearGradient>
                  <linearGradient id="centerAmberScript" x1="50" y1="38" x2="50" y2="72" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stop-color="#FFF176" />
                    <stop offset="45%" stop-color="#FFB300" />
                    <stop offset="100%" stop-color="#FF8F00" />
                  </linearGradient>
                  <linearGradient id="facetTopScript" x1="50" y1="4" x2="50" y2="38" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stop-color="#F5D0FE" />
                    <stop offset="100%" stop-color="#E879F9" />
                  </linearGradient>
                  <linearGradient id="facetTopLeftScript" x1="8" y1="26" x2="31" y2="38" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stop-color="#C084FC" />
                    <stop offset="100%" stop-color="#9333EA" />
                  </linearGradient>
                  <linearGradient id="facetTopRightScript" x1="92" y1="26" x2="69" y2="38" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stop-color="#E9D5FF" />
                    <stop offset="100%" stop-color="#A855F7" />
                  </linearGradient>
                  <linearGradient id="facetBottomLeftScript" x1="8" y1="74" x2="50" y2="72" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stop-color="#F43F5E" />
                    <stop offset="100%" stop-color="#BE123C" />
                  </linearGradient>
                  <linearGradient id="facetBottomRightScript" x1="92" y1="74" x2="50" y2="72" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stop-color="#FB7185" />
                    <stop offset="100%" stop-color="#E11D48" />
                  </linearGradient>
                </defs>
                <polygon points="50,6 31,38 69,38" fill="url(#facetTopScript)" />
                <polygon points="50,6 8,26 31,38" fill="url(#facetTopLeftScript)" />
                <polygon points="50,6 92,26 69,38" fill="url(#facetTopRightScript)" />
                <polygon points="8,26 8,74 31,38" fill="#9333EA" />
                <polygon points="92,26 92,74 69,38" fill="#D946EF" />
                <polygon points="31,38 69,38 50,72" fill="url(#centerAmberScript)" />
                <polygon points="8,74 31,38 50,72" fill="url(#facetBottomLeftScript)" />
                <polygon points="92,74 69,38 50,72" fill="url(#facetBottomRightScript)" />
                <polygon points="8,74 50,72 50,94" fill="url(#facetBottomLeftScript)" />
                <polygon points="92,74 50,72 50,94" fill="url(#facetBottomRightScript)" />
                <polygon points="50,6 92,26 92,74 50,94 8,74 8,26" fill="none" stroke="url(#goldRimScript)" stroke-width="4.5" stroke-linejoin="round" />
                <polygon points="31,38 69,38 50,72" fill="none" stroke="url(#goldRimScript)" stroke-width="3" stroke-linejoin="round" />
                <line x1="50" y1="6" x2="31" y2="38" stroke="url(#goldRimScript)" stroke-width="3" />
                <line x1="50" y1="6" x2="69" y2="38" stroke="url(#goldRimScript)" stroke-width="3" />
                <line x1="8" y1="26" x2="31" y2="38" stroke="url(#goldRimScript)" stroke-width="3" />
                <line x1="92" y1="26" x2="69" y2="38" stroke="url(#goldRimScript)" stroke-width="3" />
                <line x1="8" y1="74" x2="31" y2="38" stroke="url(#goldRimScript)" stroke-width="3" />
                <line x1="92" y1="74" x2="69" y2="38" stroke="url(#goldRimScript)" stroke-width="3" />
                <line x1="8" y1="74" x2="50" y2="72" stroke="url(#goldRimScript)" stroke-width="3" />
                <line x1="92" y1="74" x2="50" y2="72" stroke="url(#goldRimScript)" stroke-width="3" />
                <line x1="50" y1="72" x2="50" y2="94" stroke="url(#goldRimScript)" stroke-width="3" />
              </svg>
              <span class="rewards-level-badge-num">50</span>
            </div>
          </div>
        </div>

        <div class="rewards-card-header" style="color:${theme.subTextColor};text-shadow:0 1px 2px rgba(0,0,0,0.3);">LIVE rewards</div>

        <div class="rewards-amount-row">
          <div class="rewards-amount-left">
            <span class="rewards-cur-badge" style="color:${theme.textColor};text-shadow:0 1px 3px rgba(0,0,0,0.45);">${state.toolbox.currency || 'USD'}</span>
            <span class="rewards-big-num" id="homeBigBalance" style="color:${theme.textColor};text-shadow:0 1px 3px rgba(0,0,0,0.45);">${fmt(state.balance)}</span>
          </div>
        </div>

        <div class="rewards-card-divider" style="background:${theme.dividerColor};"></div>

        <div class="rewards-coins-section" onclick="openExchange()">
          <div class="rewards-coins-head">
            <span class="rewards-coins-label" style="color:${theme.subTextColor};text-shadow:0 1px 2px rgba(0,0,0,0.3);">Coins</span>
            <span class="chevron" style="color:${theme.subTextColor};">›</span>
          </div>
          <div class="rewards-coins-val">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style="display:inline-block;vertical-align:middle;flex-shrink:0;">
              <circle cx="12" cy="12" r="11" fill="url(#ttCoinGradHomeScript)" />
              <circle cx="12" cy="12" r="9.5" stroke="#FFA700" stroke-width="1" opacity="0.6" fill="none" />
              <path d="M15.4 7.6a3.6 3.6 0 0 1-2.1-.65v5.15a3.1 3.1 0 1 1-2.6-3.07v1.98a1.2 1.2 0 1 0 1.2 1.19V4.5h1.75a3.6 3.6 0 0 0 2.75 2.75v1.85z" fill="#FFFFFF"/>
              <defs>
                <linearGradient id="ttCoinGradHomeScript" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#FFC83B"/>
                  <stop offset="1" stop-color="#FF9800"/>
                </linearGradient>
              </defs>
            </svg>
            <span class="rewards-coins-count" style="color:${theme.textColor};text-shadow:0 1px 3px rgba(0,0,0,0.45);">${state.coins ? coinFmt(state.coins) : '0'}</span>
          </div>
        </div>
      </div>
    </div>
    
    <section class="actions">
      <!-- Both Exchange and Withdraw open the same Exchange page as requested -->
      <button class="btn primary" onclick="openExchange()" style="background:${theme.btnGradient};box-shadow:${theme.btnShadow};color:${theme.btnTextColor};border:none;">${state.toolbox.walletMode === 'transfer' ? 'Transfer' : state.toolbox.walletMode === 'exchange' ? 'Exchange' : 'Recharge'}</button>
      <button class="btn secondary" onclick="openExchange()">Withdraw</button>
      <div class="limit-row">
        <span class="limit-label">Daily withdrawal limit (Remain/Total)</span>
        <span class="limit-value">${moneyFmt(1000)}/${moneyFmt(1000)}</span>
      </div>
    </section>
    
    <section class="section">
      <div class="section-head">
        <h2>Transactions</h2>
        <span class="month">Sep 2026</span>
      </div>
      ${state.transactions.length ? state.transactions.map(tx => `
        <div class="tx">
          <div class="txleft">
            ${tx.avatar ? `
              <img src="${esc(tx.avatar)}" class="avatar-img" alt="${esc(tx.name)}" referrerpolicy="no-referrer" onerror="this.onerror=null;this.outerHTML='<div class=\\'avatar\\'>🪙</div>'">
            ` : `
              <div class="avatar">🪙</div>
            `}
            <div>
              <div class="txname">${esc(tx.name)}</div>
              <div class="txsub">Sent ${coinFmt(tx.coins)} Coins to @${esc(tx.handle || tx.name)}</div>
              <div class="txtime">${esc(tx.time)}</div>
            </div>
          </div>
          <div class="negative">-${moneyFmt(tx.amount)}</div>
        </div>
      `).join('') : `<div class="empty">No transactions yet.</div>`}
    </section>
  `;
}

function getFollowerFontSize() {
  const map = { 1: '13px', 2: '16px', 3: '18px', 4: '20px', 5: '22px', 6: '24px' };
  return map[state.toolbox.followerTextSize] || '16px';
}

function renderProfileContainer() {
  const clean = cleanHandle(state.username);
  if (!clean) return '';

  if (state.profileLoading) {
    const s = (state.toolbox.searchLoading.style || 'classic').toLowerCase();
    let spinnerHtml = '<div class="spinner"></div>';
    if (s === 'dots') spinnerHtml = '<div class="loader-dots"><span></span><span></span><span></span></div>';
    else if (s === 'ring') spinnerHtml = '<div class="loader-ring" style="width:24px;height:24px;border-width:3px;"></div>';
    else if (s === 'modern') spinnerHtml = '<div class="loader-modern" style="width:24px;height:24px;border-width:3px;"></div>';
    else if (s === 'squares') spinnerHtml = '<div class="loader-squares" style="width:22px;height:22px;"></div>';

    return `
      <div class="profile-msg loading">
        ${spinnerHtml}
        <div>Connecting to TikTok &amp; fetching profile for <strong>@${esc(clean)}</strong>...</div>
      </div>
    `;
  }

  if (state.profileError) {
    return `
      <div class="profile-msg notfound">
        <span style="font-size:24px">⚠️</span>
        <div>${esc(state.profileError)}</div>
      </div>
    `;
  }

  if (state.profile) {
    const p = state.profile;
    const chipFontSize = getFollowerFontSize();

    return `
      <div class="profile-card">
        <div class="profile-top">
          <div class="pavatar">
            ${p.avatar ? `
              <img src="${esc(p.avatar)}" alt="${esc(p.nickname || p.username)}" referrerpolicy="no-referrer" onerror="this.onerror=null;this.parentElement.innerHTML='<span style=\\'font-size:38px\\'>👤</span>'">
            ` : `
              <span style="font-size:38px">👤</span>
            `}
          </div>
          <div class="pinfo">
            <div class="pname-row">
              <span class="pname" title="${esc(p.nickname || p.username)}">${esc(p.nickname || p.username)}</span>
              ${p.verified ? `<svg class="pbadge" viewBox="0 0 24 24" width="22" height="22" fill="#20d5ec" title="Verified Creator"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.2 14.2l-3.5-3.5 1.4-1.4 2.1 2.1 5.9-5.9 1.4 1.4-7.3 7.3z"/></svg>` : ''}
            </div>
            <div class="puser">@${esc(p.username)}</div>
            <div class="stats-chips">
              <div class="stat-pill" style="font-size:${chipFontSize}">👥 <strong>${numFmt(p.followers)}</strong> Followers</div>
              <div class="stat-pill" style="font-size:${chipFontSize}">❤️ <strong>${numFmt(p.likes)}</strong> Likes</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  return '';
}

function exchange() {
  const canExchange = Boolean(state.username.trim() && state.selected > 0);
  const hasUser = Boolean(state.username.trim());

  return `
    <div class="screen">
      <header class="topbar">
        <button class="icon" onclick="set({ screen: 'home' })">‹</button>
        <h2>Recharge</h2>
        <span class="icon icon-passive" aria-hidden="true" onclick="event.preventDefault(); return false;">?</span>
      </header>
      
      <div class="exchange">
        <div class="big" id="exchangeBalance">${moneyFmt(state.balance)}</div>
        <div class="conversion" id="exchangeCoins">= ${moneyFmt(state.balance)} ( <span class="coin">🪙</span> ${coinFmt(state.coins)} )</div>
        <div class="label" style="margin-top:24px">Available balance to exchange for Coins</div>
        
        <div class="field">
          <label>Creator username</label>
          <div class="handle">
            <b id="handleAt" style="${hasUser ? '' : 'display:none;'}">@</b>
            <input
              id="creatorInput"
              value="${esc(state.username)}"
              placeholder="@your-TikTok Handle"
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
              oninput="onUsernameInput(this.value)"
              onkeydown="if(event.key==='Enter'){event.preventDefault();submitImmediateLookup();}"
            >
            <button
              id="clearUsernameBtn"
              class="clear-btn ${hasUser ? '' : 'hidden'}"
              onclick="clearUsername()"
              title="Clear input"
            >×</button>
          </div>
          
          <div id="profileContainer">
            ${renderProfileContainer()}
          </div>
        </div>
        
        <div class="field">
          <label>Exchange earnings for Coins</label>
          <div class="recharge-grid">
            ${[
              { c: 30, p: 0.34 },
              { c: 350, p: 3.95 },
              { c: 700, p: 7.89 },
              { c: 1400, p: 15.75 },
              { c: 3500, p: 39.35 }
            ].map(item => `
              <button class="recharge-pack ${state.selected === item.c ? 'active' : ''}" onclick="selectPack(${item.c})">
                <div class="recharge-pack-top">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="display:inline-block;vertical-align:middle;flex-shrink:0;">
                    <circle cx="12" cy="12" r="11" fill="url(#ttCoinGradScript)" />
                    <circle cx="12" cy="12" r="9.5" stroke="#FFA700" stroke-width="1" opacity="0.6" fill="none" />
                    <path d="M15.4 7.6a3.6 3.6 0 0 1-2.1-.65v5.15a3.1 3.1 0 1 1-2.6-3.07v1.98a1.2 1.2 0 1 0 1.2 1.19V4.5h1.75a3.6 3.6 0 0 0 2.75 2.75v1.85z" fill="#FFFFFF"/>
                    <defs>
                      <linearGradient id="ttCoinGradScript" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FFC83B"/>
                        <stop offset="1" stop-color="#FF9800"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <span class="recharge-pack-coins">${coinFmt(item.c)}</span>
                </div>
                <div class="recharge-pack-price">€${fmt(item.p)}</div>
              </button>
            `).join('')}

            <button class="recharge-pack recharge-custom-pack ${[30, 350, 700, 1400, 3500].includes(state.selected) || !state.selected ? '' : 'active'}" onclick="openCustom()">
              ${[30, 350, 700, 1400, 3500].includes(state.selected) || !state.selected ? `
                <span class="recharge-custom-label">Custom</span>
              ` : `
                <div class="recharge-pack-top">
                  <span style="font-size:16px;">🪙</span>
                  <span class="recharge-pack-coins">${coinFmt(state.selected)}</span>
                </div>
                <div class="recharge-pack-price">€${fmt((state.selected * 39.35) / 3500)}</div>
              `}
            </button>
          </div>
          
          ${state.selected ? `<div class="exchange-preview">${coinFmt(state.selected)} Coins (≈ €${fmt((state.selected * 39.35) / 3500)})</div>` : ''}
          
          <div class="policy" onclick="alert('Virtual Items Policy')">Virtual Items Policy</div>
        </div>
      </div>
      
      <div class="sticky">
        <button
          id="exchangeSubmitBtn"
          class="btn primary"
          style="opacity: ${canExchange ? '1' : '0.45'}"
          ${canExchange ? '' : 'disabled'}
          onclick="doExchange()"
        >Recharge</button>
      </div>

      <!-- Confirmation Popup Modal (Image 4) -->
      ${state.showExchangeModal ? exchangeConfirmModal() : ''}
    </div>
  `;
}

function exchangeConfirmModal() {
  const clean = cleanHandle(state.username);
  const amountStr = moneyFmt(dollars(state.selected));

  return `
    <div class="confirm-modal-back" id="confirmModalBack" onclick="if(event.target===this)closeExchangeModal()">
      <div class="confirm-modal-card">
        <button class="confirm-modal-close" onclick="closeExchangeModal()">×</button>
        
        <div class="confirm-modal-icon-wrap">
          <div class="confirm-coin-badge">
            <svg class="orbit-arrow orbit-left" viewBox="0 0 24 24" width="22" height="22">
              <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0 0 20 12c0-4.42-3.58-8-8-8z" fill="#20d5ec"/>
            </svg>
            <div class="confirm-coin-circle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff">
                <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.901 2.868 2.893 2.893 0 0 1-2.892-2.892 2.896 2.896 0 0 1 2.892-2.894c.277 0 .542.04.794.113V9.38a6.34 6.34 0 0 0-.794-.052 6.353 6.353 0 0 0-6.35 6.35 6.353 6.353 0 0 0 6.35 6.35 6.354 6.354 0 0 0 6.349-6.35V8.847a8.214 8.214 0 0 0 4.767 1.503V6.905c-.34 0-.677-.074-.995-.219z"/>
              </svg>
            </div>
            <svg class="orbit-arrow orbit-right" viewBox="0 0 24 24" width="22" height="22">
              <path d="M12 20v3l4-4-4-4v3c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 0 0 4 12c0 4.42 3.58 8 8 8z" fill="#ff6699"/>
            </svg>
          </div>
        </div>
        
        <h3 class="confirm-modal-title">Complete recharge?</h3>
        <p class="confirm-modal-desc">
          ${amountStr} will be deducted from LIVE rewards balance and sent to @${esc(clean)}
        </p>
        
        <div class="confirm-modal-actions">
          <button class="confirm-btn-back" onclick="closeExchangeModal()">Go back</button>
          <button class="confirm-btn-exchange" onclick="confirmAndExecuteExchange()">Recharge</button>
        </div>
      </div>
    </div>
  `;
}

function selectPack(amount) {
  state.selected = (state.selected === amount) ? 0 : amount;
  render();
}

function onUsernameInput(val) {
  let processed = val;
  if (state.toolbox.autoAtRemove && processed.startsWith('@')) {
    processed = processed.replace(/^@+/, '');
    const input = document.getElementById('creatorInput');
    if (input) input.value = processed;
  }

  state.username = processed;
  const clean = cleanHandle(processed);
  const hasUser = Boolean(processed.trim());

  const handleAt = document.getElementById('handleAt');
  if (handleAt) handleAt.style.display = hasUser ? 'inline' : 'none';

  const clearBtn = document.getElementById('clearUsernameBtn');
  if (clearBtn) clearBtn.classList.toggle('hidden', !hasUser);

  updateExchangeButtonState();

  if (debounceTimer) clearTimeout(debounceTimer);
  if (currentAbortController) {
    currentAbortController.abort();
    currentAbortController = null;
  }

  if (!clean) {
    state.profile = null;
    state.profileLoading = false;
    state.profileError = null;
    updateProfileUI();
    return;
  }

  const cacheKey = clean.toLowerCase();
  if (profileCache.has(cacheKey)) {
    const cached = profileCache.get(cacheKey);
    state.profile = cached.profile;
    state.profileError = cached.error;
    state.profileLoading = false;
    updateProfileUI();
    updateExchangeButtonState();
    return;
  }

  state.profile = null;
  state.profileLoading = true;
  state.profileError = null;
  updateProfileUI();

  const searchDelay = state.toolbox.searchLoading.enabled ? Math.min(state.toolbox.searchLoading.duration * 400, 1000) : 400;

  debounceTimer = setTimeout(() => {
    fetchProfile(clean);
  }, searchDelay);
}

function submitImmediateLookup() {
  const clean = cleanHandle(state.username);
  if (!clean) return;
  if (debounceTimer) clearTimeout(debounceTimer);
  fetchProfile(clean);
}

async function fetchProfile(clean) {
  if (currentAbortController) currentAbortController.abort();
  currentAbortController = new AbortController();

  state.profileLoading = true;
  state.profileError = null;
  updateProfileUI();

  const cleanKey = clean.toLowerCase();

  // If input is an explicit typo alias or exact match from our 100+ database, use it immediately
  if (typoAliases[cleanKey]) {
    const matched = findClosestCreator(clean);
    if (matched) {
      profileCache.set(cleanKey, { profile: matched, error: null });
      const currentClean = cleanHandle(state.username).toLowerCase();
      if (currentClean === cleanKey) {
        state.profile = matched;
        state.profileLoading = false;
        state.profileError = null;
        updateProfileUI();
        updateExchangeButtonState();
      }
      return;
    }
  }

  try {
    const url = `https://api.nftoken.info/api/tiktok/profile/${encodeURIComponent(clean)}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': '*/*' },
      signal: currentAbortController.signal
    });

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }

    const data = await res.json();
    const currentClean = cleanHandle(state.username).toLowerCase();

    if (data.success && data.data && data.data.username) {
      profileCache.set(clean.toLowerCase(), { profile: data.data, error: null });
      if (currentClean === clean.toLowerCase()) {
        state.profile = data.data;
        state.profileLoading = false;
        state.profileError = null;
        updateProfileUI();
        updateExchangeButtonState();
      }
    } else {
      handleProfileNotFound(clean, data.error);
    }
  } catch (err) {
    if (err.name === 'AbortError') return;
    handleProfileNotFound(clean, null);
  }
}

function handleProfileNotFound(clean, errorMsg) {
  const currentClean = cleanHandle(state.username).toLowerCase();
  if (currentClean !== clean.toLowerCase()) return;

  // Find closest matching creator from our 100+ creator database (e.g. raush -> roshan, aple -> apple, samsng -> samsung)
  const closest = findClosestCreator(clean) || getRandomProfile(clean);
  profileCache.set(clean.toLowerCase(), { profile: closest, error: null });
  state.profile = closest;
  state.profileLoading = false;
  state.profileError = null;
  updateProfileUI();
  updateExchangeButtonState();
}

function updateProfileUI() {
  const container = document.getElementById('profileContainer');
  if (container) {
    container.innerHTML = renderProfileContainer();
  }
}

function updateExchangeButtonState() {
  const btn = document.getElementById('exchangeSubmitBtn');
  if (btn) {
    const isValid = Boolean(state.username.trim() && state.selected > 0);
    btn.style.opacity = isValid ? '1' : '0.45';
    btn.disabled = !isValid;
  }
}

function clearUsername() {
  state.username = '';
  state.profile = null;
  state.profileLoading = false;
  state.profileError = null;
  if (debounceTimer) clearTimeout(debounceTimer);
  if (currentAbortController) currentAbortController.abort();

  const input = document.getElementById('creatorInput');
  if (input) {
    input.value = '';
    input.focus();
  }
  const handleAt = document.getElementById('handleAt');
  if (handleAt) handleAt.style.display = 'none';

  const clearBtn = document.getElementById('clearUsernameBtn');
  if (clearBtn) clearBtn.classList.add('hidden');

  updateProfileUI();
  updateExchangeButtonState();
}

function customSheet() {
  return `
    <div class="sheet-back" onclick="if(event.target===this)closeCustom()">
      <div class="sheet">
        <div class="sheet-head">
          <h2>Custom</h2>
          <button onclick="closeCustom()">×</button>
        </div>
        <div class="number">
          <div class="caption">Number of Coins</div>
          <div class="number-row">
            <span>🪙</span>&nbsp;<span id="num">${coinFmt(state.selected || 0)}</span>
            <span class="all" onclick="setCustomAll()">All</span>
          </div>
          <div class="amount" id="customAmount">${moneyFmt(dollars(state.selected || 0))}</div>
          <div class="keypad">
            ${['1', '2', '3', '⌫', '4', '5', '6', '000', '7', '8', '9', '0'].map(k => `
              <button class="key" onclick="key('${k}')">${k}</button>
            `).join('')}
          </div>
          <div class="policy" onclick="alert('Virtual Items Policy')">Virtual Items Policy</div>
          <div class="total">
            <span>Total</span>
            <strong id="customTotal">${moneyFmt(dollars(state.selected || 0))}</strong>
          </div>
          <button id="customDoneBtn" class="btn primary" style="opacity: ${state.selected ? '1' : '0.45'}" onclick="closeCustom()">Done</button>
        </div>
      </div>
    </div>
  `;
}

function openCustom() {
  document.body.insertAdjacentHTML('beforeend', customSheet());
}

function closeCustom() {
  document.querySelector('.sheet-back')?.remove();
  render();
}

function updateCustomSheetUI() {
  const numEl = document.getElementById('num');
  if (numEl) numEl.textContent = coinFmt(state.selected || 0);

  const amountEl = document.getElementById('customAmount');
  if (amountEl) amountEl.textContent = moneyFmt(dollars(state.selected || 0));

  const totalEl = document.getElementById('customTotal');
  if (totalEl) totalEl.textContent = moneyFmt(dollars(state.selected || 0));

  const doneBtn = document.getElementById('customDoneBtn');
  if (doneBtn) doneBtn.style.opacity = state.selected ? '1' : '0.45';
}

function setCustomAll() {
  state.selected = state.coins;
  updateCustomSheetUI();
}

function key(k) {
  let v = String(state.selected || 0);
  if (k === '⌫') {
    v = v.slice(0, -1);
  } else if (k === '000') {
    v = (v === '0' ? '' : v) + '000';
  } else {
    v = (v === '0' ? '' : v) + k;
  }
  let n = Number(v);
  if (!Number.isFinite(n) || n < 0) n = 0;
  state.selected = Math.min(n, state.coins);
  updateCustomSheetUI();
}

function doExchange() {
  const clean = cleanHandle(state.username);
  if (!clean || !state.selected) {
    return;
  }
  if (state.selected > state.coins) {
    alert('Insufficient coin balance.');
    return;
  }

  // Open Image 4 Confirmation Modal
  openExchangeModal();
}

function openExchangeModal() {
  state.showExchangeModal = true;
  render();
}

function closeExchangeModal() {
  state.showExchangeModal = false;
  render();
}

function confirmAndExecuteExchange() {
  state.showExchangeModal = false;

  const clean = cleanHandle(state.username);
  const amount = dollars(state.selected);
  const startBalance = state.balance;
  const endBalance = startBalance - amount;
  const startCoins = state.coins;
  const endCoins = startCoins - state.selected;

  // Store deduction details for home screen animation (balance is ONLY decreased visually upon returning to Home)
  state.lastDeduction = { startBalance, endBalance, startCoins, endCoins, amount };

  const recipient = state.profile || findClosestCreator(clean) || getRandomProfile(clean);

  const now = new Date();
  state.tx = {
    name: recipient.nickname || recipient.username,
    handle: recipient.username,
    avatar: recipient.avatar || '',
    coins: state.selected,
    amount,
    time: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ', ' + now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  };

  state.transactions.unshift(state.tx);

  // If Payment Loading is enabled, show loader animation for specified duration
  if (state.toolbox.paymentLoading.enabled) {
    showLoadingOverlay('Processing exchange...', state.toolbox.paymentLoading.style, state.toolbox.paymentLoading.duration * 1000, () => {
      state.screen = 'success';
      render();
      showTopNotification();
    });
  } else {
    state.screen = 'success';
    render();
    showTopNotification();
  }
}

function showTopNotification() {
  const notif = document.getElementById('topNotification');
  if (notif) {
    notif.classList.add('show');
    if (state.notificationTimeout) clearTimeout(state.notificationTimeout);
    state.notificationTimeout = setTimeout(() => {
      notif.classList.remove('show');
    }, 4500);
  }
}

function hideTopNotification() {
  const notif = document.getElementById('topNotification');
  if (notif) {
    notif.classList.remove('show');
  }
}

function showLoadingOverlay(text, style, duration, onComplete) {
  const existing = document.getElementById('tempLoaderOverlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.className = 'loader-overlay';
  overlay.id = 'tempLoaderOverlay';

  let loaderHtml = '';
  const s = (style || 'dots').toLowerCase();
  if (s === 'classic') {
    loaderHtml = '<div class="loader-classic"></div>';
  } else if (s === 'modern') {
    loaderHtml = '<div class="loader-modern"></div>';
  } else if (s === 'ring') {
    loaderHtml = '<div class="loader-ring"></div>';
  } else if (s === 'squares') {
    loaderHtml = '<div class="loader-squares"></div>';
  } else {
    // dots default
    loaderHtml = '<div class="loader-dots"><span></span><span></span><span></span></div>';
  }

  overlay.innerHTML = `
    <div class="loader-card">
      ${loaderHtml}
      <div class="loader-text">${esc(text)}</div>
    </div>
  `;
  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.remove();
    if (onComplete) onComplete();
  }, duration);
}

function previewLoadingAnimation(style) {
  showLoadingOverlay('Previewing animation...', style, 2000, () => {});
}

function success() {
  const tx = state.tx;
  const isRedTheme = state.toolbox.exchangeCompleteStyle === 'red';

  return `
    <div class="success">
      <div class="check ${isRedTheme ? 'red-theme' : ''}">✓</div>
      <h1>Exchange completed</h1>
      <h3>You exchanged for 🪙 ${coinFmt(tx.coins)} Coins</h3>
      <div class="details">
        <div class="row">
          <span>Recipient</span>
          <span class="recipient-cell">
            ${tx.avatar ? `
              <img src="${esc(tx.avatar)}" class="recipient-thumb" alt="${esc(tx.name)}" referrerpolicy="no-referrer" onerror="this.style.display='none'">
            ` : ''}
            <span class="recipient-names">
              <strong>${esc(tx.name)}</strong>
              <small>@${esc(tx.handle)}</small>
            </span>
          </span>
        </div>
        <div class="row">
          <span>Coins Exchanged</span>
          <span>🪙 ${coinFmt(tx.coins)} Coins</span>
        </div>
        <div class="row">
          <span>Deducted Amount</span>
          <span>${moneyFmt(tx.amount)}</span>
        </div>
        <div class="row">
          <span>Time</span>
          <span>${esc(tx.time)}</span>
        </div>
        
        <!-- Start gifter level (Image 5 exact design) -->
        <div class="gifter-card">
          <div class="tiktok-tile">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#ffffff">
              <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.901 2.868 2.893 2.893 0 0 1-2.892-2.892 2.896 2.896 0 0 1 2.892-2.894c.277 0 .542.04.794.113V9.38a6.34 6.34 0 0 0-.794-.052 6.353 6.353 0 0 0-6.35 6.35 6.353 6.353 0 0 0 6.35 6.35 6.354 6.354 0 0 0 6.349-6.35V8.847a8.214 8.214 0 0 0 4.767 1.503V6.905c-.34 0-.677-.074-.995-.219z"/>
            </svg>
          </div>
          <div class="gifter-info">
            <h4>Start gifter level</h4>
            <p>Send your first Gift to begin your gifter journey and unlock more rewards as you level up.</p>
          </div>
        </div>
      </div>
      <!-- When returning to home screen, triggers decreasing red countdown animation -->
      <button class="btn ${isRedTheme ? 'primary' : 'green'}" onclick="set({ screen: 'home', animateHome: true })">Go back</button>
    </div>
  `;
}

/* Toolbox Settings Screen (Images 2 & 3) */
function toolbox() {
  const tb = state.toolbox;

  return `
    <div class="screen toolbox-screen">
      <header class="topbar" style="background:#fff;">
        <button class="icon" onclick="set({ screen: 'home' })">‹</button>
        <h2 style="font-size:24px; font-weight:800;">Toolbox</h2>
        <button class="icon" onclick="set({ screen: 'home' })" title="Exit">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
        </button>
      </header>

      <div class="toolbox-body">
        <!-- Available rewards -->
        <div class="toolbox-card">
          <label class="toolbox-label">Available rewards</label>
          <input type="number" step="any" class="toolbox-input" id="tbAvailableRewards" value="${state.balance}">
        </div>

        <!-- Upcoming rewards -->
        <div class="toolbox-card">
          <label class="toolbox-label">Upcoming rewards</label>
          <input type="number" step="any" class="toolbox-input" id="tbUpcomingRewards" value="${state.upcomingBalance}">
        </div>

        <!-- Wallet Mode -->
        <div class="toolbox-card">
          <div class="toolbox-label">Wallet Mode</div>
          <div class="toolbox-sub">Switch between transfer &amp; exchange panels</div>
          <div class="toolbox-btn-group">
            <button class="tb-btn ${tb.walletMode === 'transfer' ? 'active' : ''}" onclick="setToolbox('walletMode', 'transfer')">Mode 1<br><small>Transfer</small></button>
            <button class="tb-btn ${tb.walletMode === 'exchange' ? 'active' : ''}" onclick="setToolbox('walletMode', 'exchange')">Mode 2<br><small>Exchange</small></button>
            <button class="tb-btn ${tb.walletMode === 'coins' ? 'active' : ''}" onclick="setToolbox('walletMode', 'coins')">Mode 3<br><small>Coins</small></button>
          </div>
        </div>

        <!-- Mode 2 — Exchange Complete style -->
        <div class="toolbox-card">
          <div class="toolbox-label">Mode 2 — Exchange Complete style</div>
          <div class="toolbox-sub">Success screen shown after an exchange</div>
          <div class="toolbox-btn-group grid-2">
            <button class="tb-btn ${tb.exchangeCompleteStyle === 'green' ? 'active' : ''}" onclick="setToolbox('exchangeCompleteStyle', 'green')">Green (details)</button>
            <button class="tb-btn ${tb.exchangeCompleteStyle === 'red' ? 'active' : ''}" onclick="setToolbox('exchangeCompleteStyle', 'red')">Red (classic)</button>
          </div>
        </div>

        <!-- Auto @ remove & Random profile for unknown ID -->
        <div class="toolbox-card">
          <div class="toolbox-toggle-row">
            <div>
              <div class="toolbox-label">Auto @ remove</div>
              <div class="toolbox-sub" style="margin-bottom:0;">Automatically remove @ from username input</div>
            </div>
            <label class="ios-switch">
              <input type="checkbox" ${tb.autoAtRemove ? 'checked' : ''} onchange="setToolbox('autoAtRemove', this.checked)">
              <span class="ios-slider"></span>
            </label>
          </div>
          <div class="toolbox-divider"></div>
          <div class="toolbox-toggle-row">
            <div>
              <div class="toolbox-label">Random profile for unknown ID</div>
              <div class="toolbox-sub" style="margin-bottom:0;">When TikTok has no account for the ID, show a random picture and name instead of an error</div>
            </div>
            <label class="ios-switch">
              <input type="checkbox" ${tb.randomProfileForUnknown ? 'checked' : ''} onchange="setToolbox('randomProfileForUnknown', this.checked)">
              <span class="ios-slider"></span>
            </label>
          </div>
        </div>

        <!-- Confirm withdrawal details name -->
        <div class="toolbox-card">
          <div class="toolbox-field-group">
            <label class="toolbox-label">Confirm withdrawal details name</label>
            <div class="toolbox-sub">Rename the withdrawal title shown on all pages</div>
            <input type="text" class="toolbox-input" id="tbWithdrawalName" value="${esc(tb.confirmWithdrawalTitle)}">
          </div>
          <div class="toolbox-field-group">
            <label class="toolbox-label">Transfer details title</label>
            <div class="toolbox-sub">Rename "Transfer details" shown on transaction page</div>
            <input type="text" class="toolbox-input" id="tbTransferTitle" value="${esc(tb.transferDetailsTitle)}">
          </div>
          <div class="toolbox-field-group">
            <label class="toolbox-label">Transfer label</label>
            <div class="toolbox-sub">Rename "LIVE rewards transfer to TikTok"</div>
            <input type="text" class="toolbox-input" id="tbTransferLabel" value="${esc(tb.transferLabel)}">
          </div>
        </div>

        <!-- ✨ Chat & Payment Theme Texture (Revolut Luxury Tiers) -->
        <div class="toolbox-card">
          <div class="toolbox-head-split">
            <div class="toolbox-label">✨ Chat &amp; Payment Theme Texture</div>
            <div class="toolbox-tier-badge">Revolut Luxury Tiers</div>
          </div>
          <div class="toolbox-sub">Select custom luxury gradient card &amp; payment texture</div>

          <div class="theme-grid-3x3">
            ${LUXURY_THEMES.map(t => {
              const isSelected = (tb.theme || 'glitter-shimmer') === t.id;
              return `
                <div class="theme-card-item ${isSelected ? 'active' : ''}" onclick="setToolbox('theme', '${t.id}')">
                  <div class="theme-swatch-box" style="background: ${t.gradient}">
                    ${isSelected ? `
                      <div class="theme-check-badge">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    ` : ''}
                  </div>
                  <div class="theme-card-name">${esc(t.name)}</div>
                  <div class="theme-card-sub">${esc(t.subtitle)}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Currency -->
        <div class="toolbox-card">
          <div class="toolbox-label">Currency</div>
          <div class="toolbox-sub">Select display currency for amounts</div>
          <div class="toolbox-btn-group grid-5">
            ${['USD', 'EUR', 'TRY', 'GBP', 'BRL'].map(cur => {
              const syms = { USD: '$ USD', EUR: '€ EUR', TRY: '₺ TRY', GBP: '£ GBP', BRL: 'R$ BRL' };
              return `<button class="tb-btn ${tb.currency === cur ? 'active' : ''}" onclick="setToolbox('currency', '${cur}')">${syms[cur]}</button>`;
            }).join('')}
          </div>
        </div>

        <!-- Follower text size -->
        <div class="toolbox-card">
          <div class="toolbox-label">Follower text size</div>
          <div class="toolbox-sub">Adjust follower count font size (1-6)</div>
          <div class="toolbox-btn-group grid-6">
            ${[1, 2, 3, 4, 5, 6].map(num => `
              <button class="tb-btn ${tb.followerTextSize === num ? 'active' : ''}" onclick="setToolbox('followerTextSize', ${num})">${num}</button>
            `).join('')}
          </div>
        </div>

        <!-- Payment Loading -->
        <div class="toolbox-card">
          <div class="toolbox-toggle-row">
            <div>
              <div class="toolbox-label">Payment Loading</div>
              <div class="toolbox-sub" style="margin-bottom:0;">Animation after confirm</div>
            </div>
            <label class="ios-switch">
              <input type="checkbox" ${tb.paymentLoading.enabled ? 'checked' : ''} onchange="setToolboxPayment('enabled', this.checked)">
              <span class="ios-slider"></span>
            </label>
          </div>
          <div class="toolbox-btn-group grid-5" style="margin-top:16px;">
            ${['Classic', 'Modern', 'Ring', 'Dots', 'Squares'].map(s => `
              <button class="tb-btn ${tb.paymentLoading.style.toLowerCase() === s.toLowerCase() ? 'active' : ''}" onclick="setToolboxPayment('style', '${s.toLowerCase()}')">${s}</button>
            `).join('')}
          </div>
          <div class="toolbox-sub" style="margin-top:14px; margin-bottom:6px;">Duration</div>
          <div class="toolbox-btn-group grid-5">
            ${[1, 2, 3, 4, 5].map(d => `
              <button class="tb-btn ${tb.paymentLoading.duration === d ? 'active' : ''}" onclick="setToolboxPayment('duration', ${d})">${d}s</button>
            `).join('')}
          </div>
          <div class="tb-link" onclick="previewLoadingAnimation(state.toolbox.paymentLoading.style)">Preview animation</div>
        </div>

        <!-- Search Loading -->
        <div class="toolbox-card">
          <div class="toolbox-toggle-row">
            <div>
              <div class="toolbox-label">Search Loading</div>
              <div class="toolbox-sub" style="margin-bottom:0;">Animation when loading search results</div>
            </div>
            <label class="ios-switch">
              <input type="checkbox" ${tb.searchLoading.enabled ? 'checked' : ''} onchange="setToolboxSearch('enabled', this.checked)">
              <span class="ios-slider"></span>
            </label>
          </div>
          <div class="toolbox-btn-group grid-5" style="margin-top:16px;">
            ${['Classic', 'Modern', 'Ring', 'Dots', 'Squares'].map(s => `
              <button class="tb-btn ${tb.searchLoading.style.toLowerCase() === s.toLowerCase() ? 'active' : ''}" onclick="setToolboxSearch('style', '${s.toLowerCase()}')">${s}</button>
            `).join('')}
          </div>
          <div class="toolbox-sub" style="margin-top:14px; margin-bottom:6px;">Duration</div>
          <div class="toolbox-btn-group grid-5">
            ${[1, 2, 3, 4, 5].map(d => `
              <button class="tb-btn ${tb.searchLoading.duration === d ? 'active' : ''}" onclick="setToolboxSearch('duration', ${d})">${d}s</button>
            `).join('')}
          </div>
          <div class="tb-link" onclick="previewLoadingAnimation(state.toolbox.searchLoading.style)">Preview animation</div>
        </div>

        <!-- Push Notification Preview -->
        <div class="toolbox-card">
          <div class="toolbox-label">Push Notification</div>
          <div class="toolbox-sub">Preview the top "Successfully sent coins to recipient" banner</div>
          <button class="tb-btn" style="width:100%; padding:10px; margin-top:4px;" onclick="showTopNotification()">Show Notification Banner</button>
        </div>

        <!-- Save Button -->
        <div class="toolbox-save-wrap">
          <button class="btn primary toolbox-save-btn" onclick="saveToolbox()">Save</button>
        </div>
      </div>
    </div>
  `;
}

function setToolbox(key, val) {
  state.toolbox[key] = val;
  render();
}

function setToolboxPayment(key, val) {
  state.toolbox.paymentLoading[key] = val;
  render();
}

function setToolboxSearch(key, val) {
  state.toolbox.searchLoading[key] = val;
  render();
}

function saveToolbox() {
  const avail = parseFloat(document.getElementById('tbAvailableRewards')?.value);
  if (!isNaN(avail) && avail >= 0) {
    state.balance = avail;
  }
  const upcoming = parseFloat(document.getElementById('tbUpcomingRewards')?.value);
  if (!isNaN(upcoming) && upcoming >= 0) {
    state.upcomingBalance = upcoming;
  }
  const wTitle = document.getElementById('tbWithdrawalName')?.value;
  if (wTitle) state.toolbox.confirmWithdrawalTitle = wTitle;
  const tTitle = document.getElementById('tbTransferTitle')?.value;
  if (tTitle) state.toolbox.transferDetailsTitle = tTitle;
  const tLabel = document.getElementById('tbTransferLabel')?.value;
  if (tLabel) state.toolbox.transferLabel = tLabel;

  state.screen = 'home';
  render();
}

function render() {
  const root = document.getElementById('app');
  if (!root) return;

  // Render top notification banner container
  let notifEl = document.getElementById('topNotification');
  if (!notifEl) {
    notifEl = document.createElement('div');
    notifEl.className = 'top-notification';
    notifEl.id = 'topNotification';
    notifEl.onclick = hideTopNotification;
    notifEl.innerHTML = `
      <div class="top-notif-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff">
          <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.901 2.868 2.893 2.893 0 0 1-2.892-2.892 2.896 2.896 0 0 1 2.892-2.894c.277 0 .542.04.794.113V9.38a6.34 6.34 0 0 0-.794-.052 6.353 6.353 0 0 0-6.35 6.35 6.353 6.353 0 0 0 6.35 6.35 6.354 6.354 0 0 0 6.349-6.35V8.847a8.214 8.214 0 0 0 4.767 1.503V6.905c-.34 0-.677-.074-.995-.219z"/>
        </svg>
      </div>
      <div class="top-notif-content">
        <div class="top-notif-header">
          <span class="top-notif-title">TikTok LIVE Rewards</span>
          <span class="top-notif-time">now</span>
        </div>
        <div class="top-notif-message">Successfully sent coins to recipient</div>
      </div>
    `;
    document.body.appendChild(notifEl);
  }

  if (state.screen === 'home') {
    root.innerHTML = home();

    // Natural decrement animation on home dashboard ONLY when returning from exchange as requested
    if (state.animateHome && state.lastDeduction) {
      const { startBalance, endBalance, startCoins, endCoins } = state.lastDeduction;
      state.animateHome = false;
      state.lastDeduction = null;

      const homeBal = document.getElementById('homeBigBalance');

      if (homeBal) {
        homeBal.style.transition = 'color 0.25s ease';
        homeBal.style.color = '#fe2c55';
        homeBal.textContent = fmt(startBalance);
      }

      // Smooth count-down animation
      setTimeout(() => {
        animateNumber({
          startVal: startBalance,
          endVal: endBalance,
          duration: 1300,
          onUpdate: (val, progress) => {
            if (homeBal) homeBal.textContent = fmt(val);
          },
          onDone: () => {
            state.balance = endBalance;
            state.coins = endCoins;
            if (homeBal) {
              homeBal.style.transition = 'color 0.4s ease';
              homeBal.style.color = '#ffffff';
              homeBal.textContent = fmt(endBalance);
            }
          }
        });
      }, 200);
    }
  } else if (state.screen === 'exchange') {
    root.innerHTML = exchange();
  } else if (state.screen === 'success') {
    root.innerHTML = success();
  } else if (state.screen === 'toolbox') {
    root.innerHTML = toolbox();
  }
}

// Initial render
render();
