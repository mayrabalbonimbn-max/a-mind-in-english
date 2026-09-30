import fs from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';

const css = fs.readFileSync(path.resolve(__dirname, '../public/styles.css'), 'utf8');
const html = fs.readFileSync(path.resolve(__dirname, '../public/index.html'), 'utf8');

function rule(selector: string, source = css): string {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return source.match(new RegExp(`${escaped}\\{([^}]+)\\}`))?.[1] || '';
}

describe('structural shell layout', () => {
  it('phone top bar: logo, timer and menu never shrink; only the sync label wraps; menu keeps its name', () => {
    const phone = css.slice(css.indexOf('/* Phones: logo, Study Timer, sync status and menu share one row.'));
    expect(phone).toMatch(/\.topbar-timer\{margin-right:0;flex:none\}/);
    expect(phone).toMatch(/\.topbar \[data-act="menu"\]\{flex:none;/);
    expect(phone).toMatch(/#topbar-sync\{margin-right:0;min-width:0;flex:0 1 auto\}/);
    expect(phone).toMatch(/@media \(max-width:360px\)\{\s*\.topbar \[data-act="menu"\]\{font-size:0;gap:0;padding:11px 11px\}/);
    const app = fs.readFileSync(path.resolve(__dirname, '../public/app.js'), 'utf8');
    expect(app).toMatch(/<button data-act="menu" aria-label="Open navigation">/);
  });

  it('cache-busts the stylesheet so existing PWA sessions receive layout fixes', () => {
    expect(html).toContain('styles.css?v=20261001-mind-2');
  });

  it('keeps desktop grid ownership separate from mobile overflow containment', () => {
    expect(rule('html,body')).toBe('margin:0');
    expect(rule('.app')).toContain('grid-template-columns:var(--side-w) minmax(0,1fr)');
    expect(rule('.app')).toContain('background:var(--esp)');
    expect(rule('.app')).not.toContain('overflow-x:hidden');
    expect(rule('main')).not.toContain('overflow-x:hidden');
  });

  it('keeps the sticky desktop sidebar viewport-high without making it fixed', () => {
    expect(rule('.side')).toContain('position:sticky');
    expect(rule('.side')).toContain('height:100dvh');
    expect(rule('.side')).toContain('overflow-y:auto');
  });

  it('retains horizontal-overflow protection inside the mobile breakpoint', () => {
    const mobile = css.slice(css.indexOf('@media (max-width:980px){'), css.indexOf('@media (max-width:720px){'));
    expect(rule('html,body', mobile)).toContain('overflow-x:hidden');
    expect(rule('.app', mobile)).toContain('grid-template-columns:1fr');
    expect(rule('.app', mobile)).toContain('overflow-x:hidden');
    expect(rule('main', mobile)).toContain('overflow-x:hidden');
    expect(rule('.side', mobile)).toContain('position:fixed');
    expect(rule('.side', mobile)).toContain('visibility:hidden');
    expect(rule('.side', mobile)).toContain('pointer-events:none');
  });

  it('keeps the unit stepper as its own horizontal scroller', () => {
    expect(rule('.stepper')).toContain('overflow-x:auto');
    expect(rule('.stepper')).toContain('max-width:100%');
    expect(rule('.stepper ol')).toContain('min-width:680px');
  });

  it('lets INTERPRET cards and their real text child shrink without clipping', () => {
    expect(rule('.qs')).toContain('grid-template-columns:minmax(0,1fr)');
    expect(rule('.q')).toContain('width:100%');
    expect(rule('.q .qt')).toContain('overflow-wrap:break-word');
    expect(rule('.opts')).toContain('grid-template-columns:minmax(0,1fr)');
    expect(rule('.opt')).toContain('grid-template-columns:22px minmax(0,1fr)');
    expect(rule('.opt>span')).toContain('min-width:0');
    expect(rule('.opt>span')).toContain('word-break:normal');
    expect(rule('.tf')).toContain('flex-wrap:wrap');
    expect(rule('textarea.ta,input.ti')).toContain('min-width:0');
  });

  it('allows long Listening metadata to wrap instead of widening the stage', () => {
    expect(rule('.bhead .tago')).toContain('white-space:normal');
    expect(rule('.listen-card')).toContain('min-width:0');
    expect(rule('.listen-card .wk')).toContain('flex-wrap:wrap');
    expect(rule('.listen-card .wk .tago')).toContain('white-space:normal');
  });
});
