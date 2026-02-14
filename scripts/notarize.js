require('dotenv').config();
const { notarize } = require('@electron/notarize');

exports.default = async function notarizing(context) {
    const { electronPlatformName, appOutDir } = context;
    if (electronPlatformName !== 'darwin') {
        return;
    }

    const appName = context.packager.appInfo.productFilename;

    const notarizeOptions = {
        appPath: `${appOutDir}/${appName}.app`,
        appleId: process.env.APPLEID,
        appleIdPassword: process.env.APPLEIDPASS
    };
    if (process.env.APPLE_TEAM_ID) {
        notarizeOptions.teamId = process.env.APPLE_TEAM_ID;
    }
    return await notarize(notarizeOptions);
};
