import { expect, test } from '@playwright/test';

test('When entering login for the first time, we should be in dark theme', async ({ page }) => {
	await page.goto('/login');
	await expect(page.locator(".contents")).toHaveClass(/dark/g)
});

test('When theme switched clicked for first time swap to light theme', async ({ page }) => {
	await page.goto('/login');
	await page.locator('nav button').click()
	await expect(page.locator(".contents")).not.toHaveClass(/dark/g)
});
