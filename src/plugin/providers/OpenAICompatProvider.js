/**
 * “OpenAI-compatible” provider.
 *
 * Handles services that mimic the OpenAI REST interface (e.g. local llm-proxy
 * servers).  Implementation TBD.
 *
 * Author:   Troy Kelly <troy@team.production.city>
 * History:
 *   • 29 Apr 2025 – Scaffolding                                             TK
 */

'use strict';

const BaseProvider = require('./BaseProvider');

class OpenAICompatProvider extends BaseProvider {
  async complete()  { throw new Error('OpenAICompatProvider.complete() not implemented.'); }
  async embed()     { throw new Error('OpenAICompatProvider.embed() not implemented.'); }
  async generateImage() { throw new Error('OpenAICompatProvider.generateImage() not implemented.'); }
}

module.exports = OpenAICompatProvider;