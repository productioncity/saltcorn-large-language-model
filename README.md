# Saltcorn Large-Language-Model Plug-in (Scaffold)

> **Status:** Scaffold only – every method intentionally throws *“Not implemented”*.

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
    ├── OpenAIProvider.js   → Placeholder
    ├── OpenAICompatProvider.js
    ├── OlamaProvider.js
    ├── VertexProvider.js
    └── index.js            → Provider factory

## Development

1. Ensure `Saltcorn v1.0.0` and `Node v18.19.0` are available in your container.
2. Install dev dependencies:

   yarn install

3. Load the plug-in into Saltcorn (Admin → Plug-ins → “From folder”).
4. All UI elements and actions will currently error – functionality is pending.

## Licence

CC0-1.0 – *No Rights Reserved*.

*Author:* [Troy Kelly](mailto:troy@team.production.city)  
*Production City* © 2025