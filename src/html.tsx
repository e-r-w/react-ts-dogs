import * as React from 'react'

interface HtmlProps {
  body: any
  postBodyComponents: any
  headComponents: any
}

module.exports = ({
  body,
  headComponents,
  postBodyComponents
}: HtmlProps) =>
  <html lang='en'>
    <head>
        {headComponents}
        <title>Woof!</title>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0' />
        <style
          id='semantic-ui-inlined-css'
          dangerouslySetInnerHTML={{ __html: require('!raw-loader!../node_modules/semantic-ui-css/semantic.min.css') }}
          />
        <style
          id='gatsby-inlined-css'
          dangerouslySetInnerHTML={{ __html: require('!raw-loader!../src/styles/index.css') }}
          />
    </head>
    <body>
      <div id='___gatsby' dangerouslySetInnerHTML={{ __html: body }} />
      {postBodyComponents}
    </body>
  </html>
