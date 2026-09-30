import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { describe, expect, it, afterAll } from 'vitest';
import request from 'supertest';
import { app, GATE_ASSETS } from '../src/app';
import { prisma } from '../src/prisma';

const pub = path.resolve(__dirname, '../public');
const manifest = JSON.parse(fs.readFileSync(path.join(pub, 'manifest.webmanifest'), 'utf8'));
const pngSize = (file: string) => { const b = fs.readFileSync(file); return [b.readUInt32BE(16), b.readUInt32BE(20), b[25]]; }; // width, height, colour type

afterAll(async () => { await prisma.$disconnect(); });

describe('PWA icon and manifest', () => {
  it('keeps the source artwork byte-for-byte unchanged', () => {
    const src = path.resolve(__dirname, '../icon/399c58d3306eb64e4f39c3df6cd7645f19e1194237fe37a591b7fa474cfc0924.png');
    expect(crypto.createHash('sha256').update(fs.readFileSync(src)).digest('hex')).toBe('d4a81d461bd675fed0c148528407e687ea11e8e8ec7ae6db505fa4b4dd69351c');
  });

  it('declares a valid manifest whose icons exist at their declared sizes', () => {
    expect(manifest).toMatchObject({ name: 'A Mind in English', start_url: '/', scope: '/', display: 'standalone' });
    expect(manifest.icons.some((i: any) => i.sizes === '192x192' && i.purpose === 'any')).toBe(true);
    expect(manifest.icons.some((i: any) => i.sizes === '512x512' && i.purpose === 'any')).toBe(true);
    expect(manifest.icons.some((i: any) => i.purpose === 'maskable')).toBe(true);
    for (const i of manifest.icons) {
      const file = path.join(pub, i.src);
      expect(fs.existsSync(file), i.src).toBe(true);
      const [w, h] = pngSize(file);
      expect(`${w}x${h}`, i.src).toBe(i.sizes);
      expect(i.type).toBe('image/png');
      // Maskable variants are separate padded files; "any" is never reused as maskable
      expect(i.purpose === 'maskable', i.src).toBe(i.src.includes('maskable'));
    }
  });

  it('uses an opaque apple-touch-icon (iOS paints transparency black) and transparent-cornered "any" icons', () => {
    expect(pngSize(path.join(pub, 'apple-touch-icon.png'))).toEqual([180, 180, 2]);   // RGB
    expect(pngSize(path.join(pub, 'icons/icon-512.png'))[2]).toBe(6);                 // RGBA
    expect(pngSize(path.join(pub, 'icons/maskable-512.png'))[2]).toBe(2);             // opaque padded canvas
  });

  it('links favicon, apple-touch-icon and manifest once each in <head>, all to existing files', () => {
    const html = fs.readFileSync(path.join(pub, 'index.html'), 'utf8');
    const links = [...html.matchAll(/<link rel="(icon|apple-touch-icon|manifest)" href="([^"]+)"/g)].map(m => [m[1], m[2]]);
    expect(links.filter(l => l[0] === 'apple-touch-icon')).toHaveLength(1);
    expect(links.filter(l => l[0] === 'manifest')).toHaveLength(1);
    for (const [, href] of links) expect(fs.existsSync(path.join(pub, href)), href).toBe(true);
    expect(html).not.toContain('serviceWorker');
  });

  it('serves the icon set without a session, with correct MIME types and revalidation', async () => {
    const types: Record<string, RegExp> = { '.webmanifest': /application\/manifest\+json/, '.png': /image\/png/, '.ico': /image\/(x-icon|vnd\.microsoft\.icon)/ };
    const icons = ['/manifest.webmanifest', '/favicon.ico', '/apple-touch-icon.png', ...manifest.icons.map((i: any) => i.src)];
    for (const p of icons) {
      expect(GATE_ASSETS.has(p), p).toBe(true);
      const res = await request(app).get(p);
      expect(res.status, p).toBe(200);
      expect(res.headers['content-type'], p).toMatch(types[path.extname(p)]);
      expect(res.headers['cache-control'], p).toBe('no-cache');
    }
  });

  it('keeps the book private: only the listed icon files became public', async () => {
    for (const p of ['/app.js', '/data/unit-01.js', '/data/pronunciation.js', '/audio/en/unit-01/u01-listening-01.mp3', '/icons/anything-else.png', '/icon/399c58d3306eb64e4f39c3df6cd7645f19e1194237fe37a591b7fa474cfc0924.png']) {
      expect((await request(app).get(p)).status, p).toBe(401);
    }
  });
});
