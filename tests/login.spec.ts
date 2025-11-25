import { test, expect } from '@playwright/test';

test('login test', async ({ page }) => {
    await page.goto('https://callow.in/');

    // Click on loging link
    // await page.getByRole('link', { name: 'login' }).click();
    await page.getByRole('link', { name: 'login' }).first().click();


    // Expect a title "to contain" a substring.
    // await expect(page).toHaveTitle(/login/);
    await expect(page.getByRole('heading', { name: 'LOGIN IN YOUR ACCOUNT' })).toBeVisible();
})