# aria-feed

WAI ARIA 1.1 Feed structure implementation

## Specs

Please see all specs here http://w3c.github.io/aria-practices/#feed

## Usage

You could initialize this component in this way:

```js
import Feed from './Feed.js';
const feedElement = document.querySelector('[role="feed"]');
const beforeFeedElement = document.getElementById('before-feed');
const afterFeedElement = document.getElementById('after-feed');

if (feedElement && beforeFeedElement && afterFeedElement) {
	new Feed(feedElement, beforeFeedElement, afterFeedElement).init()
}
```

To reduce unnecessary complexity it is required to manually assign first focusable element before and after feed. 
It is required for <kdb>ctr+Home</kdb>, <kdb>ctr+End</kdb> functionality. More over, some feeds do not have ending so it could be overloaded to focus some other element. 
