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
            console.log({ event: event, param: param });
            alert('Works check the console');
        }
    }
});

