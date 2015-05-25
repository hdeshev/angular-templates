module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-file');

    grunt.initConfig({
        ts: {
            build: {
                src: [
                    'src/**/*.ts',
                ],
                outDir: 'dist',
                options: {
                    fast: 'never',
                    module: "commonjs",
                    target: "es5",
                    sourceMap: true,
                    declaration: true,
                    removeComments: false,
                    compiler: "node_modules/typescript/bin/tsc",
                    noEmitOnError: true
                },
            },
        },
        copy: {
            angularSource: {
                expand: true,
                rename: function(dest, src) {
                    if (/\.js$/i.test(src)) {
                        return dest + src.substring(0, src.length - 3) + '.ts';
                    }
                    if (/\.es6$/i.test(src)) {
                        return dest + src.substring(0, src.length - 4) + '.ts';
                    }
                    return dest + src;
                },
                cwd: './angular/modules',
                src: [
                    'angular2/**/*',
                    '!angular2/test/**/*',
                    '!angular2/angular2_sfx*',
                    '!angular2/router*',
                    '!angular2/src/router/**/*',
                    '!angular2/src/mock/**/*',
                    '!angular2/docs/**/*',
                    '!angular2/test*',
                    '!angular2/src/test_lib/**/*',
                ],
                dest: 'src/'
            },
            reflect: {
                expand: true,
                cwd: './node_modules',
                src: [
                    'reflect-metadata/reflect-metadata.d.ts',
                ],
                dest: 'src/'
            },
            distHtml: {
                expand: true,
                cwd: 'src',
                src: [
                    '*.html',
                ],
                dest: 'dist/'
            }
        },
        shell: {
            runApp: {
                command: 'NODE_PATH=dist node dist/app.js'
            }
        },
    });

    grunt.registerTask("run", ['ts',  'copy:distHtml', 'shell:runApp']);

    grunt.registerTask("fixAngular", [
        'cleanAngular',
        'copy:reflect',
        'copy:angularSource',
    ]);

    grunt.registerTask("cleanAngular", function() {
        grunt.file.delete('src/angular2');
        grunt.file.delete('src/reflect-metadata');
    })
}
