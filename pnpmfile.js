'use strict'

module.exports = {
    hooks: {
        readPackage,
    },
}

function readPackage (pkg) {
    switch (pkg.name) {
        case 'prisma-binding':
            pkg.dependencies.ws = '^3.3.3'
            pkg.dependencies.iterall = '^1.2.2'
            break
        case 'apollo-upload-server':
            pkg.dependencies['core-js'] = '^2.5.5'
            break
    }
    return pkg
}
