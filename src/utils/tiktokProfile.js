function count(value) {
  if (value == null || value === '') return null;
  const match = String(value).replaceAll(',', '').trim().match(/^(\d+(?:\.\d+)?)\s*([KMB])?$/i);
  if (!match) return null;
  return Math.round(Number(match[1]) * ({ K: 1e3, M: 1e6, B: 1e9 }[match[2]?.toUpperCase()] || 1));
}

export function mapTikTokProfile(payload) {
  if (payload?.success !== true || !payload.data) {
    throw new Error('Profile not found or temporarily unavailable. Check the username and try again.');
  }
  const d = payload.data;
  const username = d.uniqueId || d.username;
  if (!username) throw new Error('Profile service returned incomplete data. Please try again.');
  const avatar = d.avatar || d.avatarLarger || d.avatarMedium || d.avatarThumb || '';
  return {
    username,
    nickname: d.nickname || username,
    avatar: avatar.startsWith('/api/tiktok/avatar?') ? avatar : (/^https:\/\//i.test(avatar) ? avatar : ''),
    followers: count(d.followerCount ?? d.followers),
    likes: count(d.likesCount ?? d.heartCount ?? d.heart ?? d.likes),
    verified: d.verified === true
  };
}
