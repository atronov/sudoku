const workboxBuild = require('workbox-build');
const fs = require('fs');

const swPath = './dist/sw.js';
fs.writeFileSync(
    swPath,
    fs.readFileSync(swPath, 'utf8').replace('=/sw.js.map', '=./sw.js.map'),
);

const buildSW = () => {
    // This will return a Promise
    return workboxBuild.injectManifest({
        swSrc: 'dist/sw.js',
        swDest: 'dist/sw.js',
        globDirectory: 'dist',
        globIgnores: [
            '**\/report.html',
        ],
        injectionPoint: 'self.__WB_MANIFEST',
        globPatterns: [
            '**\/*.{js,css,html}',
        ],
        maximumFileSizeToCacheInBytes: 2 ** 20 * 10, // 10 MB
    }).then(({count, size, warnings}) => {
        // Optionally, log any warnings and details.
        warnings.forEach(console.warn);
        console.log(`${count} files will be precached, totaling ${size} bytes.`);
    });
};

buildSW();
