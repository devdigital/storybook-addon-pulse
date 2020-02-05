/** @jsx jsx */
import { jsx, Box } from 'theme-ui'
import { keyframes } from '@emotion/core'

export const Pulse = ({
  minWidth,
  maxWidth,
  timeInSeconds,
  mode,
  children,
}) => {
  const squeeze = keyframes({
    '0%': { width: maxWidth },
    '100%': { width: minWidth },
  })

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={{
          animation: `${timeInSeconds}s linear infinite alternate ${squeeze}`,
          animationPlayState: mode === 'paused' ? 'paused' : 'running',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

Pulse.defaultProps = {
  mode: 'paused',
  minWidth: '300px',
  maxWidth: '100%',
  timeInSeconds: 5,
}
