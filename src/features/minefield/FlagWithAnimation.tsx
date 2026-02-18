import { Typography } from '@mui/material'
import { keyframes } from '@mui/system'
import React, { useEffect, useState } from 'react'

const popIn = keyframes`
  0% {
    transform: scale(5);
    opacity: 0.25;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`

const explodeOut = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(5);
    opacity: 0;
  }
`

interface FlagAnimationProps {
  visible: boolean
}

export const FlagWithAnimation: React.FC<FlagAnimationProps> = ({ visible }) => {
  const [render, setRender] = useState(visible)
  const [animation, setAnimation] = useState<string>('')

  useEffect(() => {
    if (visible) {
      setRender(true)
      setAnimation(`${popIn} 200ms cubic-bezier(0.4, 0, 0.2, 1)`)
      return
    }

    setAnimation(`${explodeOut} 200ms cubic-bezier(0.4, 0, 0.2, 1)`)

    const timer = setTimeout(() => {
      setRender(false)
    }, 160)

    return () => clearTimeout(timer)
  }, [visible])

  if (!render) return null

  return (
    <Typography
      sx={{
        fontSize: '1.375rem',
        lineHeight: 1,
        textShadow: '0px 1px 1.25px #383838ff',
        animation,
        transformOrigin: 'center',
        willChange: 'transform, opacity',
        pointerEvents: 'none',
      }}
    >
      🚩
    </Typography>
  )
}
