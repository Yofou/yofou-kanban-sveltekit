import type { Page } from "@playwright/test"

export const SignUpAndLogin = async (page: Page) => {
	await page.request.post('/sign-up/api', {
		data: JSON.stringify({
			username: 'testingtestingtesting123',
			email: 'testing123@gmail.com',
			password: 'password123',
			confirm: 'password123',
		})
	})

	await page.request.post('/login/api', {
		data: JSON.stringify({
			email: 'testing123@gmail.com',
			password: 'password123'
		})
	})
}
