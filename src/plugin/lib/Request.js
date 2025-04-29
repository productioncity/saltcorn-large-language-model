/**
 * Lightweight HTTP helper.
 *
 * Rationale:  Saltcorn bundles `node-fetch`, but shielding direct usage makes
 * future swaps (e.g. to `fetch-h2`) non-breaking.
 *
 * Purpose:   Provide a single function `request()` for GET/POST/… with sensible
 *            defaults (timeouts, JSON parsing, error handling).
 * Author:    Troy Kelly <troy@team.production.city>
 * History:
 *   • 29 Apr 2025 – Placeholder implementation                               TK
 */

'use strict';

const fetch = require('node-fetch');
const { DEFAULT_TIMEOUT_MS } = require('../constants');

/**
 * Thin wrapper around node-fetch.
 *
 * @param   {string}  url     Absolute URL.
 * @param   {object}  options node-fetch init options.
 * @returns {Promise<object>} Parsed JSON response.
 */
async function request(url, options = {}) {
  /* -- Bare-bones placeholder: real implementation will add retries, etc. -- */
  const ctrl    = new AbortController();
  const timeout = setTimeout(() => ctrl.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const res = await fetch(url, { ...options, signal: ctrl.signal });
    if (!res.ok) {
      throw new Error(`Request failed: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } finally {
    clearTimeout(timeout);
  }
}

module.exports = { request };