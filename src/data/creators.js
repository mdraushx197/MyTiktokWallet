import { cleanHandle } from '../utils/formatters';

export const randomAvatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80"
];

// 100+ Realistic Creator Profiles Database with follower & like counts
export const CREATOR_DATABASE = [
  { username: "roshan", nickname: "Roshan", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80", followers: 2450000, likes: 38200000, verified: false },
  { username: "raushx", nickname: "Alex D", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", followers: 850000, likes: 14200000, verified: false },
  { username: "apple", nickname: "Apple", avatar: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=400&q=80", followers: 6800000, likes: 45100000, verified: false },
  { username: "samsung", nickname: "Samsung", avatar: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=400&q=80", followers: 5200000, likes: 29800000, verified: false },
  { username: "mrbeast", nickname: "MrBeast", avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=400&q=80", followers: 104500000, likes: 982000000, verified: false },
  { username: "khaby.lame", nickname: "Khaby Lame", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80", followers: 162800000, likes: 2400000000, verified: false },
  { username: "charlidamelio", nickname: "charli d'amelio", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80", followers: 155600000, likes: 11700000000, verified: false },
  { username: "bellapoarch", nickname: "Bella Poarch", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80", followers: 94200000, likes: 2300000000, verified: false },
  { username: "addisonre", nickname: "Addison Rae", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80", followers: 88500000, likes: 5800000000, verified: false },
  { username: "zachking", nickname: "Zach King", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80", followers: 82100000, likes: 1100000000, verified: false },
  { username: "willsmith", nickname: "Will Smith", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", followers: 75200000, likes: 540000000, verified: false },
  { username: "tiktok", nickname: "TikTok", avatar: "https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&w=400&q=80", followers: 80400000, likes: 320000000, verified: false },
  { username: "cznburak", nickname: "Czn Burak", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80", followers: 74900000, likes: 1500000000, verified: false },
  { username: "therock", nickname: "The Rock", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80", followers: 74500000, likes: 542000000, verified: false },
  { username: "domelipa", nickname: "domelipa", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80", followers: 74100000, likes: 4800000000, verified: false },
  { username: "dixiedamelio", nickname: "Dixie", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80", followers: 56400000, likes: 3300000000, verified: false },
  { username: "jasonderulo", nickname: "Jason Derulo", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", followers: 58700000, likes: 1300000000, verified: false },
  { username: "spencerx", nickname: "Spencer X", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80", followers: 55100000, likes: 1300000000, verified: false },
  { username: "lorengray", nickname: "Loren Gray", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80", followers: 54200000, likes: 3000000000, verified: false },
  { username: "justmaiko", nickname: "Michael Le", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80", followers: 51800000, likes: 1400000000, verified: false },
  { username: "kallmekris", nickname: "Kris HC", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80", followers: 50400000, likes: 2200000000, verified: false },
  { username: "brentrivera", nickname: "Brent Rivera", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", followers: 47900000, likes: 1600000000, verified: false },
  { username: "avani", nickname: "Avani", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80", followers: 42800000, likes: 3100000000, verified: false },
  { username: "selenagomez", nickname: "Selena Gomez", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80", followers: 59300000, likes: 620000000, verified: false },
  { username: "kyliejenner", nickname: "Kylie Jenner", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80", followers: 55800000, likes: 1200000000, verified: false },
  { username: "billieeilish", nickname: "Billie Eilish", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80", followers: 60100000, likes: 410000000, verified: false },
  { username: "arianagrande", nickname: "Ariana Grande", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80", followers: 36400000, likes: 340000000, verified: false },
  { username: "taylorswift", nickname: "Taylor Swift", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80", followers: 32500000, likes: 290000000, verified: false },
  { username: "shakira", nickname: "Shakira", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80", followers: 41200000, likes: 280000000, verified: false },
  { username: "dualipa", nickname: "Dua Lipa", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80", followers: 15800000, likes: 180000000, verified: false },
  { username: "ed.sheeran", nickname: "Ed Sheeran", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", followers: 14600000, likes: 155000000, verified: false },
  { username: "justinbieber", nickname: "Justin Bieber", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80", followers: 27900000, likes: 175000000, verified: false },
  { username: "bts_official_bighit", nickname: "BTS", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80", followers: 65400000, likes: 1400000000, verified: false },
  { username: "blackpinkofficial", nickname: "BLACKPINK", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80", followers: 48900000, likes: 620000000, verified: false },
  { username: "alanwalker", nickname: "Alan Walker", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80", followers: 18200000, likes: 125000000, verified: false },
  { username: "marshmello", nickname: "Marshmello", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", followers: 32100000, likes: 380000000, verified: false },
  { username: "ishowspeed", nickname: "Speed", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80", followers: 28500000, likes: 310000000, verified: false },
  { username: "kai_cenat", nickname: "Kai Cenat", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80", followers: 16400000, likes: 195000000, verified: false },
  { username: "adinross", nickname: "Adin Ross", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", followers: 9800000, likes: 88000000, verified: false },
  { username: "xqc", nickname: "xQc", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80", followers: 4500000, likes: 45000000, verified: false },
  { username: "ninja", nickname: "Ninja", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80", followers: 19100000, likes: 145000000, verified: false },
  { username: "pokimane", nickname: "Pokimane", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80", followers: 6800000, likes: 62000000, verified: false },
  { username: "valkyrae", nickname: "Valkyrae", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80", followers: 3400000, likes: 38000000, verified: false },
  { username: "pewdiepie", nickname: "PewDiePie", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", followers: 13500000, likes: 98000000, verified: false },
  { username: "stokes_twins", nickname: "Stokes Twins", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80", followers: 24200000, likes: 580000000, verified: false },
  { username: "bayashi.tiktok", nickname: "Bayashi", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80", followers: 54300000, likes: 1800000000, verified: false },
  { username: "gordonramsayofficial", nickname: "Gordon Ramsay", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80", followers: 40200000, likes: 620000000, verified: false },
  { username: "nusr_et", nickname: "Salt Bae", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", followers: 22800000, likes: 190000000, verified: false },
  { username: "cristiano", nickname: "Cristiano Ronaldo", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80", followers: 18900000, likes: 140000000, verified: false },
  { username: "leomessi", nickname: "Leo Messi", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80", followers: 16200000, likes: 110000000, verified: false },
  { username: "neymarjr", nickname: "Neymar Jr", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80", followers: 32400000, likes: 270000000, verified: false },
  { username: "k.mbappe", nickname: "Kylian Mbappé", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", followers: 22100000, likes: 160000000, verified: false },
  { username: "erling.haaland", nickname: "Erling Haaland", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80", followers: 12800000, likes: 95000000, verified: false },
  { username: "virat.kohli", nickname: "Virat Kohli", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80", followers: 15300000, likes: 130000000, verified: false },
  { username: "nike", nickname: "Nike", avatar: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80", followers: 8900000, likes: 78000000, verified: false },
  { username: "adidas", nickname: "Adidas", avatar: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=400&q=80", followers: 7200000, likes: 64000000, verified: false },
  { username: "netflix", nickname: "Netflix", avatar: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=400&q=80", followers: 38600000, likes: 890000000, verified: false },
  { username: "google", nickname: "Google", avatar: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=400&q=80", followers: 5400000, likes: 42000000, verified: false },
  { username: "microsoft", nickname: "Microsoft", avatar: "https://images.unsplash.com/photo-1583321500900-828764eb92a3?auto=format&fit=crop&w=400&q=80", followers: 3800000, likes: 28000000, verified: false },
  { username: "playstation", nickname: "PlayStation", avatar: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80", followers: 14800000, likes: 160000000, verified: false },
  { username: "xbox", nickname: "Xbox", avatar: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=400&q=80", followers: 8400000, likes: 92000000, verified: false },
  { username: "redbull", nickname: "Red Bull", avatar: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=400&q=80", followers: 19300000, likes: 310000000, verified: false },
  { username: "tesla", nickname: "Tesla", avatar: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=400&q=80", followers: 4800000, likes: 38000000, verified: false },
  { username: "nasa", nickname: "NASA", avatar: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80", followers: 11200000, likes: 130000000, verified: false },
  { username: "natgeo", nickname: "National Geographic", avatar: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80", followers: 14500000, likes: 195000000, verified: false },
  { username: "nba", nickname: "NBA", avatar: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=400&q=80", followers: 21800000, likes: 480000000, verified: false },
  { username: "fifaworldcup", nickname: "FIFA World Cup", avatar: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=400&q=80", followers: 18400000, likes: 320000000, verified: false },
  { username: "starbucks", nickname: "Starbucks", avatar: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=400&q=80", followers: 3200000, likes: 35000000, verified: false },
  { username: "mcdonalds", nickname: "McDonald's", avatar: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80", followers: 5900000, likes: 68000000, verified: false },
  { username: "gucci", nickname: "Gucci", avatar: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=400&q=80", followers: 4200000, likes: 48000000, verified: false },
  { username: "louisvuitton", nickname: "Louis Vuitton", avatar: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80", followers: 3800000, likes: 39000000, verified: false },
  { username: "zara", nickname: "Zara", avatar: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=400&q=80", followers: 6100000, likes: 52000000, verified: false },
  { username: "mina.chou992", nickname: "Mina Chou 💕 MRSN", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80", followers: 654000, likes: 8200000, verified: false },
  { username: "danieltiffin", nickname: "Daniel Tiffin", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", followers: 480000, likes: 5400000, verified: false },
  { username: "alexeid", nickname: "Alexei", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80", followers: 320000, likes: 4100000, verified: false },
  { username: "david_beckham", nickname: "David Beckham", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80", followers: 9800000, likes: 82000000, verified: false },
  { username: "tomholland", nickname: "Tom Holland", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80", followers: 14200000, likes: 135000000, verified: false },
  { username: "zendaya", nickname: "Zendaya", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80", followers: 18500000, likes: 190000000, verified: false },
  { username: "jennaortega", nickname: "Jenna Ortega", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80", followers: 22400000, likes: 240000000, verified: false },
  { username: "milliebobbybrown", nickname: "Millie Bobby Brown", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80", followers: 16800000, likes: 180000000, verified: false },
  { username: "olivia.rodrigo", nickname: "Olivia Rodrigo", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80", followers: 21600000, likes: 260000000, verified: false },
  { username: "sabrinacarpenter", nickname: "Sabrina Carpenter", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80", followers: 19400000, likes: 230000000, verified: false },
  { username: "lanadelrey", nickname: "Lana Del Rey", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80", followers: 12800000, likes: 140000000, verified: false },
  { username: "ladygaga", nickname: "Lady Gaga", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80", followers: 13900000, likes: 110000000, verified: false },
  { username: "rihanna", nickname: "Rihanna", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80", followers: 9400000, likes: 85000000, verified: false },
  { username: "beyonce", nickname: "Beyoncé", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80", followers: 6800000, likes: 45000000, verified: false },
  { username: "drake", nickname: "Drake", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", followers: 11200000, likes: 98000000, verified: false },
  { username: "travis.scott", nickname: "Travis Scott", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80", followers: 8400000, likes: 76000000, verified: false },
  { username: "snoopdogg", nickname: "Snoop Dogg", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80", followers: 28900000, likes: 240000000, verified: false },
  { username: "theweeknd", nickname: "The Weeknd", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80", followers: 14500000, likes: 120000000, verified: false },
  { username: "badbunny", nickname: "Bad Bunny", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", followers: 34200000, likes: 360000000, verified: false },
  { username: "karolg", nickname: "Karol G", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80", followers: 52800000, likes: 480000000, verified: false },
  { username: "maluma", nickname: "Maluma", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80", followers: 16800000, likes: 135000000, verified: false },
  { username: "jbalvin", nickname: "J Balvin", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80", followers: 22400000, likes: 190000000, verified: false },
  { username: "rosalia", nickname: "Rosalía", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80", followers: 33600000, likes: 390000000, verified: false },
  { username: "camilacabello", nickname: "Camila Cabello", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80", followers: 17500000, likes: 155000000, verified: false },
  { username: "shawnmendes", nickname: "Shawn Mendes", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", followers: 16900000, likes: 145000000, verified: false },
  { username: "harrystyles", nickname: "Harry Styles", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80", followers: 12400000, likes: 115000000, verified: false },
  { username: "johncena", nickname: "John Cena", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80", followers: 8600000, likes: 72000000, verified: false },
  { username: "robertdowneyjr", nickname: "Robert Downey Jr", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80", followers: 15800000, likes: 140000000, verified: false },
  { username: "emmawatson", nickname: "Emma Watson", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80", followers: 7200000, likes: 65000000, verified: false },
  { username: "charlieputh", nickname: "Charlie Puth", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", followers: 23500000, likes: 310000000, verified: false },
  { username: "postmalone", nickname: "Post Malone", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80", followers: 15600000, likes: 140000000, verified: false },
  { username: "eminem", nickname: "Eminem", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80", followers: 12800000, likes: 115000000, verified: false },
  { username: "espn", nickname: "ESPN", avatar: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=400&q=80", followers: 44500000, likes: 1100000000, verified: false },
  { username: "dominos", nickname: "Domino's Pizza", avatar: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80", followers: 2800000, likes: 32000000, verified: false },
  { username: "riyaz.14", nickname: "Riyaz Aly", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80", followers: 46100000, likes: 2100000000, verified: false },
  { username: "mr_faisu_07", nickname: "Faisal Shaikh", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", followers: 33200000, likes: 1900000000, verified: false },
  { username: "jannatzubair29", nickname: "Jannat Zubair", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80", followers: 40800000, likes: 1800000000, verified: false },
  { username: "sarah_smith", nickname: "Sarah Smith", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80", followers: 210000, likes: 2800000, verified: false },
  { username: "emily_walker", nickname: "Emily Walker", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80", followers: 430000, likes: 5900000, verified: false },
  { username: "jessica.clark", nickname: "Jessica Clark", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80", followers: 185000, likes: 2100000, verified: false },
  { username: "michael_brown", nickname: "Michael Brown", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80", followers: 520000, likes: 6400000, verified: false },
  { username: "david_miller", nickname: "David Miller", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", followers: 340000, likes: 3900000, verified: false },
  { username: "chris_evans", nickname: "Chris Evans", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80", followers: 16500000, likes: 152000000, verified: false }
];

export const typoAliases = {
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

export function levenshteinDistance(a, b) {
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

export function findClosestCreator(raw) {
  if (!raw) return null;
  const clean = cleanHandle(raw).toLowerCase();
  if (!clean) return null;

  if (typoAliases[clean]) {
    const aliasTarget = typoAliases[clean].toLowerCase();
    const found = CREATOR_DATABASE.find(c => c.username.toLowerCase() === aliasTarget);
    if (found) return found;
  }

  const exactUser = CREATOR_DATABASE.find(c => c.username.toLowerCase() === clean);
  if (exactUser) return exactUser;

  const exactNick = CREATOR_DATABASE.find(c => c.nickname.toLowerCase() === clean);
  if (exactNick) return exactNick;

  if (clean.length >= 3) {
    const prefixMatch = CREATOR_DATABASE.find(c =>
      c.username.toLowerCase().startsWith(clean) ||
      c.nickname.toLowerCase().startsWith(clean)
    );
    if (prefixMatch) return prefixMatch;
  }

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

    if (u[0] === clean[0] || n[0] === clean[0]) similarity += 0.15;
    if (clean.length >= 2 && (u.startsWith(clean.slice(0, 2)) || n.startsWith(clean.slice(0, 2)))) {
      similarity += 0.2;
    }
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

export function getRandomProfile(clean) {
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
