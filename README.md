First, install packages :

```bash
npm i
# or
yarn
```

then create a .env file that should be a copy of ./example.env file
( I'm not saying that it should be the same as example.env.. but it should :) I'm just not comfortable with saving .env to repo )

then run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

todo :

mobile - hide sidepanel when profile is selected, if that wasn't conflicting with requirement.
support multiple applications
pagination
errorHandling
animations
intl
accessibility
header/navigation bar
login
store candidateId in url to load details
add tests to ci/cd
