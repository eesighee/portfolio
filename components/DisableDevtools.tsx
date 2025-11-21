"use client";

import { useEffect } from "react";

export default function DisableDevtools() {
  useEffect(() => {
    // Try to stub React DevTools hook to make it harder for the extension to inspect
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (typeof window !== "undefined") {
        // Define a no-op hook if it does not exist, or replace with a stub
        try {
          Object.defineProperty(window, "__REACT_DEVTOOLS_GLOBAL_HOOK__", {
            configurable: false,
            enumerable: false,
            value: {
              // minimal stub implementation
              _renderers: new Map(),
              inject() {},
              on() {},
              off() {},
              emit() {},
            },
          });
        } catch (e) {
          // ignore if property can't be redefined
        }
      }
    } catch (e) {
      // noop
    }

    // Block common shortcuts that open devtools — not foolproof but reduces accidental opens
    function onKey(e: KeyboardEvent) {
      // Ctrl+Shift+I / Cmd+Opt+I, Ctrl+Shift+J / Cmd+Opt+J, F12
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") ||
          (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "j") ||
          (e.key === "F12") ||
          (isMac && e.metaKey && e.altKey && e.key.toLowerCase() === "i") ||
          (isMac && e.metaKey && e.altKey && e.key.toLowerCase() === "j")) {
        e.preventDefault();
        e.stopPropagation();
      }
    }

    function onContext(e: MouseEvent) {
      // prevent right-click menu (simple measure)
      e.preventDefault();
    }

    window.addEventListener("keydown", onKey, { capture: true });
    window.addEventListener("contextmenu", onContext, { capture: true });

    return () => {
      window.removeEventListener("keydown", onKey, { capture: true });
      window.removeEventListener("contextmenu", onContext, { capture: true });
    };
  }, []);

  return null;
}
