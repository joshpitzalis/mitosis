const puppeteer = require('puppeteer');
const faker = require('faker');

const user = {
  email: faker.internet.email(),
  password: 'test'
};
const isDebugging = () => {
  const debugging_mode = {
    headless: false,
    slowMo: 250,
    devtools: true
  };
  return process.env.NODE_ENV === 'debug' ? debugging_mode : {};
};

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({});
  page = await browser.newPage();
  await page.goto(
    'http://localhost:3000/project/0x98c92E6bD45e95032c7fd8b254a96D20839EfA50'
  );
  page.viewport({
    width: 500,
    height: 2400
  });
});

describe('on page load', () => {
  test(
    'h1 loads correctly',
    async () => {
      const html = await page.$eval(
        `[data-test='projectTitle']`,
        e => e.innerHTML
      );
      expect(html).toBe('The Local Food Project');
    },
    16000
  );
});

test('Submit form load correctly', async () => {
  const submitForm = await page.$eval(
    `[data-test='submitForm']`,
    el => (el ? true : false)
  );
  const inputForm = await page.$$(`[data-test="addTaskInput"]`);
  expect(submitForm).toBeTruthy();
  expect(inputForm).toBeTruthy();
});

afterAll(() => {
  if (isDebugging()) {
    browser.close();
  }
});
