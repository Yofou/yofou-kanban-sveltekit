import { expect, test } from '@playwright/test';

test('when going to base route of the domain should redirect to login page', async ({ page }) => {
	await page.goto('/');
	expect(page.url()).toContain('/login')
});
