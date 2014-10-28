# ng-notifications-bar

[Angular.js](https://angularjs.org/), [Animate.css](http://daneden.github.io/animate.css), [Glyphicons](http://glyphicons.com/), based component for stylish and flexible application notifications.

[Demo](http://beletsky.net/ng-notifications-bar)

## Overview

Web applications requires notify users of ongoing events. Common cases are errros, successful completion notifications etc. With `ng-notifications-bar` it's as easy as,

```html
<body>
	<notifications-bar class="notifications"></notifications-bar>
	...
```

## Installation 

Npm installation,

```bash
$ npm install angular-notifications-bar --save
```

Or bower installation,

```bash
$ bower install angular-notifications-bar --save
```

Update your scripts section or use the require for browserified applications.

```html
<script scr="bower_components/angular-notifications-bar/dist/angular-notifications-bar.min.js"></script>
```

In application module,

```js
angular.module('app', ['ngNotificationsBar']);
```

## API

The module consists of there elements - directive, service and provider.

### Directive

`notifications-bar` element directive, should be placed once, typically righ after `<body>` open tag.

```html
<notifications-bar class="notifications"></notifications-bar>
```

Possible to use as attribute, as well

```html
<div notifications-bar class="notifications"></div notifications-bar>
```

### Service

`notification` service is used by controllers (or other directives), to show notifications.

```js
app.controllers('app', function ($scope, api, notification) {
	api.get({resource: 'tasks'})
		.then(function (tasks) {
			$scope.tasks = tasks;
		}, function (error) {
			notification.showError({message: error.message});
		});

	$scope.submitTask = function () {
		api.post({resouce: 'tasks'}, {description: this.description})
			.then(function () {
				notification.showSuccess({message: 'Your task posted successfully'});
			}, function (error) {
				notification.showError({message: 'Oh no! Task submition failed, please try again.'});
			});
	}
});
```

### Provider

`notificationConfigProvider` is used to override some notifications bar defaults.

```js
app.config(['notificationConfigProvider'], function (notificationConfigProvider) {
	// predefined messages
	notificationConfigProvider.setMessage('error', 'Sorry, something bad just happend. Please try it again.');
	notificationConfigProvider.setMessage('success', 'Congrats! The operation completed successully.');

	// animation config
	notificationConfigProvider.animationMethod('fadeInDown')
}])
```

## Licence (MIT)

Copyright (c) 2014, alexander.beletsky@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
