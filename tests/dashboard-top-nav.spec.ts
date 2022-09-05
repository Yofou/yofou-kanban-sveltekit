import test, { expect } from "@playwright/test";
import { SignUpAndLogin } from "./dashboard-utils.js";

test('Inside dashboard the options dropdown should open on click and close on click out', async ({ page }) => {
	await SignUpAndLogin(page)

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
	await SignUpAndLogin(page)

	await page.goto('/dashboard')
	expect(page.url()).toContain('dashboard')

	const nav = page.locator('nav')
	const optionAction = page.locator('nav div.relative > button')

	await optionAction.click()
	await nav.locator('div.relative > div').locator('text=Logout').click()

	await page.waitForNavigation()
	expect(page.url()).toContain('login')
})

test('Inside dashboard the options dropdown should allow the user to delete there own account', async ({ page }) => {
	await SignUpAndLogin(page)

	await page.goto('/dashboard')
	expect(page.url()).toContain('dashboard')

	const nav = page.locator('nav')
	const optionAction = page.locator('nav div.relative > button')

	await optionAction.click()
	await nav.locator('div.relative > div').locator('text=Delete Account').click()

	await page.locator('nav + div').locator('text=Delete').last().click()
	await page.waitForNavigation()
	expect(page.url()).toContain('login')
})
