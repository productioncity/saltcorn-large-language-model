#!/usr/bin/env node
/**
 * Small, self-contained logger for the LLM plug-in.
 *
 *  – Activation:  • Environment variable “SC_LLM_DEBUG” (= 1 / true / verbose)
 *                 • Run-time configuration via `configure({debug_enabled})`
 *
 *  – Usage:       const log = require('./lib/logger');
 *                 log.debug('Connected to provider %s', prov);
 *
 *  – Output:      Timestamps & coloured levels to stdout; never throws.
 *
 *  Limitations:   No external dependencies; Node v18 only.
 *
 * Author:  Troy Kelly <troy@team.production.city>
 * Updated: 29 Apr 2025
 */

'use strict';

/* --------------------------------------------------------------------- */
/* 1.  Utilities                                                         */
/* --------------------------------------------------------------------- */
const { ENV_DEBUG_VAR } = require('../constants');

const COLOURS = {
  reset: '\x1b[0m',
  grey:  '\x1b[90m',
  red:   '\x1b[31m',
  yellow:'\x1b[33m',
  cyan:  '\x1b[36m',
};

/**
 * Render a time-stamp like “13:04:22.123”.
 * @returns {string}
 */
function ts() {
  return new Date().toISOString().substr(11, 12);
}

/**
 * Coerce various truthy strings to boolean.
 * @param   {unknown} v
 * @returns {boolean}
 */
function toBool(v) {
  return ['1', 'true', 'yes', 'on', 'verbose'].includes(String(v).toLowerCase());
}

/* --------------------------------------------------------------------- */
/* 2.  Logger class                                                      */
/* --------------------------------------------------------------------- */
class Logger {
  constructor() {
    this.enabled = toBool(process.env[ENV_DEBUG_VAR]);
  }

  /**
   * Enable / disable at run-time (from configuration workflow).
   * @param {object} cfg Expected to contain a `debug_enabled` boolean.
   */
  configure(cfg = {}) {
    if (typeof cfg.debug_enabled === 'boolean') this.enabled = cfg.debug_enabled;
  }

  /* ----------------------------- Internals ---------------------------- */
  #write(colour, level, fmt, args) {
    if (!this.enabled) return;
    /* eslint-disable-next-line no-console */
    console.log(
      `${COLOURS.grey}${ts()}${COLOURS.reset} ${colour}${level}${COLOURS.reset} ${fmt}`,
      ...args,
    );
  }

  /* ----------------------------- Public API --------------------------- */
  debug(fmt, ...a) { this.#write(COLOURS.cyan,  '[debug] ', fmt, a); }
  info (fmt, ...a) { this.#write(COLOURS.grey,  '[info ] ', fmt, a); }
  warn (fmt, ...a) { this.#write(COLOURS.yellow,'[warn ] ', fmt, a); }
  error(fmt, ...a) { this.#write(COLOURS.red,   '[error] ', fmt, a); }
}

/* Singleton – safe to import anywhere */
module.exports = new Logger();