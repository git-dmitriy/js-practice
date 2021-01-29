"use strict";

const gulp = require("gulp");
const webpack = require("webpack-stream");
const browsersync = require("browser-sync");
const del = require("del");
const plumber = require("gulp-plumber");
const concat = require("gulp-concat");
const sass = require("gulp-sass");
const gcmq = require("gulp-group-css-media-queries");
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");

sass.compiler = require("sass");

const dist = "./dist/";

// * путь для проверки форм на полноценном сервере
// const dist = 'C:/MAMP/htdocs/testing-source';

gulp.task("clean", () => {
  return del([dist]);
});

gulp.task("styles", () => {
  return gulp
    .src("src/assets/css/style.scss")
    .pipe(plumber())
    .pipe(concat("main.css"))
    .pipe(sass())
    .pipe(gcmq())
    .pipe(cleanCSS())
    .pipe(
      autoprefixer(["last 15 versions", "> 1%", "ie 8", "ie 7"], {
        cascade: true,
      })
    )
    .pipe(gulp.dest(dist + "assets/css"))
    .pipe(browsersync.stream());
});

gulp.task("copy-html", () => {
  return gulp
    .src("./src/index.html")
    .pipe(gulp.dest(dist))
    .pipe(browsersync.stream());
});

gulp.task("minify-html", () => {
  return gulp
    .src("./src/index.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(dist))
    .pipe(browsersync.stream());
});

gulp.task("imagemin", () => {
  return gulp
    .src("./src/assets/img/**/*.*")
    .pipe(plumber())
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(gulp.dest(dist + "assets/img"))
    .on("end", browsersync.reload);
});

gulp.task("images", () => {
  return gulp
    .src("./src/assets/img/**/*.*")
    .pipe(plumber())
    .pipe(gulp.dest(dist + "/assets/img"));
});

gulp.task("build-js", () => {
  return gulp
    .src("./src/js/main.js")
    .pipe(
      webpack({
        mode: "development",
        output: {
          filename: "script.js",
        },
        watch: false,
        devtool: "source-map",
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [
                    [
                      "@babel/preset-env",
                      {
                        debug: true,
                        corejs: 3,
                        useBuiltIns: "usage",
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
      })
    )
    .pipe(gulp.dest(dist))
    .on("end", browsersync.reload);
});

gulp.task("copy-assets", () => {
  return gulp
    .src(["./src/assets/**/*.*", "!./src/assets/css/", "!./src/assets/img/"])
    .pipe(gulp.dest(dist + "/assets"))
    .on("end", browsersync.reload);
});

gulp.task("watch", () => {
  browsersync.init({
    server: "./dist/",
    port: 4000,
    notify: true,
    open: false,
  });

  gulp.watch("./src/index.html", gulp.parallel("copy-html"));
  gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets", "styles"));
  gulp.watch("./src/assets/img/**/*.*", gulp.parallel("imagemin", "styles"));
  gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
});

gulp.task(
  "build",
  gulp.parallel("copy-html", "copy-assets", "images", "styles", "build-js")
);

gulp.task("build-prod-js", () => {
  return gulp
    .src("./src/js/main.js")
    .pipe(
      webpack({
        mode: "production",
        output: {
          filename: "script.js",
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [
                    [
                      "@babel/preset-env",
                      {
                        corejs: 3,
                        useBuiltIns: "usage",
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
      })
    )
    .pipe(gulp.dest(dist));
});

gulp.task("default", gulp.series("clean", "build", "watch"));

gulp.task(
  "build:prod",
  gulp.series(
    "clean",
    "minify-html",
    "imagemin",
    "copy-assets",
    "styles",
    "build-prod-js",
    "watch"
  )
);
