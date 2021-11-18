# Next-Chakra-Boilerplate

## Features
* Typescript
* React with Next.js
* Set up to use `chakra-ui` for components and styling
* Code Quality with `eslint`, `prettier`, and `tsc` for type checking
* Git hooks with `husky` and `lint-staged`
* Unit tests with `jest` and `react-testing-library`
* End to end testing with `cypress`

## How to use

### Setup
After cloning the repo our using as a template, simply run:

```bash
npm i
# or
yarn
```
This command should install all necessary dependencies and set up Husky to run on all commits

### Running locally
To run the Nextjs dev server, run:
```
npm run dev
```

You can also run unit tests or the linter by running `npm run test` or `npm run lint`, respectively.

## Attribution

This project was originally bootstrapped via `create-next-app` using the `with-chakra-ui-typescript` preset

Additional project boilerplate and configuration was drawn from:
* https://github.com/Lukazovic/nextjs-with-chakra-ui-boilerplate
* https://github.com/tim-richter/next-boiler
