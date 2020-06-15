const gulp = require("gulp");
const less = require("gulp-less");
const browserSync = require("browser-sync");
const fileinclude = require("gulp-file-include");

gulp.task('less', function() {
  return gulp.src('./src/styles.less')
    .pipe(less())
    .pipe(gulp.dest("./public"));
});

gulp.task("fileinclude", function() {
  return gulp
    .src(["./src/index.html"])
    .pipe (
      fileinclude({
        prefix: "@@",
        basepath: "@root"
      })
    )
    .pipe(gulp.dest("./public"));
});

gulp.task("js", function() {
  return gulp.src("./src/**/*.js").pipe(gulp.dest("./public"));
});

gulp.task("browser-sync", function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp
    .watch(
       "./src/**/*.html",
      gulp.parallel("fileinclude")
    )
    .on("change", browserSync.reload);
  gulp
    .watch("./src/**/*.js", gulp.parallel("js"))
    .on("change", browserSync.reload);
  gulp
    .watch ('./src/**/*.less', gulp.parallel('less'))
    .on('change', browserSync.reload);
});

gulp.task("default", gulp.series("fileinclude", "js",  "browser-sync"));
