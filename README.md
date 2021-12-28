# Equity Tool (AKA Equitable Development Data Tool)

### Setup
1.  Install project
```
git  clone git@github.com:NYCPlanning/equity-tool.git
cd equity-tool
npm i
```

This command should install all necessary dependencies and set up Husky to run on all commits

2. Create `.env.local` and set the required environment variables.


### Running locally
To run the Nextjs dev server, run:
```
npm run dev
```

You can also run unit tests or the linter by running `npm run test` or `npm run lint`, respectively.

### Tests
Run the suite of Jest tests under `/test`
```
npm run test
```



## Attribution

This project was originally bootstrapped via `create-next-app` using the `with-chakra-ui-typescript` preset

Additional project boilerplate and configuration was drawn from:
* https://github.com/Lukazovic/nextjs-with-chakra-ui-boilerplate
* https://github.com/tim-richter/next-boiler
