# This is a Next.js application that displays Posts feed and allows to navigate to particular post details.

Features:

- Posts feed with infinite scroller
- New posts are added by live data update(highlighted in the green)

Technologies Used:

- Next.js (App router mode)
- TypeScript
- RTK Query - as state-manager
- sass
- cx - classnames library(to display class list depending on conditions)
- vitest - testing framework
- faker-js - for mocked data

## Initial setup

Go to your project root folder and launch in terminal

```
nvm use
npm install
```

## Configuration of the app:

There is `.env` file, you can configure it.

```
NEXT_PUBLIC_API_URL=your.api.url
```

- to emulate live data - use this combination:

```
NEXT_PUBLIC_EMULATE_LIVE_DATA=true
NEXT_PUBLIC_LIVE_DATA_INTERVAL=5000
```

## Run in Development mode:

- build and run: `npm run dev`

## Run in Production mode:

- execute `npm run start`

## Git default settings:

- before each commit `prettier` will be run
