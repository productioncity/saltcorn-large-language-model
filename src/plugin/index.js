/**
 * ============================================================================
 * Saltcorn Large-Language-Model Plug-in – Bootstrap
 * ============================================================================
 *
 *  • configuration_workflow remains exactly as scaffolded.
 *  • Keys that Saltcorn *calls* are exported as functions (returning stubs).
 *    ─ actions, table_providers, functions, external_tables, eventTypes
 *  • Other optional keys are plain empty values.
 *
 *  Result: the “plugin[key] is not a function” error is resolved.
 *
 *  Author: Troy Kelly <troy@team.production.city>
 *  Updated: 29 Apr 2025
 * ----------------------------------------------------------------------------
 */

'use strict';

/* ------------------------------------------------------------------ */
/* 1.  Internals                                                      */
/* ------------------------------------------------------------------ */
const Logger            = require('./lib/logger');
const { ENV_DEBUG_VAR } = require('./constants');

/* helper to create workflow “sections” */
const section = (label, fields) => ({ name: label, form: { fields } });

/* ------------------------------------------------------------------ */
/* 2.  Configuration Workflow                                         */
/* ------------------------------------------------------------------ */
function configuration_workflow(existing = {}) {
  return {
    steps: [
      /* ── General ──────────────────────────────────────────────────── */
      section('General', [
        {
          name: 'debug_enabled',
          label: `Verbose logging (${ENV_DEBUG_VAR})`,
          type: 'Bool',
          default: !!existing.debug_enabled,
        },
      ]),

      /* ── OpenAI ───────────────────────────────────────────────────── */
      section('OpenAI', [
        { name: 'openai_endpoint', label: 'Endpoint URL', type: 'String' },
        {
          name: 'openai_api_key',
          label: 'API Key',
          type: 'String',
          input_type: 'password',
        },
      ]),

      /* ── OpenAI-compatible proxy ─────────────────────────────────── */
      section('OpenAI Compatible', [
        { name: 'compat_endpoint', label: 'Endpoint URL', type: 'String' },
        {
          name: 'compat_api_key',
          label: 'API Key',
          type: 'String',
          input_type: 'password',
        },
        { name: 'compat_completion', label: 'Supports completion', type: 'Bool' },
        { name: 'compat_embedding',  label: 'Supports embedding',  type: 'Bool' },
        { name: 'compat_images',     label: 'Supports images',     type: 'Bool' },
      ]),

      /* ── Google Vertex AI ────────────────────────────────────────── */
      section('Google Vertex AI', [
        {
          name: 'vertex_oauth',
          label: 'Authorise',
          type: 'String',
          input_type: 'custom_html',
          attributes: { html: '<button class="btn btn-primary">Authorise…</button>' },
        },
      ]),
    ],
  };
}

/* ------------------------------------------------------------------ */
/* 3.  Called-by-Saltcorn hooks – return empty stubs for now          */
/* ------------------------------------------------------------------ */
const actions          = () => ({});
const table_providers  = () => ([]);
const functions        = () => ({});
const external_tables  = () => ([]);
const eventTypes       = () => ({});

/* ------------------------------------------------------------------ */
/* 4.  Plug-in export                                                 */
/* ------------------------------------------------------------------ */
module.exports = {
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

  /* layout must be a function */
  layout() { return {}; },

  /* called hooks (functions) */
  actions,
  table_providers,
  functions,
  external_tables,
  eventTypes,

  /* passive hooks (plain values, empty for now) */
  types            : [],
  viewtemplates    : [],
  fieldviews       : {},
  fileviews        : {},
  routes           : {},
  migrations       : [],
  pages            : [],
  commands         : [],
  virtual_triggers : [],
  patches          : [],
  headers          : [],
  fonts            : {},
  icons            : [],
  capacitor_plugins: [],
};