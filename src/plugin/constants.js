/**
 * Shared constants for the Saltcorn LLM plug-in.
 *
 * Author:   Troy Kelly <troy@team.production.city>
 * History:
 *   • 29 Apr 2025 – Scaffolding                                   TK
 *   • 29 Apr 2025 – Added ENV_DEBUG_VAR                           TK
 */

'use strict';

module.exports = Object.freeze({
  /* ---------- Provider identifiers – use these in config / UI ------------ */
  PROVIDERS: {
    OPENAI:        'openai',
    OPENAI_COMPAT: 'openai-compatible',
    OLAMA_LOCAL:   'olama',
    GOOGLE_VERTEX: 'google-vertex',
  },

  /* ---------- Environment variable enabling verbose diagnostics ---------- */
  ENV_DEBUG_VAR: 'SC_LLM_DEBUG',

  /* ---------- Generic defaults ------------------------------------------ */
  DEFAULT_TIMEOUT_MS: 30_000,
});