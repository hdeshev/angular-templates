# Test Angular 2 project with custom templates running outside the browser.

## Running it locally

1. Clone the repo and cd to the local dir.
2. Fetch the angular2 submodule:

```sh
    git submodule --init
    git submodule --update
```

3. Install the npm requirements:

```sh
    npm install
```

4. Install the angular npm requirements:

```sh
    cd angular2
    npm install
    cd ..  # back to the project root
```

5. Install the angular typings:

```sh
    cd angular2/modules/angular2
    tsd reinstall
    cd ../../../  # back to the project root
```

6. Update the local angular2 codebase in src/angular2:

```sh
    grunt fixAngular
```

7. Compile the project:

```sh
    grunt ts
```

8. Compile & Run dist/app.js:

```sh
    grunt run
```
