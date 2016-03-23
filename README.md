AZK
----------------

1. Install azk

    ```curl -sSL http://azk.io/install.sh | sh```
1. Run azk

    ```azk start -o -vv```
1. Connect to default container

    ```azk shell```
1. To display the status of containers

    ```azk status```
    
GULP
-------
1. Tu run all development tasks

    `gulp`
1. To run the js, scss files watcher

    `gulp watch`
    
1. To run the PHP tests
    
    `gulp tdd`

Advanced
--------
To serve the compressed production files need some addition helper

```php
if (! function_exists('elixir')) {
    /**
     * Get the path to a versioned Elixir file.
     *
     * @param  string  $file
     * @return string
     *
     * @throws \InvalidArgumentException
     */
    function elixir($file)
    {
        static $manifest = null;
        if (is_null($manifest)) {
            $manifest = json_decode(file_get_contents(public_path('build/rev-manifest.json')), true);
        }
        if (isset($manifest[$file])) {
            return '/build/'.$manifest[$file];
        }
        throw new InvalidArgumentException("File {$file} not defined in asset manifest.");
    }
}
```
