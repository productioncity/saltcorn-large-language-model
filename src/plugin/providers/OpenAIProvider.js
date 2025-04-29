/**
 * OpenAI provider (official REST API).
 *
 * Implementation deferred – uses BaseProvider scaffold only.
 *
 * Author:   Troy Kelly <troy@team.production.city>
 * History:
 *   • 29 Apr 2025 – Scaffolding                                             TK
 */

'use strict';

const BaseProvider = require('./BaseProvider');
const { request }   = require('../lib/Request');

class OpenAIProvider extends BaseProvider {
  constructor(cfg = {}) {
    super(cfg);
    this.baseUrl = cfg.baseUrl || 'https://api.openai.com';
    this.apiKey  = cfg.apiKey  || process.env.OPENAI_API_KEY;
  }

  /* ------------------------------------------------------------------ */
  /* All methods currently throw – ready for future implementation.     */
  /* ------------------------------------------------------------------ */

  async complete(model, prompt, opts = {}) { // eslint-disable-line no-unused-vars
    throw new Error('OpenAIProvider.complete() not implemented.');
  }

  async embed(model, input) { // eslint-disable-line no-unused-vars
    throw new Error('OpenAIProvider.embed() not implemented.');
  }

  async generateImage(model, prompt, opts = {}) { // eslint-disable-line no-unused-vars
    throw new Error('OpenAIProvider.generateImage() not implemented.');
  }
}

module.exports = OpenAIProvider;