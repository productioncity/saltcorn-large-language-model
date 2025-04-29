/**
 * Olama (local) provider.
 *
 * Placeholder implementation to be fleshed out when Olama integration details
 * are finalised.
 *
 * Author:   Troy Kelly <troy@team.production.city>
 * History:
 *   • 29 Apr 2025 – Scaffolding                                             TK
 */

'use strict';

const BaseProvider = require('./BaseProvider');

class OlamaProvider extends BaseProvider {
  async complete()       { throw new Error('OlamaProvider.complete() not implemented.'); }
  async embed()          { throw new Error('OlamaProvider.embed() not implemented.'); }
  async generateImage()  { throw new Error('OlamaProvider.generateImage() not implemented.'); }
}

module.exports = OlamaProvider;