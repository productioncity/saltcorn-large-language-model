/**
 * Saltcorn Large-Language-Model plug-in
 *
 * Entry-point that registers the plug-in with Saltcorn.  ALL logic is delegated
 * to the provider / helper modules in ./providers and ./lib.
 *
 * Purpose:   Bootstrap file – minimal, deliberately “feature-free”.
 * Author:    Troy Kelly <troy@team.production.city>
 * History:
 *   • 29 Apr 2025 – Initial scaffolding                                     TK
 *
 * NOTE:  Every method currently throws “Not implemented”.  Implementation will
 *        follow in subsequent commits.
 */
'use strict';

/* -------------------------------------------------------------------------- */
/* 1.  Node / Saltcorn imports (none needed yet)                              */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/* 2.  Public API required by Saltcorn                                        */
/* -------------------------------------------------------------------------- */

/**
 * Saltcorn looks for the named exports below when it loads a plug-in.
 *
 * @see https://docs.saltcorn.com/plugin-dev/quickstart
 */
module.exports = {
  sc_plugin_api_version: 1,

  /**
   * Initialise the plug-in.  Runs once when Saltcorn starts.
   *
   * @param   {object} opts Injected Saltcorn services (db, state, …)
   * @returns {void}
   */
  init: (opts) => {
    // Placeholder – plugin initialisation logic goes here later.
    throw new Error('Large-Language-Model plug-in initialisation not implemented.');
  },

  /**
   * Teardown – executed when Saltcorn shuts down or the plug-in is disabled.
   *
   * @returns {void}
   */
  unload: () => {
    // Placeholder – cleanup logic goes here later.
  },

  /* ---------------------------------------------------------------------- */
  /*  Actions exposed to workflows / views – each calls into provider layer */
  /* ---------------------------------------------------------------------- */

  actions: {
    llm_completion: {
      description: 'LLM text completion (provider-agnostic)',
      configFields: () => [
        { name: 'provider', label: 'Provider', type: 'String' },
        { name: 'model',    label: 'Model ID', type: 'String' },
        { name: 'prompt',   label: 'Prompt',   type: 'String' }
      ],
      run: async () => {
        throw new Error('llm_completion action not implemented.');
      },
    },

    llm_embedding: {
      description: 'LLM embedding (provider-agnostic)',
      configFields: () => [
        { name: 'provider', label: 'Provider', type: 'String' },
        { name: 'model',    label: 'Model ID', type: 'String' },
        { name: 'input',    label: 'Input',    type: 'String' }
      ],
      run: async () => {
        throw new Error('llm_embedding action not implemented.');
      },
    },

    llm_image_generation: {
      description: 'LLM image generation (provider-agnostic)',
      configFields: () => [
        { name: 'provider', label: 'Provider', type: 'String' },
        { name: 'model',    label: 'Model ID', type: 'String' },
        { name: 'prompt',   label: 'Prompt',   type: 'String' }
      ],
      run: async () => {
        throw new Error('llm_image_generation action not implemented.');
      },
    },
  },
};