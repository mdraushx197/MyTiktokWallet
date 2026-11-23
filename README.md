# MyTiktokWallet

## Live website

[Visit the live website](https://velvety-narwhal-6de3d8.netlify.app/)

Hosted on Netlify. This deployment was uploaded from the production `dist` build; future GitHub pushes do not automatically redeploy it. Build with `npm run build` and upload the updated `dist` folder to Netlify to publish changes.

A modern, responsive React web application simulating TikTok LIVE Rewards, Creator Coins recharge, and creator profile interactions with customizable themes and iOS-style notifications.

## Features

- **TikTok LIVE Rewards Card**:
  - Apex Level 50 VIP badge with 4K faceted diamond gem.
  - Dynamic currency support (`USD`, `EUR`, `TRY`, `GBP`, `BRL`).
  - Animated balance deduction when sending coins.
  - Authentic yellowish-gold TikTok coin icons (`TikTokCoinIcon`).
- **Recharge & Creator Exchange**:
  - TikTok creator search via the FollowersGainer profile endpoint, proxied through Vite locally and Netlify in production. Shows provider-returned name, username, avatar, followers and likes; unavailable accounts show errors instead of generated data.
  - Strict verification badge logic: only genuine verified creators display the blue badge.
  - Preset coin packages (30, 350, 700, 1400, 3500) and custom keypad input.
- **9 Revolut-Inspired Luxury Theme Tiers**:
  - Metal Gold, Ultra Platinum, Rose Gold, Space Grey, Electric Blue, Emerald Green, Obsidian Noir, Glitter Shimmer, and Glitter Gold.
  - Dynamically updates the page background, card gradient, and accent styles across all screens while keeping primary action buttons TikTok Red (`#fe2c55`).
- **Authentic iOS 17/18 Notification Banner**:
  - Frosted glassmorphism banner with TikTok app icon, timestamp, and transaction confirmation.
- **Interactive Toolbox**:
  - Toggle between Wallet Modes (Transfer, Exchange, Recharge).
  - Customize withdrawal and transfer labels.
  - Follower text size scaling (1–6).
  - Configurable payment and search loaders (Classic, Modern, Ring, Dots, Squares).

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/mdraushx197/MyTiktokWallet.git
cd MyTiktokWallet

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`.

### Production Build

```bash
npm run build
npm run preview
```

## Tech Stack
- **React 19**
- **Vite 8**
- **Plus Jakarta Sans Typography**
- **Modular CSS with Safe Area Support**

---
*Disclaimer: This project is an independent simulation for educational and portfolio purposes. It is not affiliated with or endorsed by TikTok.*
