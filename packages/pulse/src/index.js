import React from 'react'
import { addons, types } from '@storybook/addons'
import { Tool } from './Tool'
export { withPulse } from './Decorator'

addons.register('pulse', api => {
  addons.addPanel('pulse/panel', {
    type: types.TOOL,
    title: 'Pulse',
    render: () => <Tool channel={addons.getChannel()} api={api} />,
    match: ({ viewMode }) => viewMode === 'story',
  })
})
