/**
 * Saltcorn Large-Language-Model Plug-in
 * -------------------------------------
 * Minimal boot-strap that installs cleanly.
 *
 * – configuration_workflow returns a real Workflow instance (required).  
 * – Hooks that Saltcorn *calls* are functions (see caldav reference).  
 * – Remaining hooks are empty stubs to be filled later.
 *
 * Author:  Troy Kelly <troy@team.production.city>
 * Date:    29 Apr 2025
 */

'use strict';

/* ──────────────────────────  Imports  ──────────────────────────── */
const Logger   = require('./lib/logger');
const Workflow = require('@saltcorn/data/models/workflow');
const Form     = require('@saltcorn/data/models/form');
const { ENV_DEBUG_VAR } = require('./constants');

/* ───────────────── Configuration workflow ─────────────────────── */
function configuration_workflow() {
  return new Workflow({
    steps: [
      {
        name: 'settings',
        form: () =>
          new Form({
            fields: [
              /* ── General ── */
              {
                name   : 'debug_enabled',
                label  : `Verbose logging (${ENV_DEBUG_VAR})`,
                type   : 'Bool',
              },

              /* ── OpenAI ── */
              { name: 'openai_endpoint', label: 'OpenAI endpoint', type: 'String' },
              {
                name : 'openai_api_key',
                label: 'OpenAI API key',
                type : 'String',
                input_type: 'password',
              },

              /* ── OpenAI-compatible ── */
              { name: 'compat_endpoint', label: 'Compat endpoint', type: 'String' },
              {
                name : 'compat_api_key',
                label: 'Compat API key',
                type : 'String',
                input_type: 'password',
              },
              { name: 'compat_completion', label: 'Completion', type: 'Bool' },
              { name: 'compat_embedding',  label: 'Embedding',  type: 'Bool' },
              { name: 'compat_images',     label: 'Images',     type: 'Bool' },

              /* ── Google Vertex ── */
              {
                name      : 'vertex_oauth',
                label     : 'Google Vertex OAuth',
                type      : 'String',
                input_type: 'custom_html',
                attributes: { html: '<button class="btn btn-primary">Authorise…</button>' },
              },
            ],
          }),
      },
    ],
  });
}

/* ────────────── Hooks that Saltcorn actively calls ─────────────── */
const actions         = () => ({});
const table_providers = () => ([]);
const functions       = () => ({});
const external_tables = () => ([]);
const eventTypes      = () => ({});

/* ──────────────────────────  Export  ───────────────────────────── */
module.exports = {
  sc_plugin_api_version: 1,
  plugin_name         : 'saltcorn-large-language-model',

  /* life-cycle ---------------------------------------------------- */
  onLoad(cfg = {}) { Logger.configure(cfg); Logger.info('LLM plug-in loaded'); },
  unload()         { Logger.info('LLM plug-in unloaded'); },

  /* config -------------------------------------------------------- */
  configuration_workflow,

  /* mandatory callable layout ------------------------------------ */
  layout() { return {}; },

  /* called-hooks -------------------------------------------------- */
  actions,
  table_providers,
  functions,
  external_tables,
  eventTypes,

  /* passive stubs ------------------------------------------------- */
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