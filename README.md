# Taboola Home Assignment

This is a widget that will display a list of recommendations from the Taboola REST API.
The widget fetches content recommendations and displays them in a responsive grid layout.

An example of an actual widget:

![example-widget](readme-images/image.png)

We didnt had to stick with the design, it was just for reference.

### Rules:

- The widget will be responsive
- Vanilla JS only (got permission to use TypeScript)
- No frameworks or libraries, CSS and HTML only

### API Note

- I used a CORS proxy to fetch the API, because the API is needed to be fetched from USA.
- The proxy is: https://corsproxy.io/?key=4d9510c4 its my public api key, but i dont really care to share it as it a free tier anyways for localhost only.
- Your more than welcome to check them out: https://corsproxy.io/
- There is a limit of 100 requests per day, but i dont think we will reach that.
- Sometimes i have received an empty api response, so we just do several attempts to fetch the data.
### Prerequisites

- Node.js
- npm

You can download them from [nodejs.org](https://nodejs.org/)
and verify you have them using:

```bash
node -v
npm -v
```

As I wrote this, my node version is 22.11.0
and my npm version is 10.9.0


### Project Structure

```
Taboola-home-assig/
├── src/                    # Source files
│   ├── api/               # API related code
│   │   ├── taboolaAPI.ts  # API calls and retry logic
│   │   └── types.ts       # TypeScript interfaces should be moved to a type folder?
│   ├── components/        # Widget components
│   │   ├── RecommendationWidget.ts      # The main widget container
│   │   ├── IRecommendationItem.ts       # The recommendation item interface
│   │   ├── RecommendationItemFactory.ts     # Factory for creating recommendation items
│   │   └── SponsoredRecommendationItem.ts   # The recommendation item component
│   └── styles/           # CSS files
├── tests/                # Test files
├── dist/                # Compiled output exists after running npm run build
└── readme-images/       # Documentation images
```

### Installation

You can just use the npm install, to install the current package.json dependencies for both the project and the tests:

```bash
npm install
```


### Running the Tests

Will run the tests in the tests folder via Jest:

```bash
npm test
```
Nothing else is needed to run the tests.


### Running the Project

First we need to build the project,
so the TypeScript code will be transformed to JavaScript and will be in the dist folder:

```bash
npm run build
```

**What run Build does**:
- Transforms the TypeScript code to JavaScript
- Copies the CSS files to the dist folder
- Copies the HTML file to the dist folder

 **The copy script is based on windows commands, we werent allowed to use any other libraries, so i couldnt use a library like "copyfiles" that makes it platform independent**

 if your running on linux, you can just change the copy script to use the linux commands:

Currently the build script is:
```bash
"build": "tsc && xcopy src\\styles dist\\src\\styles /E /I /Y && copy src\\index.html dist\\index.html",
```

If you want to change it to linux commands, you can change it to:
```bash
"build": "tsc && cp -r src/styles dist/src/styles && cp src/index.html dist/index.html",
```


Then we can run the project:

```bash
npm start
```

This will run a live server, that will serve the project in the dist folder, usually on 127.0.0.1:8080.

**Ad blockers**:

- Ad blockers will block the image fetching, so please use incognito mode to see the project.

**Important note**: 
- We don't really use the "live" part of the live-server, cus we need to retransform the TypeScript code to JavaScript, when we change the JavaScript, so it's basically not needed.
I kept it anyways, a much better approach would be to use Vite, or a built in node http-server, in order to not install any other dependencies.


### Technical Limitations

**Browser Support**:
- Modern browsers only
- No IE11 support due to:
  - ES modules usage
  - Modern JavaScript features
  - Complexity with polyfills implementation

**Potential Solutions** (not implemented):
- Use a bundler 
- Different module format (broke my build process several times, so I decided to not use it) (like umd module)

This is why I chose to focus on modern browser support rather than potentially breaking the application with incomplete polyfill implementation.