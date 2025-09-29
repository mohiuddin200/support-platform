import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { HomeIcon } from "lucide-react";
import React, { useState } from "react";

type Screen = "selection" | "inbox";

const WidgetFooter = () => {
  const [screen, setScreen] = useState<Screen>("selection");
  
  return (
    <footer className="flex items-center justify-between border-t bg-background">
      <Button 
        className="h-14  flex-1 rounded-none"
        onClick={() => setScreen("selection")}
      >
        <HomeIcon
          className={cn("size-5", screen === "selection" && "text-primary")}
        />
      </Button>
      <Button 
        className="h-14  flex-1 rounded-none"
        onClick={() => setScreen("inbox")}
      >
        <HomeIcon
          className={cn("size-5", screen === "inbox" && "text-primary")}
        />
      </Button>
    </footer>
  );
};

export default WidgetFooter;
