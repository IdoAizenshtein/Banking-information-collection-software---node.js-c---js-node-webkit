/*
var NwBuilder = require('nw-builder');
var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('nw', function () {

	var nw = new NwBuilder({
		version: '0.14.6',
		files: './app/**',
		macIcns: './other/app.icns',
		macPlist: {mac_bundle_id: 'myPkg'},
		platforms: ['osx64']
	});

	// Log stuff you want
	nw.on('log', function (msg) {
		gutil.log('nw-builder', msg);
	});

	// Build returns a promise, return it so the task isn't called in parallel
	return nw.build().catch(function (err) {
		gutil.log('nw-builder', err);
	});
});

gulp.task('default', ['nw']);
*/
//new commit one more one more
/*
if testVersion = true then pathTest = ""; else pathTest = "/tests";
Example:
npm install --save-dev yargs
gulp mytask --testVersion --> pathTest = ""
or
gulp mytask  --> pathTest = "/tests"
*/
var argv = require('yargs').argv;
var testVersion = (argv.testVersion === undefined) ? false : true;
const gulp = require('gulp');
const tar = require('gulp-tar');
const gzip = require('gulp-gzip');
const cache = require('gulp-cache')
const clean = require('gulp-clean');
const jeditor = require("gulp-json-editor");
const gutil = require('gulp-util');
const ftp = require('vinyl-ftp');
const zip = require('gulp-zip');
const https = require('https');
const bump = require('gulp-bump');
const isDevVersion = (argv.isDevVersion === undefined) ? false : true;

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

gulp.task('clean', function () {
	return gulp.src(['downloadFiles', 'finishToUpload'], {read: false})
	.pipe(clean());
});
gulp.task('clear', function (done) {
	return cache.clearAll(done);
});
gulp.task('readVersionNumProd', () => {
	console.log("readVersionNumProd");
	https.get('https://deployment.bizibox.biz/spider2/nwBizibox/package.json', (res) => {
		res.setEncoding('utf8');
		let rawData = '';
		res.on('data', (chunk) => {
			rawData += chunk;
		});
		res.on('end', () => {
			try {
				const parsedData = JSON.parse(rawData);
				const version = parsedData.version;
				var typeBump = "patch";
				let versionSplit = version.split(".");
				if (versionSplit[2] === "99") {
					typeBump = "minor"
				}
				if (versionSplit[1] === "99") {
					typeBump = "major";
				}
				gulp.src('./package.json')
				.pipe(bump({version: version}))
				.pipe(bump({type: typeBump}))
				.pipe(gulp.dest('./'))
				.on('end', endCreateVersionNumber)
			} catch (e) {
				console.error(e.message);
			}
		});
	}).on('error', (e) => {
		console.error(e);
	});
});
gulp.task('jeditorLinux', function () {
	return gulp.src("./package.json")
	.pipe(jeditor(function (json) {
			//json.version = "1.2.3";
			var d = new Date();
			var localTime = d.getTime();
			var localOffset = d.getTimezoneOffset() * 60000;
			var utcTime = localTime + localOffset;
			var st = utcTime + 3600000 * 3;
			var stime = new Date(st);
			var smallText = stime.toLocaleString("en-GB");
			json.dateUpload = smallText;
			json.versionKind = isDevVersion ? "DEV" : testVersion ? "STG" : "PROD";
			json["chromium-args"] = "--no-referrers --disable-web-security --ignore-certificate-errors --disable-raf-throttling --disable-extensions-http-throttling --disk-cache-size=1 --media-cache-size=1";
			return json;
		},
		{
			'indent_char': '\t',
			'indent_size': 1
		}
	))
	.pipe(gulp.dest("downloadFiles"))
	.on('end', startCollectFilesLinux)
});
gulp.task('jeditorWin', function () {
	return gulp.src("./package.json")
	.pipe(jeditor(function (json) {
			//json.version = "1.2.3";
			var d = new Date();
			var localTime = d.getTime();
			var localOffset = d.getTimezoneOffset() * 60000;
			var utcTime = localTime + localOffset;
			var st = utcTime + 3600000 * 3;
			var stime = new Date(st);
			var smallText = stime.toLocaleString("en-GB");
			json.dateUpload = smallText;
			json.versionKind = isDevVersion ? "DEV" : testVersion ? "STG" : "PROD";
			return json;
		},
		{
			'indent_char': '\t',
			'indent_size': 1
		}
	))
	.pipe(gulp.dest("downloadFiles"))
	.on('end', prepareFilesWin)
});
gulp.task('uploadFiles', function () {
	var conn = ftp.create({
		host: '10.201.0.90',
		user: 'deployment',
		password: 'Cd66l6XQ',
		parallel: 10,
		log: gutil.log
	});
	var hotfix = "-hotfix";
	if (testVersion || isDevVersion) {
		hotfix = "";
	}
	var globs = [
		'./finishToUpload/downloadFiles' + hotfix + '.tar.gz',
		'./finishToUpload/downloadFiles' + hotfix + '.zip'
	];
	var pathTest = "";
	if (isDevVersion) {
		pathTest = "/dev";
	} else if (testVersion) {
		pathTest = "/tests";
	}
	return gulp.src(globs)
	.pipe(conn.dest('/public_html/spider2/nwBizibox' + pathTest))
	.on('end', finishUploadFiles)
});
gulp.task('uploadPackageJson', function () {
	var conn = ftp.create({
		host: '10.201.0.90',
		user: 'deployment',
		password: 'Cd66l6XQ',
		parallel: 10,
		log: gutil.log
	});
	var globs = [
		'./package.json'
	];
	var pathTest = "";
	if (isDevVersion) {
		pathTest = "/dev";
	} else if (testVersion) {
		pathTest = "/tests";
	}
	return gulp.src(globs)
	.pipe(conn.dest('/public_html/spider2/nwBizibox' + pathTest))
	.on('end', uploadPackageJson)
});
gulp.task('clearFolderLinux', function () {
	return gulp.src(['downloadFiles'], {read: false})
	.pipe(clean())
	.on('end', jeditorWin)
});
gulp.task('clearFolderWin', function () {
	return gulp.src(['downloadFiles'], {read: false})
	.pipe(clean())
	.on('end', uploadFiles)
});
gulp.task('collectFilesLinux', () => {
	console.log("collectFilesLinux");
	return gulp.src(
		[
			'index.html',
			'detailsVersions.html',
			'explorerAgent.html',
			'*vpnconfig/**/*',
			'*style/**/*',
			'*slika/**/*',
			'*cards/**/*',
			'*banks/**/*',
			'*menuFrame/**/*',
			'*coreBank/**/*',
			'!js/lib/shortcut/*',
			'!js/tools/*',
			'!js/lib/shortcut',
			'!js/tools',
			'*js/**/*'
		]
	)
	.pipe(gulp.dest('downloadFiles'))
	.on('end', cbCollectFilesLinux)
});
gulp.task('createTarLinux', () => {
	console.log("createTarLinux");
	var hotfix = "-hotfix";
	if (testVersion || isDevVersion) {
		hotfix = "";
	}
	return gulp.src(
		[
			'*downloadFiles/**/*'
		]
	)
	.pipe(tar('downloadFiles' + hotfix + '.tar'))
	.pipe(gzip())
	.pipe(gulp.dest('finishToUpload'))
	.on('end', createTarLinux)
});
gulp.task('createZipWin', () => {
	console.log("createZipWin");
	var hotfix = "-hotfix";
	if (testVersion || isDevVersion) {
		hotfix = "";
	}
	return gulp.src(
		[
			'downloadFiles/**'
		]
	)
	.pipe(zip('downloadFiles' + hotfix + '.zip'))
	.pipe(gulp.dest('finishToUpload'))
	.on('end', createZipWin)
});
gulp.task('prepareFilesWin', () => {
	console.log("collectFilesWin");
	return gulp.src(
		[
			'index.html',
			'detailsVersions.html',
			'explorerAgent.html',
			'*style/**/*',
			'*slika/**/*',
			'*biziboxMonitor/**/*',
			'*cards/**/*',
			'*banks/**/*',
			'*menuFrame/**/*',
			'*coreBank/**/*',
			'!js/tools/*',
			'!js/tools',
			'*js/**/*'
		]
	)
	.pipe(gulp.dest('downloadFiles'))
	.on('end', cbCollectFilesWin)
});

