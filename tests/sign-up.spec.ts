import { expect, test } from '@playwright/test';

test('When entering sign-up for the first time, we should be in dark theme', async ({ page }) => {
	await page.goto('/sign-up');
	await expect(page.locator('.contents')).toHaveClass(/dark/g);
});

test('When theme switched clicked for first time swap to light theme', async ({ page }) => {
	await page.goto('/sign-up');
	await page.locator('nav button').click();
	await expect(page.locator('.contents')).not.toHaveClass(/dark/g);
});

test('When hitting sign-up/api endpoint with valid body we should expect a status 200', async ({ request }) => {
	const response = await request.post('/sign-up/api', {
		data: JSON.stringify({
			username: 'testingtestingtesting123',
			email: 'testing@example.com',
			password: 'testingtestingtesting123',
			confirm: 'testingtestingtesting123'
		})
	});

	expect(response.status()).toBe(200);
	await request.delete('/user')
});

test('When hitting sign-up/api endpoint with invalid body we should expect a status 400', async ({ request }) => {
	const response = await request.post('/sign-up/api', {
		data: JSON.stringify({})
	});

	expect(response.status()).toBe(400);
	expect(await response.json()).toMatchObject({
		_errors: [],
		confirm: { _errors: ['Required'] },
		email: { _errors: ['Required'] },
		password: { _errors: ['Required'] },
		username: { _errors: ['Required'] }
	});
});

test('When hitting sign-up/api endpoint with invalid input we should expect validators to throw the correct errors', async ({ request }) => {
	const response = await request.post('/sign-up/api', {
		data: JSON.stringify({
			username: 'bgf', // under 5 characters
			email: 'not-a-valid-email',
			password: 'onetwo3', // under 8 characters
			confirm: 'does-not-match' // make sure confirm password does not match password field
		})
	});

	expect(response.status()).toBe(400);
	expect(await response.json()).toMatchObject({
		_errors: [],
		confirm: { _errors: ['Password & Confirm does not match'] },
		email: { _errors: ['Must be a valid email'] },
		password: { _errors: ['String must contain at least 8 character(s)'] },
		username: { _errors: ['Username must have atleast 5 characters'] }
	});
});

test('When not filling out the sign up form, our validation errors should show up on the screen', async ({ page }) => {
	await page.goto("/sign-up")
	await page.locator('form button').click();

	expect(await page.locator('label:has(input[name="username"])').locator('span').innerText()).toBe('Username must have atleast 5 characters')
	expect(await page.locator('label:has(input[name="email"])').locator('span').innerText()).toBe('Must be a valid email')

	const password = page.locator('label:has(input[name="new-password"])').nth(0)
	const confirm = page.locator('label:has(input[name="new-password"])').nth(1)
	expect(await password.locator('span').innerText()).toBe('String must contain at least 8 character(s)')
	expect(await confirm.locator('span').innerText()).toBe('String must contain at least 8 character(s)')

	await password.locator('input').fill('testingtesting123'),
	await confirm.locator('input').fill('testingtesting321')
	await page.locator('form button').click();
		
	expect(await confirm.locator('span').innerText()).toBe('Password & Confirm does not match')
})

test('When filling out the sign up form with a valid a new account we should be redirected to dashboard', async ({ page, request }) => {
	await page.goto("/sign-up")

	const username = page.locator('input[name="username"]')
	const email = page.locator('input[name="email"]')
	const password = page.locator('input[type="password"]').nth(0)
	const confirm = page.locator('input[type="password"]').nth(1)
	const submit = page.locator('form button')

	await username.fill('dummyacc123'),
	await email.fill('dummyacc123@gmail.com'),
	await password.fill('testingtesting123'),
	await confirm.fill('testingtesting123'),

	await submit.click()
	await page.waitForNavigation()

	expect(page.url()).toContain('dashboard')
	await page.request.delete('/user')
})
