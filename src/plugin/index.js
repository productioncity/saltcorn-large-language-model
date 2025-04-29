/**
 * ============================================================================
 * Saltcorn Large-Language-Model Plug-in – Bootstrap
 * ============================================================================
 *
 *  • Conforms precisely to the Saltcorn plug-in signature.  Keys that Saltcorn
 *    CALLS must be FUNCTIONS – therefore `layout` is now a function returning
 *    an (empty) layout object.
 *  • All optional hooks are safe “no-ops”; they exist only to satisfy loader
 *    checks and can be fleshed-out incrementally.
 *
 *  Author:   Troy Kelly <troy@team.production.city>
 *  Updated:  29 Apr 2025
 * ----------------------------------------------------------------------------
 */

'use strict';

/* ------------------------------------------------------------------ */
/* 1.  Internals                                                      */
/* ------------------------------------------------------------------ */
const Logger            = require('./lib/logger');
const { ENV_DEBUG_VAR } = require('./constants');

const section = (label, fields) => ({ name: label, form: { fields } });

/* ------------------------------------------------------------------ */
/* 2.  Configuration Workflow                                         */
/* ------------------------------------------------------------------ */
function configuration_workflow(existing = {}) {
  return {
    steps: [
      /* ────────────────────────────────────────────────────────────── */
      section('General', [
        {
          name   : 'debug_enabled',
          label  : `Verbose logging (${ENV_DEBUG_VAR})`,
          type   : 'Bool',
          default: !!existing.debug_enabled,
        },
      ]),
      /* ────────────────────────────────────────────────────────────── */
      section('OpenAI', [
        { name: 'openai_endpoint', label: 'Endpoint URL', type: 'String' },
        {
          name : 'openai_api_key',
          label: 'API Key',
          type : 'String',
          input_type: 'password',
        },
      ]),
      /* ────────────────────────────────────────────────────────────── */
      section('OpenAI Compatible', [
        { name: 'compat_endpoint', label: 'Endpoint URL', type: 'String' },
        {
          name : 'compat_api_key',
          label: 'API Key',
          type : 'String',
          input_type: 'password',
        },
        { name: 'compat_completion', label: 'Supports completion', type: 'Bool' },
        { name: 'compat_embedding',  label: 'Supports embedding',  type: 'Bool' },
        { name: 'compat_images',     label: 'Supports images',     type: 'Bool' },
      ]),
      /* ────────────────────────────────────────────────────────────── */
      section('Google Vertex AI', [
        {
          name : 'vertex_oauth',
          label: 'Authorise',
          type : 'String',
          input_type: 'custom_html',
          attributes: { html: '<button class="btn btn-primary">Authorise…</button>' },
        },
      ]),
    ],
  };
}

/* ------------------------------------------------------------------ */
/* 3.  Plug-in Export                                                 */
/* ------------------------------------------------------------------ */
module.exports = {
  sc_plugin_api_version: 1,
  plugin_name         : 'saltcorn-large-language-model',

  /* ---- Life-cycle ------------------------------------------------ */
  onLoad(configuration = {}) {
    Logger.configure(configuration);
    Logger.info('LLM plug-in loaded ✅');
  },
  unload() {
    Logger.info('LLM plug-in unloaded 🛑');
  },

  /* ---- Configuration -------------------------------------------- */
  configuration_workflow,

  /* ---- Layout (MUST be function) -------------------------------- */
  layout() {
    /* Return an (optional) Layout customisation object.
       Empty object keeps Saltcorn loader satisfied. */
    return {};
  },

  headers: [],

  /* ---- Functional hooks (safe stubs) ----------------------------- */
  actions        : {},
  authentication : undefined,
  eventTypes     : {},
  external_tables: [],
  functions      : {},
  viewtemplates  : [],
  fieldviews     : {},
  fileviews      : {},
  routes         : {},
  table_providers: [],
  types          : [],

  verifier_workflow: undefined,

  /* ---- Misc. metadata ------------------------------------------- */
  dependencies      : [],
  serve_dependencies: [],
};