function endCreateVersionNumber() {
	console.log("endCreateVersionNumber");
	gulp.start('jeditorLinux');
}

function jeditorWin() {
	gulp.start('jeditorWin');
}

function cbCollectFilesLinux() {
	gulp.start('createTarLinux');
}

function cbCollectFilesWin() {
	gulp.start('createZipWin');
}

function createZipWin() {
	console.log("finishLinux");
	gulp.start('clearFolderWin');
}

function createTarLinux() {
	console.log("finishLinux");
	gulp.start('clearFolderLinux');
}

function startCollectFilesLinux() {
	gulp.start('collectFilesLinux');
}

function prepareFilesWin() {
	gulp.start('prepareFilesWin');
}

function uploadFiles() {
	console.log("uploadFiles");
	gulp.start('uploadFiles');
}

function finishUploadLinuxCb() {
	console.log("finishUploadLinuxCb")
}

function finishUploadFiles() {
	console.log("finishUploadFiles");
	gulp.start(['clean', 'clear']);
	console.log("finishedCleanAll");
	return gulp.src("./package.json")
	.pipe(jeditor(function (json) {
			json.versionTest = !isDevVersion && testVersion;
			json.versionKind = isDevVersion ? "DEV" : testVersion ? "STG" : "PROD";
			return json;
		},
		{
			'indent_char': '\t',
			'indent_size': 1
		}
	))
	.pipe(gulp.dest("./"))
	.on('end', startUploadPackageJson)
}

function startUploadPackageJson() {
	gulp.start('uploadPackageJson');
}

function uploadPackageJson() {
	return gulp.src("./package.json")
	.pipe(jeditor(function (json) {
			json.versionTest = false;
			json.versionKind = isDevVersion ? "DEV" : testVersion ? "STG" : "PROD";
			return json;
		},
		{
			'indent_char': '\t',
			'indent_size': 1
		}
	))
	.pipe(gulp.dest("./"))
	.on('end', finishedCleanAllAndUploadPackageJson)
}

function finishedCleanAllAndUploadPackageJson() {
	gulp.start(['clear']);
	console.log("finishedCleanAllAndUploadPackageJson");
}

gulp.task('startAll', ['clean', 'clear'], function () {
	console.log("finish clean & clear");
	gulp.start('readVersionNumProd');
});


//Test:  node ./node_modules/gulp/bin/gulp.js  startAll
