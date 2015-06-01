# Test Angular 2 project with custom templates running outside the browser.

## Running it locally

Clone the repo and cd to the local dir.

Fetch the angular2 submodule:

```sh
    git submodule --init
    git submodule --update
```

Install the npm requirements:

```sh
    npm install
```

Install the angular npm requirements:

```sh
    cd angular2
    npm install
    cd ..  # back to the project root
```

Install the angular typings:

```sh
    cd angular2/modules/angular2
    tsd reinstall
    cd ../../../  # back to the project root
```

Update the local angular2 codebase in src/angular2:

```sh
    grunt fixAngular
```

Compile the project:

```sh
    grunt ts
```

Compile & Run dist/app.js:

```sh
    grunt run
```
