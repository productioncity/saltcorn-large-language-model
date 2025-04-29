/**
 * Abstract base-class for all LLM providers.
 *
 * Concrete providers (OpenAI, Olama, …) extend this class and implement the
 * three public methods: `complete`, `embed`, and `generateImage`.
 *
 * Author:   Troy Kelly <troy@team.production.city>
 * History:
 *   • 29 Apr 2025 – Initial scaffold                                        TK
 */

'use strict';

/* eslint-disable class-methods-use-this */

class BaseProvider {
  /**
   * @param {object} cfg Provider-specific configuration object.
   */
  constructor(cfg = {}) {
    this.cfg = cfg;
  }

  /* ------------------------------------------------------------------ */
  /* 1.  Completion                                                      */
  /* ------------------------------------------------------------------ */

  /**
   * Text completion / chat.
   *
   * @param   {string} model   Model ID.
   * @param   {string} prompt  Prompt text.
   * @param   {object} opts    Extra parameters (temperature, …)
   * @returns {Promise<string>}
   */
  async complete(model, prompt, opts) {
    void model; void prompt; void opts;
    throw new Error('complete() not implemented in BaseProvider.');
  }

  /* ------------------------------------------------------------------ */
  /* 2.  Embedding                                                       */
  /* ------------------------------------------------------------------ */
  /**
   * Vector embedding.
   *
   * @param   {string} model Model ID.
   * @param   {string[]} input Array of texts.
   * @returns {Promise<number[][]>}
   */
  async embed(model, input) {
    void model; void input;
    throw new Error('embed() not implemented in BaseProvider.');
  }

  /* ------------------------------------------------------------------ */
  /* 3.  Image generation                                                */
  /* ------------------------------------------------------------------ */
  /**
   * Create an image from a prompt.
   *
   * @param   {string} model  Model ID.
   * @param   {string} prompt Prompt text.
   * @param   {object} opts   Model-specific parameters (size, n, …)
   * @returns {Promise<object>} Provider-specific response.
   */
  async generateImage(model, prompt, opts) {
    void model; void prompt; void opts;
    throw new Error('generateImage() not implemented in BaseProvider.');
  }
}

module.exports = BaseProvider;