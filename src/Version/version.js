import { Auth } from "aws-amplify";
import { clearSeviceCache } from "../API/Cache/clear-cache";

const majorVersion="1";
const minorVersion="0";
const patch="1";
const dot="."

const updateVersion = () => {
    const currVersion = majorVersion+dot+minorVersion+dot+patch;
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
    if(localVersion === null || localVersion.majorVersion !== majorVersion || 
        localVersion.minorVersion !== minorVersion) {
            Auth.signOut();
    } else if (localVersion.patch !== patch) {
        clearSeviceCache();
        updateVersion();
    }
}

export {
    updateVersion,
    checkVersion
};