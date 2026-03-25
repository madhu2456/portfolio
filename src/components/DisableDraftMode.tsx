"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { disableDraftMode } from "@/actions/disableDraftMode";
import { Button } from "./ui/button";

export function DisableDraftMode() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [inIframe, setInIframe] = useState(true);

  // Replacement for useDraftModeEnvironment
  // We check if the window is inside an iframe (Sanity Presentation Tool)
  useEffect(() => {
    setInIframe(window.self !== window.top);
  }, []);

  // If we are inside the Sanity Studio (iframe), we don't show the manual exit button
  // because the Studio provides its own 'Stop Preview' controls.
  if (inIframe) {
    return null;
  }

  const disable = () =>
    startTransition(async () => {
      await disableDraftMode();
      // Use router.refresh() to update the server components to 'published' perspective
      router.refresh();
    });

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      <Button
        type="button"
        variant="destructive"
        onClick={disable}
        disabled={pending}
        className="shadow-lg"
      >
        {pending ? "Disabling..." : "Exit Preview Mode"}
      </Button>
    </div>
  );
}
