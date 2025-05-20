/**
 * OpenAI provider (official REST API).
 *
 * Implements completion, embedding and image generation using the
 * official OpenAI REST API.
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
    this.defaultCompletionModel =
      cfg.default_completion_model || 'gpt-3.5-turbo';
    this.defaultEmbeddingModel =
      cfg.default_embedding_model || 'text-embedding-ada-002';
    this.defaultImageModel =
      cfg.default_image_model || 'dall-e-3';

    /* Optional JSON mapping of model → default parameters. */
    try {
      this.modelDefaults =
        typeof cfg.model_defaults === 'string'
          ? JSON.parse(cfg.model_defaults)
          : cfg.model_defaults || {};
    } catch {
      this.modelDefaults = {};
    }
  }

  /* ------------------------------------------------------------------ */
  /* Helper to attach headers                                           */
  /* ------------------------------------------------------------------ */

  #headers() {
    if (!this.apiKey) throw new Error('OpenAI API key not configured');
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    };
  }

  async complete(model, prompt, opts = {}) { // eslint-disable-line no-unused-vars
    const mdl      = model || this.defaultCompletionModel;
    const defaults = this.modelDefaults[mdl] || {};
    const url      = `${this.baseUrl}/v1/chat/completions`;
    const body = {
      model: mdl,
      messages: Array.isArray(prompt)
        ? prompt
        : [{ role: 'user', content: prompt }],
      ...defaults,
      ...opts,
    };
    this.log.debug('POST %s %o', url, body);
    return request(url, {
      method: 'POST',
      headers: this.#headers(),
      body: JSON.stringify(body),
    });
  }

  async embed(model, input, opts = {}) { // eslint-disable-line no-unused-vars
    const mdl      = model || this.defaultEmbeddingModel;
    const defaults = this.modelDefaults[mdl] || {};
    const url      = `${this.baseUrl}/v1/embeddings`;
    const body = { model: mdl, input, ...defaults, ...opts };
    this.log.debug('POST %s %o', url, body);
    return request(url, {
      method: 'POST',
      headers: this.#headers(),
      body: JSON.stringify(body),
    });
  }

  async generateImage(model, prompt, opts = {}) { // eslint-disable-line no-unused-vars
    const mdl      = model || this.defaultImageModel;
    const defaults = this.modelDefaults[mdl] || {};
    const url      = `${this.baseUrl}/v1/images/generations`;
    const body = { model: mdl, prompt, ...defaults, ...opts };
    this.log.debug('POST %s %o', url, body);
    return request(url, {
      method: 'POST',
      headers: this.#headers(),
      body: JSON.stringify(body),
    });
  }
}

module.exports = OpenAIProvider;
