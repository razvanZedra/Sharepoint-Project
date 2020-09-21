import { Validate } from '@microsoft/sp-core-library';
import ComponentStore from '../stores/ComponentStore';
import ManifestStore from '../stores/ManifestStore';
import { manifestHasWrongReactDependency, getVersionIfNecessary } from '../utilities/react16RolloutHelper';
import normalizeName from './normalizeName';
import RequireJsLoader from './RequireJsLoader';
var ComponentOverrider = (function () {
    function ComponentOverrider() {
    }
    ComponentOverrider.overrideComponent = function (componentId, componentModule, serviceScope) {
        Validate.isNonemptyString(componentId, 'componentId');
        Validate.isNotNullOrUndefined(componentModule, 'componentModule');
        var version = getVersionIfNecessary(componentId);
        var manifest = ManifestStore.instance.tryGetManifest(componentId, version);
        if (!manifest) {
            return;
        }
        if (manifestHasWrongReactDependency(manifest)) {
            return;
        }
        var normalizedName = normalizeName(manifest);
        serviceScope.consume(RequireJsLoader.serviceKey).ensure(normalizedName, componentModule);
        ComponentStore.instance.storeComponent(manifest.id, manifest.version, Promise.resolve(componentModule));
    };
    return ComponentOverrider;
}());
export default ComponentOverrider;
