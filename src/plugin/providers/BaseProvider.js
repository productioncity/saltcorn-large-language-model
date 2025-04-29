/**
 * Abstract base-class for all LLM providers.
 *
 * Author:   Troy Kelly <troy@team.production.city>
 * History:
 *   • 29 Apr 2025 – Added logger integration.                     TK
 */

'use strict';

const Logger = require('../lib/logger'); // Singleton logger

/* eslint-disable class-methods-use-this */

class BaseProvider {
  /**
   * @param {object} cfg Provider-specific configuration.
   */
  constructor(cfg = {}) {
    this.cfg = cfg;
    this.log = Logger;          // Convenience alias for subclasses
  }

  /* ------------------------------ Completion ------------------------- */
  async complete(/* model, prompt, opts */) {
    throw new Error('complete() not implemented.');
  }

  /* ------------------------------ Embedding -------------------------- */
  async embed(/* model, input */) {
    throw new Error('embed() not implemented.');
  }

  /* ------------------------------ Images ----------------------------- */
  async generateImage(/* model, prompt, opts */) {
    throw new Error('generateImage() not implemented.');
  }
}

module.exports = BaseProvider;