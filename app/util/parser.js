import _ from 'lodash'

import { SERVERS, SERVICES, SOON } from '../config'

export function parseSubtitle(server, { servers = {}, export_time }) {
  const queueData = servers[server.id] || {}
  const { queueAvailable, queue } = queueData

  if (!queueAvailable && SOON[server.id]) {
    return 'Soon™'
  }

  if (queueAvailable && queue > 0) {
    return `Queue: ${queue}`
  }

  if (!queueAvailable) {
    return 'Queue Unavailable'
  }
}

export function parseQueue(id, { servers = {}, export_time }) {
  const queueData = servers[id] || {}
  const { queueAvailable, queue } = queueData

  if (queueAvailable && queue > -1) {
    return queue
  }

  if (!queueAvailable) {
    return 'Unavailable'
  }
}

export function parseRealmData(id, { servers = {}, available } = {}) {
  // What do with available boolean?
  return servers[id] || {}
}

export function parseStatus(server, autoqueue, realmdata) {
  const isService = SERVICES[server.id] || false
  const { status, id } = server

  const serverConfig = SERVERS[server.id] || {}
  const title = serverConfig.name || 'Unknow Realm'
  const { image, order } = serverConfig
  const realmData = parseRealmData(server, realmdata)

  let subtitle
  if (!isService) {
    subtitle = parseSubtitle(server, autoqueue)
  }

  return {
    title,
    subtitle,
    status,
    image,
    id,
    isService,
    order
  }
}
