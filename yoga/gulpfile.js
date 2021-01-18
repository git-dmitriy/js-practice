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

sass.compiler = require("sass");

const dist = "./dist/";

gulp.task("copy-html", () => {
  return gulp
    .src("./src/index.html")
    .pipe(gulp.dest(dist))
    .pipe(browsersync.stream());
});

gulp.task("clean", () => {
  return del([dist]);
});

gulp.task("styles", () => {
  return gulp
    .src("src/assets/css/**/*.scss")
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
    .pipe(gulp.dest(dist + "js"))
    .on("end", browsersync.reload);
});

gulp.task("copy-assets", () => {
  return gulp
    .src(["./src/assets/**/*.*", "!./src/assets/css/**"])
    .pipe(gulp.dest(dist + "/assets"))
    .on("end", browsersync.reload);
});

gulp.task("watch", () => {
  browsersync.init({
    server: "./dist/",
    port: 4000,
    notify: true,
    serveStaticOptions: {
      extensions: ["html", "json"],
    },
    open: false,
  });

  gulp.watch("./src/index.html", gulp.parallel("copy-html"));
  gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets", "styles"));
  gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
});

gulp.task(
  "build",
  gulp.series(
    "clean",
    gulp.parallel("copy-html", "styles", "copy-assets", "build-js")
  )
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
    .pipe(gulp.dest(dist + "js"));
});

gulp.task(
  "build:prod",
  gulp.parallel("copy-html", "styles", "copy-assets", "build-prod-js")
);

gulp.task("default", gulp.series("clean", gulp.parallel("watch", "build")));
