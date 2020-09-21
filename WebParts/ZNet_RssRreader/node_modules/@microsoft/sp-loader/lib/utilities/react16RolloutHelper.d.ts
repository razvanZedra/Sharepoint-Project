import { IClientSideComponentManifest, IComponentModuleConfiguration } from '@microsoft/sp-module-interfaces';
export declare function setIsSpHome(value: boolean): void;
/**
 * If the manifest is internal (first-party) and it's trying to load React or ReactDOM, it checks the React 16
 * rollout flight to decide which version of React to use.
 * This modifies the moduleConfiguration object in place.
 *
 * In any other case, it does nothing.
 *
 * @param manifest - Manifest to check
 * @param moduleConfiguration - Component dependency to check
 */
export declare function fixupReactDependency(manifest: IClientSideComponentManifest, moduleConfiguration: IComponentModuleConfiguration): void;
/**
 * Returns true if the manifest has the WRONG version of React. This code returning true triggers some code to make
 * sure the assembly bundle is not used (as it's already linked with a bad react).
 * If the component doesn't depend on React there is nothing to do.
 */
export declare function manifestHasWrongReactDependency(manifest: IClientSideComponentManifest): boolean;
/**
 * Used by ComponentOverrider to get the version of the component that comes in the assembly.
 * This is necessary because assemblies don't advertise the component version, and it may be the case where the server
 * returns both React 15 and React 16 manifests, but assemblies never have React 15 anymore.
 */
export declare function getVersionIfNecessary(componentId: string): string | undefined;
