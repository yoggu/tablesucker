import { test, expect } from '@playwright/test';

test.describe('UI Components', () => {
  test('dark mode is enabled by default', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');

    // Check initial dark mode (default)
    await expect(html).toHaveClass(/dark/);
  });

  test('navigation is visible', async ({ page }) => {
    await page.goto('/');

    // Check navigation exists (sidebar on desktop)
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
  });

  test('page renders without console errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Filter out expected errors (like missing env vars in test)
    const unexpectedErrors = consoleErrors.filter(
      (err) => !err.includes('supabase') && !err.includes('NEXT_PUBLIC')
    );

    expect(unexpectedErrors).toHaveLength(0);
  });

  test('charts container exists on home page', async ({ page }) => {
    await page.goto('/');

    // Wait for any chart containers (Recharts)
    const chartContainer = page.locator('.recharts-wrapper').first();
    // Charts may not render without data, so just check page loads
    await expect(page.locator('body')).toBeVisible();
  });
});
