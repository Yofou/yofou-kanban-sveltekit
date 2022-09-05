import test, { expect } from "@playwright/test";
import { SignUpAndLogin } from "./dashboard-utils.js";

test('When on dashboard make sure you can open and close the sidebar', async ({ page }) => {
	await SignUpAndLogin(page)
	await page.goto('/dashboard')

	await page.locator('main button:has(img[src="/eye.svg"])').click()

	const aside = page.locator('aside')

	await page.waitForTimeout(250)
	expect(await aside.isVisible()).toBeTruthy()

	await aside.locator('text=Hide Sidebar').click()
	await page.waitForTimeout(500)
	expect(await aside.isVisible()).toBeFalsy()
})

test('When on dashboard aside is open we can switch from dark theme to light theme', async ({ page }) => {
	await SignUpAndLogin(page)
	await page.goto('/dashboard')

	await page.locator('main button:has(img[src="/eye.svg"])').click()

	const aside = page.locator('aside')
	await page.waitForTimeout(500)
	expect(await aside.isVisible()).toBeTruthy()

	await expect(page.locator('body > div').first()).toHaveClass(/dark/g)
	await page.locator('img[src="/sun.svg"] + button').click()
	await expect(page.locator('body > div').first()).not.toHaveClass(/dark/g)
})
