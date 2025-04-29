/**
 * ============================================================================
 * Saltcorn Large-Language-Model Plug-in – Bootstrap
 * ============================================================================
 *
 *  • Conforms to the Saltcorn “plug-in model” (v1) as outlined in the
 *    documentation excerpt provided in the specification.
 *  • Only stubs are supplied for optional hooks – these can be fleshed-out as
 *    implementation work proceeds.  Empty objects/arrays are completely safe.
 *  • The plug-in purposely avoids external run-time dependencies; everything
 *    relies on Node v18 and the Saltcorn runtime bundled libraries.
 *
 *  Author:   Troy Kelly <troy@team.production.city>
 *  Created:  29 Apr 2025
 *  Licence:  CC-0 – Public Domain
 * ---------------------------------------------------------------------------
 */

'use strict';

/* ------------------------------------------------------------------ */
/* 1.  Internal helpers                                               */
/* ------------------------------------------------------------------ */
const Logger               = require('./lib/logger');
const { ENV_DEBUG_VAR }    = require('./constants');

/**
 * Simple two-column section creator for configuration_workflow().
 * @param {string} label
 * @param {object[]} fields
 * @returns {object}
 */
function section(label, fields) {
  return { name: label, form: { fields } };
}

/* ------------------------------------------------------------------ */
/* 2.  Configuration Workflow                                         */
/* ------------------------------------------------------------------ */
function configuration_workflow(existing = {}) {
  /* The workflow persists the user’s preferences in Saltcorn’s
     _sc_config table – nothing to do at run-time except read them back. */
  return {
    steps: [
      /* ────────────────────────────────────────────────────────────── */
      section('General', [
        {
          name : 'debug_enabled',
          label: `Verbose logging (${ENV_DEBUG_VAR})`,
          type : 'Bool',
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
          attributes: {
            html: '<button class="btn btn-primary">Authorise…</button>',
          },
        },
      ]),
      /* ---------------------------------------------------------------- */
    ],
  };
}

/* ------------------------------------------------------------------ */
/* 3.  Saltcorn Plug-in Export                                         */
/* ------------------------------------------------------------------ */
module.exports = {
  /* ---- Mandatory fields ------------------------------------------ */
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

  /* ---- UI / Layout ---------------------------------------------- */
  layout : {},         // No top-level layout customisations (yet)
  headers: [],

  /* ---- Functional hooks (stubs) --------------------------------- */
  actions        : {},          // Trigger actions
  authentication : null,        // Custom auth not required
  eventTypes     : {},          // Custom events
  external_tables: [],
  functions      : {},          // Code-trigger helpers
  viewtemplates  : [],
  fieldviews     : {},
  fileviews      : {},
  routes         : {},
  table_providers: [],
  types          : [],

  /* ---- Misc. ----------------------------------------------------- */
  verifier_workflow: null,
  dependencies      : [],
  serve_dependencies: [],
};