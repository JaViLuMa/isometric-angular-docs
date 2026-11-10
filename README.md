# Isometric Angular Docs Repo

This repo is documentation for [Isometric Angular](https://github.com/JaViLuMa/isometric-angular)

## Development

```bash
npm install
npm run start
```

## Live examples

Docusaurus renders pages with React, so the "Rendered example" blocks boot a
small Angular application in the browser and mount each example template with
the real `isometric-angular` components.

```mdx
import RenderedExample from "@site/src/components/RenderedExample";

<RenderedExample
  template={`
    <div isometric-root>
      <div isometric-plane [size]="{ width: 6, height: 6 }" color="#4f8bff"></div>
    </div>
  `}
/>
```

- `src/components/RenderedExample` is the React wrapper (example frame, mount
  and cleanup).
- `src/angular/render-example.ts` holds the Angular side: one shared zoneless
  application, JIT-compiled example components, and the list of components a
  template can use.
