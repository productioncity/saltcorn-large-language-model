/**
 * ============================================================================
 * Saltcorn Large-Language-Model Plug-in – Bootstrap
 * ============================================================================
 *
 *  WHY THIS FILE EXISTS
 *  --------------------
 *  • Saltcorn’s plug-in loader follows this rule:
 *      If a plug-in exports a `configuration_workflow` then *all* other
 *      optional hooks (types, actions, viewtemplates, etc.) are expected to be
 *      FUNCTIONS that accept the per-tenant configuration object and return
 *      the real data.  If any hook is a plain value the loader tries to
 *      execute it and throws: “plugin[key] is not a function”.
 *
 *  • Therefore every optional hook is wrapped in a small function that returns
 *    an (initially empty) stub.  Real implementations can replace the stubs
 *    incrementally without breaking installation.
 *
 *  • `layout` must also be a function in this scenario.
 *
 *  Author: Troy Kelly <troy@team.production.city>
 *  Updated: 29 Apr 2025
 * ----------------------------------------------------------------------------
 */

'use strict';

/* -------------------------------------------------------------------------- */
/* 1 • Internals                                                              */
/* -------------------------------------------------------------------------- */
const Logger            = require('./lib/logger');
const { ENV_DEBUG_VAR } = require('./constants');

/* Shorthand for composing workflow “sections”. */
const section = (label, fields) => ({ name: label, form: { fields } });

/* -------------------------------------------------------------------------- */
/* 2 • Configuration Workflow                                                 */
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

      /* ─── OpenAI-compatible (local proxy) ----------------------------- */
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
          input_type: 'custom_html',
          attributes: { html: '<button class="btn btn-primary">Authorise…</button>' },
        },
      ]),
    ],
  };
}

/* -------------------------------------------------------------------------- */
/* 3 • Utility – create “callable stubs”                                      */
/* -------------------------------------------------------------------------- */
const returns = (value) => function stub() { return value; };

/* -------------------------------------------------------------------------- */
/* 4 • Plug-in Export                                                         */
/* -------------------------------------------------------------------------- */
module.exports = {
  /* Mandatory metadata ---------------------------------------------------- */
  sc_plugin_api_version: 1,
  plugin_name         : 'saltcorn-large-language-model',

  /* Lifecycle hooks ------------------------------------------------------- */
  onLoad(cfg = {}) {
    Logger.configure(cfg);
    Logger.info('LLM plug-in loaded ✅');
  },
  unload() { Logger.info('LLM plug-in unloaded 🛑'); },

  /* Configuration --------------------------------------------------------- */
  configuration_workflow,

  /* Saltcorn expects a *function* when configuration_workflow is present -- */
  layout            : returns({}),

  /* Optional hooks – all callable stubs for now --------------------------- */
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