
export const CLASS_COLORS = {
  DRUID: '#FF7D0A',
  HUNTER: '#ABD473',
  MAGE: '#69CCF0',
  PALADIN: '#F58CBA',
  PRIEST: '#FFFFFF',
  ROGUE: '#FFF569',
  SHAMAN: '#0070DE', // Maybe people want the ugly paladin pink
  WARLOCK: '#9482C9',
  WARRIOR: '#C79C6E'
}

export const FACTION_COLORS = {
  HORDE: '#C62828',
  ALLIANCE: '#1565C0'
}

export const THEME = {
  PRIMARY_COLOR: '#121212',
  ACCENT_COLOR: CLASS_COLORS.SHAMAN,
  SUCCESS_COLOR: 'rgba(0, 199, 80, 0.85)',
  ERROR_COLOR: 'rgba(209, 0, 0, 0.85)'
}

export const SERVERS = {
  elysium_pvp: {
    name: 'Elysium',
    image: 'https://i.imgur.com/7Gisr3n.jpg',
    dontGroup: true,
    order: 1
  },
  anathema_pvp: {
    name: 'Anathema',
    image: 'https://i.imgur.com/B9QGZu3.jpg',
    order: 2
  },
  darrowshire_pve: {
    name: 'Darrowshire',
    image: 'https://i.imgur.com/KcWcbPo.jpg',
    order: 3
  },
  logon: {
    name: 'Login Server',
    image: 'https://i.imgur.com/JX1rAjE.jpg',
    order: 4
  },
  website: {
    name: 'Website',
    image: 'https://i.imgur.com/Mzrli3R.jpg',
    order: 5
  }
}

export const SERVICES = {
  logon: true,
  website: true
}

export const SOON = {
  // New servers
}
