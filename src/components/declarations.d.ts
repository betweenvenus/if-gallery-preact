/**
 * Fixes "JSX.Element is not a valid JSX element" type
 * errors caused by Material UI
 */
import React from "react";
declare global {
    namespace React {
        interface ReactElement {
            nodeName: any;
            attributes: any;
            children: any;
        }
    }
}