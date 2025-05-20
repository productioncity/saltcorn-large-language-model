# Saltcorn Large-Language-Model Plug-in

> **Status:** OpenAI provider implemented; other providers remain scaffolds.

This repository provides the framework for integrating Large Language Models
with the Saltcorn low-code platform.  It aims to support:

* **OpenAI** (official endpoints)  
* **OpenAI-compatible** APIs (e.g. community proxies)  
* **Olama** (local inference)  
* **Google Vertex AI**

## Structure

src/plugin/
├── index.js                → Saltcorn plug-in entry-point
├── constants.js            → Shared literals
├── lib/
│   └── Request.js          → Minimal `fetch` wrapper
└── providers/
    ├── BaseProvider.js     → Abstract provider class
    ├── OpenAIProvider.js   → Official OpenAI implementation
    ├── OpenAICompatProvider.js
    ├── OlamaProvider.js
    ├── VertexProvider.js
    └── index.js            → Provider factory

## Development

1. Ensure `Saltcorn v1.0.0` and `Node v18.19.0` are available in your container.
2. Install dev dependencies:

   yarn install

3. Load the plug-in into Saltcorn (Admin → Plug-ins → “From folder”).
4. Configure your OpenAI defaults via the plug-in settings screen. These values
   include per-model parameters (e.g. `temperature`) and are used when a model is
   not explicitly provided at call time.
5. Run `node scripts/build-models.ts` to generate `models-openai.json` which
   lists the parameters supported by each OpenAI model. Use this as a guide when
   populating the JSON defaults.
6. All remaining providers are still scaffolds and will throw when invoked.

## Licence

CC0-1.0 – *No Rights Reserved*.

*Author:* [Troy Kelly](mailto:troy@team.production.city)  
*Production City* © 2025