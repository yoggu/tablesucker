import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('home page loads', async ({ page }) => {
    await page.goto('/');
    // Check that the page loads without errors
    await expect(page.locator('body')).toBeVisible();
  });

  test('players page loads', async ({ page }) => {
    await page.goto('/players');
    await expect(page.locator('body')).toBeVisible();
  });

  test('seasons page loads', async ({ page }) => {
    await page.goto('/seasons');
    await expect(page.locator('body')).toBeVisible();
  });

  test('player detail page loads', async ({ page }) => {
    await page.goto('/players');
    // Click first player if exists
    const playerLink = page.locator('a[href^="/players/"]').first();
    if (await playerLink.isVisible({ timeout: 5000 }).catch(() => false)) {
      await playerLink.click();
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('season detail page loads', async ({ page }) => {
    await page.goto('/seasons');
    const seasonLink = page.locator('a[href^="/seasons/"]').first();
    if (await seasonLink.isVisible({ timeout: 5000 }).catch(() => false)) {
      await seasonLink.click();
      await expect(page.locator('body')).toBeVisible();
    }
  });
});
