const { src, dest, task, series, watch, parallel } = require("gulp");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
sass.compile = require("node-sass");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;
const sassGlob = require("gulp-sass-glob");
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const gcmq = require("gulp-group-css-media-queries");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const svgo = require("gulp-svgo");
const svgSprite = require("gulp-svg-sprite");
const gulpif = require("gulp-if");
const pug = require("gulp-pug");
const plumber = require("gulp-plumber");
const clean = require("gulp-clean");

const { SRC_PATH, DIST_PATH, STYLES_LIBS, JS_LIBS } = require("./gulpconfig");
const env = process.env.NODE_ENV;

const path = {
  build: {
    html: `${DIST_PATH}`,
    js: `${DIST_PATH}/js`,
    css: `${DIST_PATH}/css`,
    images: `${DIST_PATH}/img`,
    icons: `${DIST_PATH}/img/icons`,
    fonts: `${DIST_PATH}/fonts`,
  },
  src: {
    html: `${SRC_PATH}/**/*.html`,
    pug: `${SRC_PATH}/**/*.pug`,
    js: `${SRC_PATH}/js/*.js`,
    css: `${SRC_PATH}/style/main.scss`,
    images: `${SRC_PATH}/img/*.*`,
    icons: `${SRC_PATH}/img/icons/*.svg`,
    fonts: `${SRC_PATH}/fonts/**/*`,
  },
  watch: {
    html: `${SRC_PATH}/**/*.html`,
    pug: `${SRC_PATH}/**/*.pug`,
    js: `${SRC_PATH}/js/**/*.js`,
    css: `${SRC_PATH}/style/**/*.scss`,
    images: `${SRC_PATH}/img/*.*`,
    icons: `${SRC_PATH}/img/icons/*.svg`,
  },
  dist: `${DIST_PATH}`,
};

task("styles", () => {
  return src([...STYLES_LIBS, path.src.css], {
    allowEmpty: true,
  })
    .pipe(plumber())
    .pipe(gulpif(env === "dev", sourcemaps.init()))
    .pipe(concat("main.scss"))
    .pipe(sassGlob())
    .pipe(sass().on("error", sass.logError))
    .pipe(gulpif(env === "prod", postcss([autoprefixer()])))
    .pipe(gulpif(env === "prod", gcmq()))
    .pipe(gulpif(env === "prod", cleanCSS()))
    .pipe(gulpif(env === "dev", sourcemaps.write()))
    .pipe(dest(path.build.css))
    .pipe(
      reload({
        stream: true,
      })
    );
});

task("server", () => {
  browserSync.init({
    server: {
      baseDir: path.dist,
      serveStaticOptions: {
        extensions: ["html"],
      },
    },
    open: false,
  });
});

task("clean", () => {
  return src(path.dist, {
    read: false,
    allowEmpty: true,
  }).pipe(clean());
});

task("copy:html", () => {
  return src(path.src.html)
    .pipe(plumber())
    .pipe(dest(path.dist))
    .pipe(
      reload({
        stream: true,
      })
    );
});

task("pug", () => {
  return src(path.src.pug, {
    ignore: ["./**/common/*.pug", "./**/components/*.pug"],
  })
    .pipe(plumber())
    .pipe(pug({ pretty: true }))
    .pipe(dest(path.build.html))
    .pipe(reload({ stream: true }));
});

task("scripts", () => {
  return src(path.src.js)
    .pipe(plumber())
    .pipe(gulpif(env === "dev", sourcemaps.init()))
    .pipe(concat("main.js", { newLine: ";" }))
    .pipe(
      gulpif(
        env === "prod",
        babel({
          presets: ["@babel/env"],
        })
      )
    )
    .pipe(gulpif(env === "prod", uglify()))
    .pipe(gulpif(env === "dev", sourcemaps.write()))
    .pipe(dest(path.build.js))
    .pipe(
      reload({
        stream: true,
      })
    );
});

task("copy:fonts", () => {
  return src(path.src.fonts).pipe(plumber()).pipe(dest(path.build.fonts));
});

task("copy:img", () => {
  return src(path.src.images)
    .pipe(plumber())
    .pipe(dest(path.build.images))
    .pipe(
      reload({
        stream: true,
      })
    );
});

task("icons", () => {
  return src(path.src.icons)
    .pipe(plumber())
    .pipe(
      svgo({
        plugins: [
          {
            removeAttrs: { attrs: "(fill|stroke|style|width|height|data.*)" },
          },
        ],
      })
    )
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: "../sprite.svg",
          },
        },
      })
    )
    .pipe(dest(path.build.icons));
});

task("watch", () => {
  watch(path.watch.html, series("copy:html"));
  watch(path.watch.pug, series("pug"));
  watch(path.watch.css, series("styles"));
  watch(path.watch.js, series("scripts"));
  watch(path.watch.images, series("copy:img"));
  watch(path.watch.icons, series("icons"));
});

task(
  "default",
  series(
    "clean",
    parallel(
      "copy:html",
      "pug",
      "copy:img",
      "icons",
      "copy:fonts",
      "styles",
      "scripts"
    ),
    parallel("watch", "server")
  )
);

task(
  "build",
  series(
    "clean",
    parallel(
      "copy:html",
      "pug",
      "copy:img",
      "icons",
      "copy:fonts",
      "styles",
      "scripts"
    )
  )
);
