import { test, expect } from '@playwright/test';

test.describe('E2E Critical Flows', () => {
  test('Homepage loads correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/ETH Events/);
  });

  test('Can navigate to submit event page', async ({ page }) => {
    await page.goto('/');
    
    // Find the link to submit an event
    const submitLink = page.locator('a[href="/submit"]').first();
    await expect(submitLink).toBeVisible();
    await submitLink.click();
    
    // Check if we are on the submit page
    await expect(page).toHaveURL(/.*\/submit/);
  });

  test('Admin dashboard secret requires authentication', async ({ page, request }) => {
    // Attempting to access the admin page directly should result in a 401 Unauthorized
    // due to our Basic Auth middleware.
    const response = await request.get('/admin-dashboard-secret');
    expect(response.status()).toBe(401);
  });

  test('Custom 404 page is displayed for invalid routes', async ({ page }) => {
    const response = await page.goto('/ruta-inexistente-123');
    expect(response?.status()).toBe(404);
    await expect(page.locator('text=Llegaste al vacío')).toBeVisible();
  });
});
