/**
 * ============================================================================
 * Saltcorn Large-Language-Model Plug-in – Bootstrap
 * ============================================================================
 *
 *  • Conforms to the Saltcorn plug-in signature. Optional hooks that Saltcorn
 *    may invoke are provided as safe “no-ops”.
 *  • All implementation logic resides in the `src/` tree – this file is only
 *    the registration shim.
 *
 *  Author:   Troy Kelly <troy@team.production.city>
 *  Updated:  29 Apr 2025
 * ----------------------------------------------------------------------------
 */

'use strict';

/* -------------------------------------------------------------------------- */
/* 1.  Internal helpers                                                       */
/* -------------------------------------------------------------------------- */
const Logger            = require('./lib/logger');
const { ENV_DEBUG_VAR } = require('./constants');

/**
 * Shorthand for constructing Saltcorn configuration-workflow “sections”.
 *
 * @param   {string} label  Heading displayed in the builder UI.
 * @param   {Array}  fields Field definitions per Saltcorn spec.
 * @returns {object}
 */
const section = (label, fields) => ({ name: label, form: { fields } });

/* -------------------------------------------------------------------------- */
/* 2.  Configuration – optional (may be added later)                          */
/* -------------------------------------------------------------------------- */
/* NOTE:
 * -----
 * Saltcorn’s plug-in loader treats the *existence* of `configuration_workflow`
 * as a signal that **all** other extensibility keys (types, actions, …) are
 * functions.  Until the workflow is required we omit it entirely to simplify
 * boot-strap – this avoids the “plugin[key] is not a function” error during
 * installation.                                                             */
//
// function configuration_workflow(existing = {}) {
//   return {
//     steps: [
//       /* ─── General ──────────────────────────────────────────────────── */
//       section('General', [
//         {
//           name   : 'debug_enabled',
//           label  : `Verbose logging (${ENV_DEBUG_VAR})`,
//           type   : 'Bool',
//           default: !!existing.debug_enabled,
//         },
//       ]),
//       /* additional provider-specific steps will be added incrementally */
//     ],
//   };
// }

/* -------------------------------------------------------------------------- */
/* 3.  Plug-in export                                                         */
/* -------------------------------------------------------------------------- */
module.exports = {
  /* ---- Mandatory metadata ------------------------------------------------ */
  sc_plugin_api_version: 1,
  plugin_name         : 'saltcorn-large-language-model',

  /* ---- Life-cycle hooks -------------------------------------------------- */
  onLoad(configuration = {}) {
    /* Route run-time settings to the internal logger. */
    Logger.configure(configuration);
    Logger.info('LLM plug-in loaded ✅');
  },
  unload() { Logger.info('LLM plug-in unloaded 🛑'); },

  /* ---- Layout must be a *function* -------------------------------------- */
  layout() {
    /* Returning an empty object keeps the Saltcorn loader satisfied. */
    return {};
  },

  /* ---- Stubs for optional capability hooks ------------------------------ */
  /* These can be fleshed-out incrementally without breaking installation.   */
  actions        : {},
  authentication : undefined,
  eventTypes     : {},
  external_tables: [],
  fieldviews     : {},
  fileviews      : {},
  functions      : {},
  routes         : {},
  table_providers: [],
  types          : [],
  viewtemplates  : [],

  /* Headers, fonts, icons & capacitors are left empty for now. */
  headers           : [],
  fonts             : {},
  icons             : [],
  capacitor_plugins : [],
};