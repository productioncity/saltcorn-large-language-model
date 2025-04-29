/**
 * Shared constants for the Saltcorn LLM plug-in.
 *
 * Purpose:   Central place for literal values (provider keys, endpoints, etc.)
 * Author:    Troy Kelly <troy@team.production.city>
 * History:
 *   • 29 Apr 2025 – Scaffolding                                              TK
 */

'use strict';

module.exports = Object.freeze({
  /* ---------- Provider identifiers – use these in config / UI ------------ */
  PROVIDERS: {
    OPENAI:          'openai',
    OPENAI_COMPAT:   'openai-compatible',
    OLAMA_LOCAL:     'olama',
    GOOGLE_VERTEX:   'google-vertex',
  },

  /* ---------- Generic defaults ------------------------------------------ */
  DEFAULT_TIMEOUT_MS: 30_000,
});