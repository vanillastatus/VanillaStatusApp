export default function fadeBottom({ layout, position, scene }) {
  const { index } = scene

  const inputRange = [ index - 1, index, index + 1]
  const width = layout.initWidth
  const height = layout.initHeight

  const opacity = position.interpolate({
    inputRange,
    outputRange: [ 0, 1, 1]
  })

  let translateX = 0
  let translateY = 0

  translateY = position.interpolate({
    inputRange,
    outputRange: [ height/4, 0, 0 ]
  })

  return {
    opacity,
    transform: [
      { translateX },
      { translateY }
    ]
  }

}
