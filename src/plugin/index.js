/**
 * ============================================================================
 * Saltcorn Large-Language-Model Plug-in – Bootstrap
 * ============================================================================
 *
 *  • Conforms to Saltcorn’s plug-in contract.  When a plug-in exposes a
 *    `configuration_workflow` **Saltcorn expects _every other optional hook_**
 *    (types, actions, viewtemplates, …) to be FUNCTIONS – not plain values.
 *    Failing to do so yields the runtime error: “plugin[key] is not a function”.
 *
 *  • This file therefore provides function-wrappers that return the underlying
 *    data structures.  The data are currently empty stubs – they will be
 *    populated incrementally as functionality is implemented.
 *
 *  • Implementation logic lives in `src/` – here we only register and expose
 *    the plug-in surface.
 *
 *  Author:   Troy Kelly <troy@team.production.city>
 *  Updated:  29 Apr 2025
 * ----------------------------------------------------------------------------
 */

'use strict';

/* -------------------------------------------------------------------------- */
/* 1.  Internals                                                              */
/* -------------------------------------------------------------------------- */
const Logger            = require('./lib/logger');
const { ENV_DEBUG_VAR } = require('./constants');

/**
 * Convenience for composing Saltcorn “section” objects in a configuration
 * workflow.
 *
 * @param   {string} label  Section heading.
 * @param   {Array}  fields Saltcorn field definitions.
 * @returns {{name:string, form:{fields:Array}}}
 */
const section = (label, fields) => ({ name: label, form: { fields } });

/* -------------------------------------------------------------------------- */
/* 2.  Configuration Workflow                                                 */
/* -------------------------------------------------------------------------- */
function configuration_workflow(existing = {}) {
  return {
    steps: [
      /* ─────────── General ─────────────────────────────────────────────── */
      section('General', [
        {
          name   : 'debug_enabled',
          label  : `Verbose logging (${ENV_DEBUG_VAR})`,
          type   : 'Bool',
          default: !!existing.debug_enabled,
        },
      ]),

      /* ─────────── OpenAI ------------------------------------------------ */
      section('OpenAI', [
        { name: 'openai_endpoint', label: 'Endpoint URL', type: 'String' },
        {
          name : 'openai_api_key',
          label: 'API Key',
          type : 'String',
          input_type: 'password',
        },
      ]),

      /* ─────────── OpenAI-compatible (local proxies etc.) ---------------- */
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

      /* ─────────── Google Vertex AI ------------------------------------- */
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
/* 3.  Helper: empty-but-safe function wrapper                                */
/* -------------------------------------------------------------------------- */
/** Used for every optional hook until real content is provided. */
const returns =
  (value) =>
    function wrapped() { return value; };

/* -------------------------------------------------------------------------- */
/* 4.  Plug-in Export                                                         */
/* -------------------------------------------------------------------------- */
module.exports = {
  /* ---- Mandatory metadata ------------------------------------------------ */
  sc_plugin_api_version: 1,
  plugin_name         : 'saltcorn-large-language-model',

  /* ---- Life-cycle hooks -------------------------------------------------- */
  onLoad(configuration = {}) {
    Logger.configure(configuration);      // honour run-time settings
    Logger.info('LLM plug-in loaded ✅');
  },
  unload() { Logger.info('LLM plug-in unloaded 🛑'); },

  /* ---- Configuration Workflow ------------------------------------------- */
  configuration_workflow,

  /* ---- Saltcorn expects LAYOUT to be a *function* ----------------------- */
  layout: returns({}),           // future custom layouts will replace this

  /* ---- Optional extensibility hooks (currently stubs) ------------------- */
  types          : returns([]),
  viewtemplates  : returns([]),
  fieldviews     : returns({}),
  fileviews      : returns({}),
  actions        : returns({}),
  functions      : returns({}),
  eventTypes     : returns({}),
  external_tables: returns([]),
  routes         : returns({}),
  table_providers: returns([]),

  /* ---- Misc. metadata ---------------------------------------------------- */
  headers           : [],
  fonts             : {},
  icons             : [],
  capacitor_plugins : [],
};