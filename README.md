# Authentication Inspector
This is an extension for Chrome that allows you to inspect the authentication headers for network requests. 

It is useful for debugging authentication issues, copying the authentication token, and viewing the contents of a token.

It saves the need of having to manually inspect the network requests in the dev tools to find/copy the authentication token.

It also replaces the need to navigate to jwt.io to decode the token.

## Installation
1. Clone the repository
2. Run `npm install`
3. Run `npm run build`
4. Navigate to `chrome://extensions/`
5. Enable developer mode
6. Click "Load unpacked"
7. Select the `dist` folder
8. The extension should now be installed
9. See the "Usage" section below

## Usage
Launch the dev tools in your browser (f12).

Navigate to the "Auth Inspector" tab.

*** You must have the Auth Inspector tab open to capture network requests ***

Navigate through some webapp that uses authentication requests.

Any request that has an authentication header will be displayed in the "Auth Inspector" tab.

Click on the "value" column to copy the token to your clipboard.

Click on the "expand" button to view the contents of the token.

## Build Framework
Build using https://crxjs.dev/vite-plugin/. This is a Vite plugin that allows you to build Chrome extensions using Vite.

## TODO
- Capture network requests when dev tools are launched, instead of when the Auth Inspector tab is clicked on
- Add support for other types of authentication tokens
- Add tests - currently there are no tests
- Refactor - first draft is a bit messy
- CSS - make it look nicer