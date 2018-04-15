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
    </head>
    <body>
      <div id='___gatsby' dangerouslySetInnerHTML={{ __html: body }} />
      {postBodyComponents}
    </body>
  </html>
