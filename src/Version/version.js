import { Auth } from "aws-amplify";
import { clearSeviceCache } from "../API/Cache/clear-cache";

const majorVersion="1";
const minorVersion="0";
const patch="0";
const dot=".";
const minVersionStepForSignout = 5;
const currVersion = majorVersion+dot+minorVersion+dot+patch;

const updateVersion = () => {
    
    localStorage.setItem('version', currVersion);
}

const getVersionFromStorage = () => {
    if (localStorage.getItem('version')) {
        const version = {};
        const verArr = localStorage.getItem('version').split(dot);
        version.majorVersion=verArr[0];
        version.minorVersion=verArr[1];
        version.patch=verArr[2];
        return version;
    }
    return null;
}

const checkVersion = () => {
    const localVersion = getVersionFromStorage();
    if (localVersion) {
        const minorVersionDiff = Math.abs(localVersion.minorVersion - minorVersion);
        if(localVersion === null || localVersion.majorVersion !== majorVersion || 
            minorVersionDiff >= minVersionStepForSignout) {
                Auth.signOut();
        } else if (localVersion.patch !== patch || 
                (minorVersionDiff < minVersionStepForSignout && minorVersionDiff > 0)) {
            clearSeviceCache();
            updateVersion();
        }
    } else {
        Auth.signOut();
    }
}

export {
    updateVersion,
    checkVersion,
    currVersion
};