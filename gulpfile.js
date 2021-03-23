// let project_folder = 'dist';
let project_folder = 'docs';
let source_folder = '#src';
const wait = require('gulp-wait');

let fs = require('fs');

// let path = {
//     build: {
//         html: `${project_folder}/`,
//         css: `${project_folder}/css/`,
//         js: `${project_folder}/js/`,
//         img: `${project_folder}/img/`,
//         fonts: `${project_folder}/fonts/`
//     },
//     src: {
//         html: [`${source_folder}/*.html`, `!${source_folder}/_*.html`],
//         css: `${source_folder}/scss/style.scss`,
//         js: `${source_folder}/js/script.js` + '',
//         img: `${source_folder}/img/**/*.{jpg,png,svg,gif,ico,webp}`,
//         fonts: `${source_folder}/fonts/*.ttf`
//     },
//     watch: {
//         html: `${source_folder}/**/*.html`,
//         css: `${source_folder}/scss/**/*.scss`,
//         js: `${source_folder}/js/**/*.js`,
//         img: `${source_folder}/img/**/*.{jpg,png,svg,gif,ico,webp}`,
//     },
//     clean: `./${project_folder}/`
// }

let path = {
    build: {
        html: `${project_folder}/`,
        css: `${project_folder}/`,
        js: `${project_folder}/`,
        img: `${project_folder}/`,
        fonts: `${project_folder}/`
    },
    src: {
        html: [
            `${source_folder}/**/*.html`,
            `!${source_folder}/**/_*.html`,
            `!${source_folder}/**/#template/**/*.html`
        ],
        css: [
            `${source_folder}/**/style.scss`,
            `!${source_folder}/**/#template/**/*.scss`
        ],
        js: [
            `${source_folder}/**/js/script.js`,
            `!${source_folder}/**/#template/**/*.js`
        ],
        img: `${source_folder}/**/img/**/*.{jpg,png,svg,gif,ico,webp}`,
        fonts: `${source_folder}/**/fonts/*.{ttf,eot,woff,woff2}`
    },
    watch: {
        html: `${source_folder}/**/*.html`,
        css: `${source_folder}/**/*.scss`,
        js: `${source_folder}/**/*.js`,
        img: `${source_folder}/**/*.{jpg,png,svg,gif,ico,webp}`,
    },
    clean: `./${project_folder}/`
}

let {src, dest} = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    fileinclude = require('gulp-file-include'),
    del = require('del'), // удаление папки
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    group_media = require('gulp-group-css-media-queries'),
    clean_css = require('gulp-clean-css')
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify-es').default,
    babel = require('gulp-babel'),
    imagemin = require('gulp-imagemin'),
    webp = require('gulp-webp'),
    webphtml = require('gulp-webp-html'),
    webpcss = require('gulp-webp-css'),
    svgSprite = require('gulp-svg-sprite'),
    ttf2woff = require('gulp-ttf2woff'),
    ttf2woff2 = require('gulp-ttf2woff2'),
    fonter = require('gulp-fonter'),
    htmlbeautify = require('gulp-html-beautify');


function browserSync() {
    browsersync.init({
        server: {
            baseDir: './' + project_folder + '/',
        },
        port: 3000,
        notify: false
    });
}

function html() {
    const options = {
        indentSize: 4,
        unformatted: [
            'abbr', 'area', 'b', 'bdi', 'bdo', 'br', 'cite',
            'code', 'data', 'datalist', 'del', 'dfn', 'em', 'embed', 'i', 'ins', 'kbd', 'keygen', 'map', 'mark', 'math', 'meter', 'noscript',
            'object', 'output', 'progress', 'q', 'ruby', 's', 'samp', 'small',
            'strong', 'sub', 'sup', 'template', 'time', 'u', 'var', 'wbr', 'text',
            'acronym', 'address', 'big', 'dt', 'ins', 'strike', 'tt', 'a'
        ],
        "indent_char": " ",
        "indent_level": 0,
        "indent_with_tabs": false,
    };


    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(webphtml())
        .pipe(htmlbeautify(options))
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream()); // обновить страницу
}

function css() {
    return src(path.src.css)
        .pipe(wait(1000))
        .pipe(fileinclude())
        .pipe(scss({
            outputStyle: "expanded"
        }))
        .pipe(group_media()) // группирует медиа запросы
        .pipe(autoprefixer({ // добавляет вендорные префиксы
            overrideBrowserslist: ["last 5 versions"],
            cascade: true
        }))
        .pipe(webpcss())
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream());
}

function js() {
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(babel({ // изменение кода для старых браузеров
            ignore: [
                "node_modules/**"
            ],
            presets: [
                [
                    "@babel/preset-env",
                    {
                        "modules": false,
                        "targets": {
                            "esmodules": true
                        }
                    }
                ]
            ],
            sourceMap: false,
            plugins: [
                "@babel/plugin-proposal-class-properties",
            ]
        }))
        .pipe(dest(path.build.js))
        .pipe(uglify()) // сжатие
        .pipe(rename({
            extname: ".min.js"
        }))
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream());
}

function images() {
    return src(path.src.img)
        .pipe(webp({
            quality: 90,
        }))
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true,
            optimizationLevel: 6 // 0 to 7
        }))
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream());
}


function fonts() {
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts))
}



gulp.task('otf2ttf', function() {
    return src([source_folder + '/#assets/fonts/*.otf'])
    .pipe(fonter({
        format: ['ttf']
    }))
    .pipe(dest(source_folder + '/#assets/fonts/'))
})


gulp.task('svgSprite', () => {
    return gulp.src([source_folder + '/iconsprite/*.svg'])
        .pipe(svgSprite({
            mode: {
            stack: {
                sprite: "../networks/networks.svg", // sprite file name
                // example: true
            }
            }
        }))
        .pipe(dest(path.build.img))
})

gulp.task('img', () => {
    return gulp.src([source_folder + '/iconsprite/*.svg'])
        .pipe(svgSprite({
            mode: {
            stack: {
                sprite: "../networks/networks.svg", // sprite file name
                // example: true
            }
            }
        }))
        .pipe(dest(path.build.img))
})


function fontsStyle() {
    let file_content = fs.readFileSync(source_folder + '/#assets/scss/fonts.scss');
    if (file_content == '') {
        fs.writeFile(source_folder + '/#assets/scss/fonts.scss', '', cb);
        return fs.readdir(path.build.fonts, function(err, items) {
        if (items) {
            let c_fontname;
            items.forEach(item => {
                let fontname = item.split('.')[0];
                if (c_fontname != fontname) {
                    fs.appendFile(`${source_folder}/#assets/scss/fonts.scss`, `@include font("${fontname}", "${fontname}", "400", "normal");\n`, cb);
                }
                c_fontname = fontname;
            })
        }
        })
    }
}

function cb() {}

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
}

function clean() {
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(fonts, images, js, css, html), fontsStyle); // функции кот должны выполняться
let watch = gulp.parallel(build, watchFiles, browserSync);

// exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
