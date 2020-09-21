/**
 * Helper methods for plain JS DOM manipulations
 * https://plainjs.com/javascript/
 */
export declare class DomHelper {
    /**
     * Iterates over a list of DOM nodes (https://toddmotto.com/ditch-the-array-foreach-call-nodelist-hack/)
     * @param array the node list to browse
     * @param callback the callback function
     * @param scope the scope
     */
    static forEach(array: any, callback: any, scope?: any): void;
    /**
     * Inserts a DOM element after an other
     * @param el the dom element to insert
     * @param referenceNode the parent node to insert after
     */
    static insertAfter(el: any, referenceNode: any): void;
}
