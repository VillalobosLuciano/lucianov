import React, { useState } from 'react'
import NoSsr from './NoSsr'
import ReactTooltip from 'react-tooltip'

interface Props {
  children: React.ReactNode
  text: string
  place?: 'top' | 'bottom' | 'left' | 'right'
}

export default function Tooltip({ children, text, place }: Props) {
  const [tooltip, showTooltip] = useState(true)
  return (
    <>
      <NoSsr>
        {tooltip && (
          <ReactTooltip id={text} place={place} type="dark" effect="solid" />
        )}

        <div
          data-tip={text}
          data-for={text}
          onMouseEnter={() => showTooltip(true)}
          onMouseLeave={() => {
            showTooltip(false)
            setTimeout(() => showTooltip(true), 50)
          }}
        >
          {children}
        </div>
      </NoSsr>
    </>
  )
}
