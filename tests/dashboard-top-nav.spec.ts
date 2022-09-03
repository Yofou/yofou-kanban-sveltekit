import test, { expect } from "@playwright/test";

test('Inside dashboard the options dropdown should open on click and close on click out', async ({ page }) => {
	await page.request.post('/login/api', {
		data: JSON.stringify({
			email: 'testing123@gmail.com',
			password: 'password123'
		})
	})

	await page.goto('/dashboard')
	expect(page.url()).toContain('dashboard')

	const nav = page.locator('nav')
	const optionAction = page.locator('nav div.relative > button')

	await optionAction.click()
	expect(await nav.locator('div.relative > div').isVisible()).toBeTruthy()

	await nav.click()
	await page.waitForTimeout(100)
	expect(await nav.locator('div.relative > div').isVisible()).toBeFalsy()
})

test('Inside dashboard the options dropdown should allow the user to logout', async ({ page }) => {
	await page.request.post('/login/api', {
		data: JSON.stringify({
			email: 'testing123@gmail.com',
			password: 'password123'
		})
	})

	await page.goto('/dashboard')
	expect(page.url()).toContain('dashboard')

	const nav = page.locator('nav')
	const optionAction = page.locator('nav div.relative > button')

	await optionAction.click()
	await nav.locator('div.relative > div').locator('text=Logout').click()

	await page.waitForNavigation()
	expect(page.url()).toContain('login')
})
