# DALI Dev Challenge
Last Updated: 12.1.2018
## Table of Contents
- Project Overview
- Developer Information
- Author
## Project Overview
This website visualizes data on DALI Lab Members and allows users to search, filter, and sort. The front-end is built using ReactJS. JSX is compiled using webpack and babel. You can view the site live at `dali-dev-challenge.surge.sh`.
## Developer Information
### Installation:
#### Tools:
- You will need node in order to build, run and develop this project
- Tool installation instructions (for mac, using homebrew)
	- `brew install node`
#### Project:
- Clone repository `git clone https://github.com/tmonfre/dali-dev-challenge/`
- Make sure you are on the branch master
- Navigate to `dali-dev-challenge/`
- To build `npm run build`
- To view locally `npm run start`
### Repo Structure
- Code for frontend development is contained in the `app/` directory
- Production distributed code is contained in the `src/` directory
#### Contents
- The root `index.html` page redirects to the `src/` directory
- Code constructing website pages is contained in `app/`
  - `index.html` is homepage 
  - `index.js` uses Ajax to create an HTTP GET request then builds the app starting with React component `<App />`
	- `components/` contains React class components
	- `styles/` contains CSS style files
#### Deploying Changes
- The frontend is deployed using surge, so first make sure you install surge if you don’t already have it
  - `npm install --global surge`
- Next navigate to the root directory
  - `npm run build`
  - `surge` then press enter when given a project prompt with the local directory you created after cloning the repository
- Visit http://dali-dev-challenge.surge.sh/ to see the project
## Author
- Thomas Monfre, Dartmouth College.
- tmonfre.github.io
- Find me on LinkedIn at https://www.linkedin.com/in/thomas-monfre-0b1a50164/
