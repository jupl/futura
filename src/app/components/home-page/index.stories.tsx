import {storiesOf} from '@storybook/react'
import React from 'react'
import * as Template from './template'

storiesOf('<App.HomePage>', module)
  .add('template (server)', () => <Template.AppHomePage ssr />)
  .add('template (client)', () => <Template.AppHomePage ssr={false} />)
