/**
 * ============================================================================
 * Saltcorn Large-Language-Model Plug-in – Bootstrap
 * ============================================================================
 *
 *  This file keeps the configuration workflow exactly as scaffolded and exports
 *  every optional hook as a *plain object or array* (empty for now).  That is
 *  how built-in Saltcorn plug-ins are structured, so the loader will not try
 *  to call non-functions and the “plugin[key] is not a function” error
 *  disappears.
 *
 *  Author:  Troy Kelly <troy@team.production.city>
 *  Date:   29 Apr 2025
 * ----------------------------------------------------------------------------
 */

'use strict';

/* ------------------------------------------------------------------ */
/* 1.  Internals                                                      */
/* ------------------------------------------------------------------ */
const Logger            = require('./lib/logger');
const { ENV_DEBUG_VAR } = require('./constants');

/* helper for workflow sections */
const section = (label, fields) => ({ name: label, form: { fields } });

/* ------------------------------------------------------------------ */
/* 2.  Configuration Workflow                                         */
/* ------------------------------------------------------------------ */
function configuration_workflow(existing = {}) {
  return {
    steps: [
      /* ─── General ─────────────────────────────────────────────────── */
      section('General', [
        {
          name   : 'debug_enabled',
          label  : `Verbose logging (${ENV_DEBUG_VAR})`,
          type   : 'Bool',
          default: !!existing.debug_enabled,
        },
      ]),

      /* ─── OpenAI ---------------------------------------------------- */
      section('OpenAI', [
        { name: 'openai_endpoint', label: 'Endpoint URL', type: 'String' },
        {
          name : 'openai_api_key',
          label: 'API Key',
          type : 'String',
          input_type: 'password',
        },
      ]),

      /* ─── OpenAI-compatible (local proxy) -------------------------- */
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

      /* ─── Google Vertex AI ----------------------------------------- */
      section('Google Vertex AI', [
        {
          name : 'vertex_oauth',
          label: 'Authorise',
          type : 'String',
          input_type : 'custom_html',
          attributes : { html: '<button class="btn btn-primary">Authorise…</button>' },
        },
      ]),
    ],
  };
}

/* ------------------------------------------------------------------ */
/* 3.  Plug-in Export                                                 */
/* ------------------------------------------------------------------ */
module.exports = {
  /* mandatory metadata */
  sc_plugin_api_version: 1,
  plugin_name         : 'saltcorn-large-language-model',

  /* lifecycle */
  onLoad(cfg = {}) {
    Logger.configure(cfg);
    Logger.info('LLM plug-in loaded ✅');
  },
  unload() { Logger.info('LLM plug-in unloaded 🛑'); },

  /* configuration */
  configuration_workflow,

  /* layout must be callable */
  layout() { return {}; },

  /* ----- EMPTY STUBS (plain values, not functions) ---------------- */
  types             : [],
  viewtemplates     : [],
  fieldviews        : {},
  fileviews         : {},
  actions           : {},
  functions         : {},
  eventTypes        : {},
  external_tables   : [],
  routes            : {},
  table_providers   : [],
  migrations        : [],
  pages             : [],
  commands          : [],
  virtual_triggers  : [],
  patches           : [],
  headers           : [],
  fonts             : {},
  icons             : [],
  capacitor_plugins : [],
};