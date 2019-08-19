const { src, watch, dest, task, series } = require("gulp");
const { createProject } = require("gulp-typescript");
const clean = require("gulp-clean");

const tsProject = createProject("tsconfig.json");

task("compile", () => {
    return src("./lib/**/*.ts")
        .pipe(tsProject())
        .pipe(dest("dist"));
});

task("clean", () => {
    return src("dist/")
        .pipe(clean())
});

task("otherfiles", () => {
    return src(["./lib/**/*.json"])
        .pipe(dest("dist"));
});

const tasks = series("clean", "otherfiles", "compile");

task("watch", () => {
    return watch("./lib/**/*.ts", { event: "change"}, tasks);
});