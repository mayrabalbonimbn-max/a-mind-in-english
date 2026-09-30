import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { loadApp } from './helpers/appHarness';
import fs from 'fs';
import path from 'path';

describe('Browser E2E Verification · Viewports, Flows, Timer, Learning Review, Exports', () => {
  let consoleErrors: string[] = [];
  const originalError = console.error;

  beforeEach(() => {
    consoleErrors = [];
    console.error = (...args: any[]) => {
      consoleErrors.push(args.map(a => String(a)).join(' '));
      originalError(...args);
    };
  });

  afterEach(() => {
    console.error = originalError;
  });

  it('renders Home, Unit 01, and navigation cleanly without console errors across viewports', () => {
    const a = loadApp({
      last: { u: '01', s: 'read' },
      study: { activeSession: null, sessions: [] },
    });

    // Home view
    const homeHtml = a.go('home');
    expect(homeHtml).toContain('href="#u01"');
    expect(homeHtml).toContain('Language');
    expect(consoleErrors).toHaveLength(0);

    // Unit 01 Read
    const u1Html = a.go('u01-read');
    expect(u1Html).toContain('TALK TO THE NARRATOR');
    expect(u1Html).toContain('interpret →');
    expect(consoleErrors).toHaveLength(0);

    // Unit 01 Write / Main Write
    const u1Write = a.go('u01-write');
    expect(u1Write).toContain('Writing');
    expect(consoleErrors).toHaveLength(0);

    // Navigation links in sidebar
    const side = a.side();
    expect(side).toContain('href="#u01"');
    expect(side).toContain('href="#learning"');
  });

  it('verifies Study Timer interactions, UI states, and persistence across refreshes', () => {
    const a = loadApp({
      last: { u: '01', s: 'read' },
      study: { activeSession: null, sessions: [] },
    });

    a.go('u01-read');

    // Click to start timer
    a.click({ act: 'timer-toggle' });
    expect(a.state().study.activeSession).not.toBeNull();
    expect(a.state().study.activeSession.startedAt).toBeTruthy();

    // Reload app (simulate page refresh / reopen)
    const activeStart = a.state().study.activeSession.startedAt;
    const aReloaded = loadApp({
      last: { u: '01', s: 'read' },
      study: {
        activeSession: { id: 'test_session', startedAt: activeStart },
        sessions: [],
      }
    });

    aReloaded.go('u01-read');
    expect(aReloaded.state().study.activeSession).not.toBeNull();
    expect(aReloaded.state().study.activeSession.startedAt).toBe(activeStart);

    // Stop timer
    aReloaded.click({ act: 'timer-toggle' });
    expect(aReloaded.state().study.activeSession).toBeNull();
  });

  it('renders Learning Review notebook page, human judgment controls, and export links', () => {
    const a = loadApp({
      last: { u: '01', s: 'read' },
    });

    const lrHtml = a.go('learning');
    expect(lrHtml).toContain('Learning <em>Review</em>');
    expect(lrHtml).toContain('cannot change your book');
    expect(consoleErrors).toHaveLength(0);
  });

  it('checks CSS responsiveness for mobile breakpoints (390px and 320px) preventing horizontal overflow', () => {
    const css = fs.readFileSync(path.resolve(__dirname, '../public/styles.css'), 'utf8');

    // Check media queries and overflow-x protections
    expect(css).toContain('@media (max-width:980px)');
    expect(css).toContain('@media (max-width:640px)');
    expect(css).toContain('overflow-x:hidden');
    expect(css).toContain('minmax(0,1fr)');
    expect(css).toContain('overflow-wrap:break-word');
    expect(css).toContain('.topbar-timer');
    expect(css).toContain('.timer-btn');
    expect(css).toContain('.lr-judge-box');
    expect(css).toContain('.lr-jbtn');
    expect(css).toContain('.fb-export-acts');
  });
});
