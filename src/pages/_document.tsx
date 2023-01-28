import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body
        data-states='[{"id":0,"label":"Texas","metros":[{"id":0,"label":"Dallas"},{"id":1,"label":"Houston"}]},{"id":1,"label":"Louisiana","metros":[{"id":2,"label":"Bossier"},{"id":3,"label":"Haughton"}]}]'
        data-preferences='{"topic":[1,8],"state":{"value":0,"label":"Arizona"}}'
        >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
