import { test, expect } from "@playwright/test"

test("check when calling /theme we're getting valid responses", async ({ request }) => {
	const response = await request.post("/theme")
	expect(response.ok()).toBeTruthy()
	expect(await response.json()).toStrictEqual({
			theme: 'light'
	})

	// when repeating the call again we should get dark
	const response2 = await request.post("/theme")
	expect(response2.ok()).toBeTruthy()
	expect(await response2.json()).toStrictEqual({
			theme: 'dark'
	})
})

test("check when calling /theme make sure we're not getting invalid responses", async ({ request }) => {
	const response = await request.post("/theme")
	expect(response.ok()).toBeTruthy()
	expect(await response.json()).not.toStrictEqual({
			theme: 'dark'
	})

	// when repeating the call again we should not get light
	const response2 = await request.post("/theme")
	expect(response2.ok()).toBeTruthy()
	expect(await response2.json()).not.toStrictEqual({
			theme: 'light'
	})
})
