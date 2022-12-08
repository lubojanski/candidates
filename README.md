# Installation

#### First, install packages :

```bash
npm i
# or
yarn
```

#### Then, create a .env file that should be a copy of ./example.env file

( I'm not saying that it should be the same as example.env.. but it should :) I'm just not comfortable with saving .env to repo )

#### Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

#### How did you decide which technologies to use as part of your solution?

Given small amount of time I decided to go with technology that I'm most comfortable with - Next.js.
It is performant, allows easy implementation of SSR and also it can be "almost called official React framework" ( check this out: https://youtu.be/_w0Ikk4JY7U?t=186).
I've used MaterialUI as it delivers prebuilt and accessible components that do not require much of customization to look good in a short time.
For styling I used Emotion as it suggested by MaterialUI in v.5 .
For testing I decided to use my favourite tool - Cypress.io, it's easy to use and covers what's most important on Front-End - how application appears to the end users.

#### Are there any improvements you could make to your submission?

- Add unit tests
- Extend e2e tests
- Mobile view - hide sidepanel when profile is selected, if that wasn't conflicting with requirement ( Step 1 should be visible when a candidate is picked. ).
- Store candidateId in url to enable direct links
- Add pagination
- Add login functionality
- Allow multiple comments
- Support multiple applications
- Add error handling
- Add animations
- Add header/navigation bar
- Add tests to GitHub actions
- Pay more attention to accessibility
- Host the application so you wouldn't have to install it on your own.

#### What would you do differently if you were allocated more time?

I would create my own components instead of using MaterialUI
I would do client-side caching with react-query ( Application Details)
