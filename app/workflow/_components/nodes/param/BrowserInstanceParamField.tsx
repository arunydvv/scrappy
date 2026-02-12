import { ParamProps } from '@/types/nodes'
import React from 'react'

const BrowserInstanceParamField = ({ params, value, updateNodeParamValue }: ParamProps
) => {
  return (
      <p className='text-xs'>
          {params.name}
      </p>
  )
}

export default BrowserInstanceParamField