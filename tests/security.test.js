import assert from 'node:assert/strict'
import test from 'node:test'
import { containsSqlMetaCharacters, sanitizeText } from '../src/security.js'

test('removes executable markup from free text', () => {
  assert.equal(sanitizeText('Invoice <script>alert(1)</script><b>approved</b>'), 'Invoice approved')
})

test('flags common SQL control sequences without rejecting normal prose', () => {
  assert.equal(containsSqlMetaCharacters("x' OR 1=1; --"), true)
  assert.equal(containsSqlMetaCharacters('Monthly software subscription'), false)
})
