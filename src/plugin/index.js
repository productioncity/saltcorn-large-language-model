/**
 * =============================================================================
 * Saltcorn Large-Language-Model Plug-in – Bootstrap
 * =============================================================================
 *  • When a plug-in exposes a `configuration_workflow` Saltcorn *always calls*
 *    every other optional hook (types, actions, viewtemplates, …).  Each hook
 *    must therefore be a FUNCTION.  Missing or non-function hooks trigger the
 *    runtime error: “plugin[key] is not a function”.
 *  • This file exports wrappers – one for every recognised hook – that return
 *    empty placeholders.  Real implementations can replace the placeholders
 *    incrementally without breaking installation.
 *
 *  Author:   Troy Kelly <troy@team.production.city>
 *  Updated:  29 Apr 2025
 * -----------------------------------------------------------------------------
 */

'use strict';

/* -------------------------------------------------------------------------- */
/* 1.  Internals                                                              */
/* -------------------------------------------------------------------------- */
const Logger            = require('./lib/logger');
const { ENV_DEBUG_VAR } = require('./constants');

/** Utility – Saltcorn “section” helper for config workflows. */
const section = (label, fields) => ({ name: label, form: { fields } });

/* -------------------------------------------------------------------------- */
/* 2.  Configuration Workflow                                                 */
/* -------------------------------------------------------------------------- */
function configuration_workflow(existing = {}) {
  return {
    steps: [
      /* ─── General ────────────────────────────────────────────────────── */
      section('General', [
        {
          name   : 'debug_enabled',
          label  : `Verbose logging (${ENV_DEBUG_VAR})`,
          type   : 'Bool',
          default: !!existing.debug_enabled,
        },
      ]),

      /* ─── OpenAI ------------------------------------------------------- */
      section('OpenAI', [
        { name: 'openai_endpoint', label: 'Endpoint URL', type: 'String' },
        {
          name : 'openai_api_key',
          label: 'API Key',
          type : 'String',
          input_type: 'password',
        },
      ]),

      /* ─── OpenAI-compatible ------------------------------------------- */
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

      /* ─── Google Vertex AI -------------------------------------------- */
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

/* -------------------------------------------------------------------------- */
/* 3.  Helper – create “empty but callable” wrappers                          */
/* -------------------------------------------------------------------------- */
const returns = (value) => function wrapped() { return value; };

/* -------------------------------------------------------------------------- */
/* 4.  Plug-in Export                                                         */
/* -------------------------------------------------------------------------- */
module.exports = {
  /* ---- Required metadata ------------------------------------------------- */
  sc_plugin_api_version: 1,
  plugin_name         : 'saltcorn-large-language-model',

  /* ---- Lifecycle --------------------------------------------------------- */
  onLoad(cfg = {}) {
    Logger.configure(cfg);
    Logger.info('LLM plug-in loaded ✅');
  },
  unload() { Logger.info('LLM plug-in unloaded 🛑'); },

  /* ---- Configuration ----------------------------------------------------- */
  configuration_workflow,

  /* ---- Mandatory function hooks (many are presently stubs) -------------- */
  layout            : returns({}),
  types             : returns([]),
  viewtemplates     : returns([]),
  fieldviews        : returns({}),
  fileviews         : returns({}),
  actions           : returns({}),
  functions         : returns({}),
  eventTypes        : returns({}),
  external_tables   : returns([]),
  table_providers   : returns([]),
  routes            : returns({}),
  migrations        : returns([]),
  pages             : returns([]),
  commands          : returns([]),
  virtual_triggers  : returns([]),
  patches           : returns([]),
  headers           : returns([]),
  fonts             : returns({}),
  icons             : returns([]),
  capacitor_plugins : returns([]),
};