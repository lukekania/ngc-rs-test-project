import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';
import { APP_CONFIG } from './features/di-pipes-directives/tokens/app-config.token';
import { FEATURE_FLAGS } from './features/di-pipes-directives/tokens/feature-flags.token';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: APP_CONFIG, useValue: { appName: 'test', apiBase: 'http://localhost' } },
        { provide: FEATURE_FLAGS, useValue: ['protected-route'], multi: false },
      ],
    }).compileComponents();
  });

  it('creates the App component', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the topbar with the brand link', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.topbar')).not.toBeNull();
    expect(el.querySelector('.brand')?.textContent).toContain('Angular feature reference');
  });
});

describe('routes', () => {
  it('declares all expected feature paths', () => {
    const paths = routes.map((r) => r.path);
    for (const p of [
      '',
      'signals',
      'defer',
      'host-directives',
      'host-bindings',
      'animations',
      'svg',
      'scss',
      'i18n',
      'package-imports',
      'exports-conditions',
      'service-worker',
      'web-worker',
      'index-html-options',
      'di',
      'forms',
      'http',
      'routing-patterns',
    ]) {
      expect(paths).toContain(p);
    }
  });

  it('configures routing-patterns with three children including a guarded protected route', () => {
    const parent = routes.find((r) => r.path === 'routing-patterns');
    expect(parent?.children?.length).toBe(3);
    const protectedRoute = parent?.children?.find((c) => c.path === 'protected');
    expect(protectedRoute?.canActivate?.length).toBeGreaterThan(0);
    expect(protectedRoute?.canMatch?.length).toBeGreaterThan(0);
  });
});
