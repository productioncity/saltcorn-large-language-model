/**
 * Saltcorn Large-Language-Model Plug-in – Minimal scaffold
 *
 * • configuration_workflow → Workflow allowing debug and model defaults
 * • actions                → function (returns empty object)
 * • No other hooks exported – Saltcorn supplies defaults
 *
 * Author : Troy Kelly <troy@team.production.city>
 * Created: 29 Apr 2025
 */

'use strict';

/* ───────────────   Saltcorn helpers   ─────────────── */
const Workflow = require('@saltcorn/data/models/workflow');
const Form     = require('@saltcorn/data/models/form');

/* ------------------------------------------------------------------ */
/* 1.  Configuration workflow                                         */
/* ------------------------------------------------------------------ */
function configuration_workflow() {
  return new Workflow({
    steps: [
      {
        name: 'settings',
        form: () =>
          new Form({
            fields: [
              {
                name : 'debug_enabled',
                label: 'Verbose logging',
                type : 'Bool',
              },
              {
                name : 'openai_default_completion_model',
                label: 'Default completion model',
                type : 'String',
              },
              {
                name : 'openai_default_embedding_model',
                label: 'Default embedding model',
                type : 'String',
              },
              {
                name : 'openai_default_image_model',
                label: 'Default image model',
                type : 'String',
              },
              {
                name : 'openai_model_defaults',
                label: 'Model default parameters (JSON)',
                type : 'String',
              },
            ],
          }),
      },
    ],
  });
}

/* ------------------------------------------------------------------ */
/* 2.  Hooks that Saltcorn actively calls                             */
/* ------------------------------------------------------------------ */
const actions = () => ({});

/* ------------------------------------------------------------------ */
/* 3.  Plug-in export                                                 */
/* ------------------------------------------------------------------ */
module.exports = {
  sc_plugin_api_version: 1,
  plugin_name         : 'saltcorn-large-language-model',

  configuration_workflow,
  actions,
};