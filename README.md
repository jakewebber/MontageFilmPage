## Infinite Scrolling / Pagination:
When implementing infinite scrolling, it's important to determine whether the actual loading of the next content section is going to come from preloading the entire data collection from the server to store client-side or whether it will have to be done in parts server-side as scrolling continues. 

Preloading the entire collection provides the benefit of quick response time with the UI, but is less feasible for larger collections of data due to a larger initial overhead load.  

For larger data sets: the partial fetching from the server during scroll is best done by fetching larger portions of the data collection than needed for the display. This minimizes the wait time for the next iteration of the page as scrolling continues.

To fire the loading function, we need to check if the user has hit the bottom of the page. This can be done by checking if  

```current window or viewport height ``` + ```current distance from top``` == ``` total document height ```

in a scroll event listener.



In both loading scenarios we'll need to store variable of total items loaded client-side. This ```entryCount``` will be used to keep track of what index to start at for the next loading batch. If we're fetching larger portions of data than being displayed, we'll need a count for the total displayed from the last load as well to know the index for where to start our display function. The collection should be an ordered data type like a list or array rather than a hashtable so that the skip index can be implemented. 

To determine if we've reached the end of the total collection, we will store the count of total entries in the collection in the database. if ```totalEntries``` != ```entryCount```, we can continue firing our fetch function when the user scrolls to bottom. Otherwise, the entire collection has been fetched. 

Another constant variable will store the ```take``` amount. Every time we fetch that ```take``` amount from the database, the ```count``` will increment by that amount. 
```javascript
const takeAmount = 50;
var skipIndex = 0;
function fetch(){
  // open db connection
   var collection = dbSource.getOrderedData().skip(amount).take(index);
   skipIndex += collection.length; // store new skip amount for next fetch.
}
```





![screenshot](https://github.com/jakewebber/MontageFilmPage/blob/master/pctLjuM.jpg)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
