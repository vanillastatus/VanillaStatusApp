import _ from 'lodash'

import { SERVERS, SERVICES, SOON } from '../config'

export function parseQueue(server, { servers = {}, export_time }) {
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


export function parseRealmData(id, { servers = {}, available } = {}) {
  // console.log(server, servers)s
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
    subtitle = parseQueue(server, autoqueue)
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
