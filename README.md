<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://tggl.io/tggl-io-logo-white.svg">
    <img align="center" alt="Tggl Logo" src="https://tggl.io/tggl-io-logo-black.svg" width="200rem" />
  </picture>
</p>

<h1 align="center">Tggl OpenFeature Javascript Server Provider</h1>

<p align="center">
  The Typescript OpenFeature Provider to evaluate flags and report usage to the Tggl API or a <a href="https://tggl.io/developers/evaluating-flags/tggl-proxy">proxy</a>.
</p>

<p align="center">
  <a href="https://tggl.io/">🔗 Website</a>
  •
  <a href="https://tggl.io/developers/sdks/open-feature/node">📚 Documentation</a>
  •
  <a href="https://www.npmjs.com/package/openfeature-server-tggl-provider">📦 NPM</a>
  •
  <a href="https://www.youtube.com/@Tggl-io">🎥 Videos</a>
</p>


## Usage

Install the dependencies:

```bash
npm i @openfeature/server-sdk openfeature-server-tggl-provider
```

Start evaluating flags:

```typescript
import { OpenFeature } from '@openfeature/server-sdk';
import { TgglServerProvider } from 'openfeature-server-tggl-provider'

await OpenFeature.setProviderAndWait(new TgglServerProvider('API_KEY'))

const client = OpenFeature.getClient();

const value = await client.getBooleanValue(
  'my-feature',
  false,
  { userId: 'foo' }
)

if (value) {
  console.log('Feature is enabled')
}
```
