/**
 * To learn more about Playwright Test visit:
 * https://www.checklyhq.com/docs/browser-checks/playwright-test/
 * https://playwright.dev/docs/writing-tests
 */

import { test, expect } from '@playwright/test'

// Set the action timeout to 10 seconds to quickly identify failing actions.
// By default Playwright Test has no timeout for actions (e.g. clicking an element).
// Learn more here: https://www.checklyhq.com/docs/browser-checks/timeouts/
test.use({ actionTimeout: 10000 })

test('evaluate performance metrics', async ({ page }) => {
  // Change checklyhq.com to your site's URL,
  // or, even better, define a ENVIRONMENT_URL environment variable
  // to reuse it across your browser checks
  await page.goto(process.env.ENVIRONMENT_URL || 'https://your.nextstep.is/')

  // Inject a PerformanceObserver and access web performance metrics
  const LCP = await page.evaluate(() => {
    return new Promise((resolve) => {
      new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const LCP = entries.at(-1)
        resolve(LCP.startTime)
      }).observe({
        type: 'largest-contentful-paint',
        buffered: true
      })
    })
  })

  // Add custom assertions to fail your check
  // if your web performance degraded
  console.log('Largest Contentful Paint', parseInt(LCP, 10))
  expect(parseInt(LCP, 10)).toBeLessThan(6000)
})
