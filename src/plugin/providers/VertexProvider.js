/**
 * Google Vertex AI provider.
 *
 * OAuth flows, project IDs, and quota management will reside here once
 * implemented.  For now, only the skeleton is provided.
 *
 * Author:   Troy Kelly <troy@team.production.city>
 * History:
 *   • 29 Apr 2025 – Scaffolding                                             TK
 */

'use strict';

const BaseProvider = require('./BaseProvider');

class VertexProvider extends BaseProvider {
  async complete()       { throw new Error('VertexProvider.complete() not implemented.'); }
  async embed()          { throw new Error('VertexProvider.embed() not implemented.'); }
  async generateImage()  { throw new Error('VertexProvider.generateImage() not implemented.'); }
}

module.exports = VertexProvider;