
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

export const THEME = {
  PRIMARY_COLOR: '#121212',
  ACCENT_COLOR: CLASS_COLORS.SHAMAN
}

export const SERVERS = {
  elysium_pvp: {
    name: 'Elysium',
    image: 'http://i.imgur.com/7Gisr3n.jpg',
    order: 3
  },
  zethkur_pvp: {
    name: 'Zethkur',
    image: 'http://i.imgur.com/ICElhLj.jpg',
    order: 4
  },
  nostalrius_pvp: {
    name: 'Anathema',
    image: 'http://i.imgur.com/B9QGZu3.jpg',
    order: 1
  },
  nostalrius_pve: {
    name: 'Darrowshire',
    image: 'http://i.imgur.com/KcWcbPo.jpg',
    order: 2
  },
  logon: {
    name: 'Elysium Login Server',
    image: 'http://i.imgur.com/9ywu91U.jpg',
    order: 5
  },
  website: {
    name: 'Elysium Website',
    image: 'http://i.imgur.com/n1w5Sbn.jpg',
    order: 6
  }
}

export const SERVICES = {
  logon: true,
  website: true
}

export const SOON = {
  // New servers
}

export const HOST = 'https://elysiumstatus.com'
