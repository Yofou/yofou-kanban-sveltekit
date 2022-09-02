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

test('When hitting the login/api endpoint with valid body struct return 200 status', async ({ request }) => {
	
	await request.post('/sign-up/api', {
		data: JSON.stringify({
			username: 'testing123',
			email: 'testing123@gmail.com',
			password: 'password123',
			confirm: 'password123'
		})
	})

	const response = await request.post("/login/api", {
		data: JSON.stringify({
			email: 'testing123@gmail.com',
			password: 'password123'
		})
	})

	expect(response.ok()).toBeTruthy()
})

test('When hitting the login/api endpoint with invalid body struct return 400 status', async ({ request }) => {
	const response = await request.post("/login/api", {
		data: JSON.stringify({})
	})

	expect(response.status()).toBe(400)
})
