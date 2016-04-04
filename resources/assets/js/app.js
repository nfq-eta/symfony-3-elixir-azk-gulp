window.$ = window.jQuery = require('jquery');
var Vue = require('vue');
require('bootstrap-sass');

Vue.config.delimiters = ['${', '}'];

new Vue({
    el: 'body',
    data: {
        items: [
            {message: 'Foo'},
            {message: 'Bar'}
        ],
        value: 'This is input text'
    },
    methods: {
        greet: function (event, param) {
            // `this` inside methods point to the Vue instance
            alert('Hello ' + event + '!');
            // `event` is the native DOM event
            alert(event.target.tagName);
        }
    }
});

