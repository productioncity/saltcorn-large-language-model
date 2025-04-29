/**
 * Provider registry – returns an instance for the requested provider key.
 *
 * Purpose:   Decouples main plug-in logic from concrete provider classes.
 * Author:    Troy Kelly <troy@team.production.city>
 * History:
 *   • 29 Apr 2025 – Scaffolding                                             TK
 */

'use strict';

const { PROVIDERS } = require('../constants');

const OpenAIProvider        = require('./OpenAIProvider');
const OpenAICompatProvider  = require('./OpenAICompatProvider');
const OlamaProvider         = require('./OlamaProvider');
const VertexProvider        = require('./VertexProvider');

/**
 * Factory – returns (singleton) provider instances keyed by const ID.
 */
const cache = new Map();

/**
 * Get provider by ID.
 *
 * @param   {string} id  One of constants.PROVIDERS.*
 * @param   {object} cfg Provider-specific configuration
 * @returns {BaseProvider}
 */
function getProvider(id, cfg = {}) {
  if (cache.has(id)) return cache.get(id);

  let instance;
  switch (id) {
    case PROVIDERS.OPENAI:
      instance = new OpenAIProvider(cfg);
      break;
    case PROVIDERS.OPENAI_COMPAT:
      instance = new OpenAICompatProvider(cfg);
      break;
    case PROVIDERS.OLAMA_LOCAL:
      instance = new OlamaProvider(cfg);
      break;
    case PROVIDERS.GOOGLE_VERTEX:
      instance = new VertexProvider(cfg);
      break;
    default:
      throw new Error(`Unknown provider: “${id}”`);
  }
  cache.set(id, instance);
  return instance;
}

module.exports = { getProvider };