import { createRouter } from '@exponent/ex-navigation'

import Detail from '../components/shared_elements/grid/detail'
import Main from '../components/main'

const Router = createRouter(() => ({
  Detail: () => Detail,
  Main: () => Main
}))

export default Router
