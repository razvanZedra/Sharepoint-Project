import { _SPFlight } from '@microsoft/sp-core-library';
import { react15Version, react16Version, reactComponentId, reactDomComponentId, classicPagesAppComponentId } from './componentConstants';
var REACT_NAME = 'react';
var isSpHome = false;
export function setIsSpHome(value) {
    isSpHome = value;
}
export function fixupReactDependency(manifest, moduleConfiguration) {
    if (isSpHome) {
        return; 
    }
    if (manifest.isInternal &&
        (manifest.id !== reactComponentId &&
            manifest.id !== reactDomComponentId) &&
        manifest.id !== '39c4c1c2-63fa-41be-8cc2-f6c0b49b253d' &&
        (moduleConfiguration.id === reactComponentId
            || moduleConfiguration.id === reactDomComponentId)) {
        if (_SPFlight.isEnabled(1187 )) {
            moduleConfiguration.version = react16Version;
        }
        else {
            moduleConfiguration.version = react15Version;
        }
    }
}
export function manifestHasWrongReactDependency(manifest) {
    if (isSpHome) {
        return false; 
    }
    if (manifest.id === classicPagesAppComponentId && !_SPFlight.isEnabled(1187 )) {
        return true;
    }
    var scriptResources = manifest.loaderConfig.scriptResources;
    if (!scriptResources.hasOwnProperty(REACT_NAME)) {
        return false;
    }
    if (_SPFlight.isEnabled(1187 )) {
        return scriptResources[REACT_NAME].version !== react16Version;
    }
    else {
        return scriptResources[REACT_NAME].version !== react15Version;
    }
}
export function getVersionIfNecessary(componentId) {
    if (componentId === reactComponentId || componentId === reactDomComponentId) {
        return react16Version;
    }
    else {
        return undefined;
    }
}
