import React from 'react'

import { useMyHook } from '@rayauth/react'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App
