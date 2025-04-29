/**
 * Saltcorn Large-Language-Model plug-in – bootstrap.
 *
 * Now includes harmless stub functions / objects for every optional hook the
 * Saltcorn loader MAY attempt to call:
 *   • layout, functions, types, viewtemplates, fieldviews, fileviews
 * These return empty structures so the loader’s `typeof … === 'function'`
 * checks succeed (or it simply ignores empty objects/arrays).
 *
 * Author:   Troy Kelly <troy@team.production.city>
 */

'use strict';

const Logger = require('./lib/logger');
const { ENV_DEBUG_VAR } = require('./constants');

/* ------------------------------------------------------------------ */
/* 1.  Configuration workflow                                         */
/* ------------------------------------------------------------------ */
function configuration_workflow(cfg = {}) {
  Logger.configure(cfg);

  const section = (label, fields) => ({ name: label, form: { fields } });

  return {
    steps: [
      section('General', [
        { name: 'debug_enabled', label: `Verbose logging (${ENV_DEBUG_VAR})`, type: 'Bool' },
      ]),
      section('OpenAI', [
        { name: 'openai_endpoint', label: 'Endpoint URL', type: 'String' },
        { name: 'openai_api_key',  label: 'API key',      type: 'String', input_type: 'password' },
      ]),
      section('OpenAI Compatible', [
        { name: 'compat_endpoint', label: 'Endpoint URL', type: 'String' },
        { name: 'compat_api_key',  label: 'API key',      type: 'String', input_type: 'password' },
        { name: 'compat_completion', label: 'Supports completion', type: 'Bool' },
        { name: 'compat_embedding',  label: 'Supports embedding',  type: 'Bool' },
        { name: 'compat_images',     label: 'Supports images',     type: 'Bool' },
      ]),
      section('Google Vertex AI', [
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

/* ------------------------------------------------------------------ */
/* 2.  Plug-in export                                                 */
/* ------------------------------------------------------------------ */
module.exports = {
  sc_plugin_api_version: 1,

  /* ---------- Lifecycle -------------------------------------------- */
  init:  (cfg = {}) => { Logger.configure(cfg); Logger.info('LLM plug-in ready'); },
  unload:()          => { Logger.info('LLM plug-in unloaded'); },

  configuration_workflow,

  /* ---------- Mandatory / optional hooks (stubs) ------------------- */
  layout      : () => ({}),          // Saltcorn calls if present
  types       : [],                  // no custom field-types yet
  viewtemplates: [],
  fieldviews  : {},
  fileviews   : {},
  functions   : {},                  // custom JS functions
  actions     : {},                  // actions land here later
};