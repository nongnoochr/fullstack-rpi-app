# Frontend - Fullstack Rpi App

## Before you start the development mode
Since this app is created for a fullstack rpi app, while developing the app in
the dev mode, we need to perform one of the followings before runs the app in the dev mode:

1. Start the Flask server
   * Note that the Flask server will generate a fake data if the app is developed
   on a machine that is not a raspberry pi

```
$ cd <project_root>
$ python server.py
```

2. If you do not want to spin up the Flask server while developing the app, 
update the `useLocalService` setting `package.json` to `true` to mock out the server

```
In package.json

{
    ...
    "useLocalService": true
}

```

## Development

1. Install the required packages:

```
$ yarn install
```

2. Runs the app in the development mode:

```
$ yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deployment

Builds the app for production to the `build` folder. The built app will be used and rendered by the server

```
$ yarn build
```

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.