/** @jsx jsx */
import { jsx, keyframes } from '@emotion/core'

export const Pulse = ({
  minWidth,
  maxWidth,
  timeInSeconds,
  mode,
  children,
}) => {
  const pulse = keyframes({
    '0%': { width: maxWidth },
    '100%': { width: minWidth },
  })

  return (
    <div
      css={{ display: 'flex', margin: 0, padding: 0, justifyContent: 'center' }}
    >
      <div
        css={{
          animation: `${timeInSeconds}s linear infinite alternate ${pulse}`,
          animationPlayState: mode === 'paused' ? 'paused' : 'running',
        }}
      >
        {children}
      </div>
    </div>
  )
}

Pulse.defaultProps = {
  mode: 'paused',
  minWidth: '300px',
  maxWidth: '100%',
  timeInSeconds: 3,
}
