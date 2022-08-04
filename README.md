# Simple sudoku game

## Intro
This is just one of my pet-projects. It's here on GitHub to share code samples easily.
But it hasn't completed yet. There are some known problems to solve in the future.
It isn't production code. It's just playground to play around with different tools. 

Try it yourself [here](https://sudoku.website.yandexcloud.net/).

## What's interesting here

### Multithreading computations

I generate new sudoku tasks in a separate thread not to block UI interaction.
I use [comlink library](https://github.com/GoogleChromeLabs/comlink) by [GoogleChromeLabs](https://github.com/GoogleChromeLabs).

### Offline mode

I supported offline mode by caching all critical resource at Service Worker. [WorkBox library](https://developer.chrome.com/docs/workbox/) is used for these aims.
Pay attention that the service-worker needs to be build separately.

### JS generators for real task

It's also a playground where I tried ECMAScript generators.
They came in handy when I checked consistency of the field.
Examples and tests are inside `src/model` folder. 

### State persistence

I keep the state in the browser storage. So even you reload the page, the state is still same.

### And more

I also played around with parcel bundler, styled-components, StoryBook and redux toolkit here.
You can find some code examples inside.

## Main commands

To start local development.
`npm run dev`

To launch tests.
`npm test`

To build main code.
`npm run build`

To build service worker. Run it only after previous command.
`npm run build-sw`

Now you can put files from `dist` folder on your favorite storage.
