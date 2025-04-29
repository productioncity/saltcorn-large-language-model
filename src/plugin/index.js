/**
 * Saltcorn Large-Language-Model plug-in – bootstrap.
 *
 * For now the plug-in only registers:
 *   • A configuration workflow with placeholders for provider credentials.
 *   • A lightweight diagnostic logger (see ./lib/logger.js).
 *
 * Author:   Troy Kelly <troy@team.production.city>
 * History:
 *   • 29 Apr 2025 – Initial scaffold and logging helper.            TK
 */

'use strict';

const Logger   = require('./lib/logger');
const { ENV_DEBUG_VAR, PROVIDERS } = require('./constants');

/* --------------------------------------------------------------------- */
/* 1.  Configuration workflow (runs in Saltcorn admin UI)               */
/* --------------------------------------------------------------------- */
function configuration_workflow(cfg = {}) {
  /* Persist debug flag to logger on form save */
  Logger.configure(cfg);

  const providerSection = (label, fields) => ({
    name: label,
    form: {
      fields,
    },
  });

  return {
    steps: [
      /* --------- General settings (debug flag) --------- */
      providerSection('General', [
        {
          name:  'debug_enabled',
          label: `Enable verbose logging (${ENV_DEBUG_VAR})`,
          type:  'Bool',
          default: false,
        },
      ]),

      /* --------- OpenAI -------------------------------- */
      providerSection('OpenAI', [
        { name: 'openai_endpoint', label: 'Endpoint URL', type: 'String' },
        { name: 'openai_api_key',  label: 'API Key',      type: 'String', input_type: 'password' },
      ]),

      /* --------- OpenAI-compatible --------------------- */
      providerSection('OpenAI Compatible', [
        { name: 'compat_endpoint', label: 'Endpoint URL', type: 'String' },
        { name: 'compat_api_key',  label: 'API Key',      type: 'String', input_type: 'password' },
        { name: 'compat_completion', label: 'Supports completion', type: 'Bool' },
        { name: 'compat_embedding',  label: 'Supports embedding',  type: 'Bool' },
        { name: 'compat_images',     label: 'Supports image gen.', type: 'Bool' },
      ]),

      /* --------- Google Vertex ------------------------- */
      providerSection('Google Vertex AI', [
        {
          name: 'vertex_oauth',
          label: 'Authorise',
          type:  'String',
          input_type: 'custom_html',
          attributes: { html: '<button class="btn btn-primary">Authorise…</button>' },
        },
      ]),
    ],
  };
}

/* --------------------------------------------------------------------- */
/* 2.  Plug-in export                                                    */
/* --------------------------------------------------------------------- */
module.exports = {
  sc_plugin_api_version: 1,
  plugin_name: '@productioncity/saltcorn-llm',

  /* ------------ Initialisation --------------------------------------- */
  init: (cfg = {}) => {
    Logger.configure(cfg);
    Logger.info('LLM plug-in initialised (debug %s)', Logger.enabled ? 'on' : 'off');
  },

  unload: () => {
    Logger.info('LLM plug-in unloaded.');
  },

  configuration_workflow,

  /* ------------ Placeholder actions (to be implemented) -------------- */
  actions: {},

  /* Types, viewtemplates, etc. intentionally left empty for now. */
};