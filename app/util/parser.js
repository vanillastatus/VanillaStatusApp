import _ from 'lodash'

import { FACTION_COLORS } from '../config'

export function parseSubtitle(server, { servers = {}, export_time }) {
  const queueData = servers[server.id] || {}
  const { queueAvailable, queue } = queueData

  if (!queueAvailable && server.isSoon) {
    return 'Soon™'
  }

  if (queueAvailable && queue > 0) {
    return `Queue: ${queue}`
  }

  if (!queueAvailable) {
    return ''
  }
}

export function parseQueue(id, { servers = {}, export_time }) {
  const queueData = servers[id] || {}
  const { queueAvailable, queue } = queueData

  if (queueAvailable && queue > -1) {
    return queue
  }
}

export function parseRealmData(id, { servers = {}, available } = {}) {
  // What do with available boolean?
  return servers[id] || {}
}

export function getOrganizationName(id, organization = {}) {
  return organization.name
}

export function getTitle(id, server = {}) {
  return server.name || 'Unknown Realm'
}

export function getImage(id, server = {}) {
  return server.image
}

export function getOrder(id, server = {}) {
  return server.order
}

export function getIsService(id, server = {}) {
  return !server.isRealm
}

export function getDontGroup(id, server = {}) {
  return server.dontGroup || false
}

export function getOrganizationId(id, server = {}) {
  return server.organizationId
}

export function parseStatus(server, autoqueue, realmdata) {
  const { status, id } = server
  const isService = getIsService(id, server)
  const title = getTitle(id, server)
  const image = getImage(id, server)
  const order = getOrder(id, server)
  const dontGroup = getDontGroup(id, server)

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
    order,
    dontGroup
  }
}

export function generateRatioGraphData(allianceValue, hordeValue) {
  const alliance = {
    value: Math.floor(allianceValue),
    color: FACTION_COLORS.ALLIANCE,
    label: `${Math.round(allianceValue).toFixed(0)}%`
  }

  const horde = {
    value: Math.floor(hordeValue),
    color: FACTION_COLORS.HORDE,
    label: `${Math.round(hordeValue).toFixed(0)}%`
  }

  return [ alliance, horde ]
}
