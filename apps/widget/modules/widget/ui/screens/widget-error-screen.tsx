import { useAtomValue } from "jotai";
import React from "react";
import { errorMessageAtom } from "../../atoms/widget-atoms";
import WidgetHeader from "../components/widget-header";
import { AlertTriangleIcon } from "lucide-react";

const WidgetErrorScreen = () => {
  const errorMessage = useAtomValue(errorMessageAtom);
  return (
    <div>
      <WidgetHeader>
        <div className="flex flex-col gap-y-1 px-4 py-6 border-b">
          <p className="font-extrabold text-3xl text-gray-900">
            Get Started 👋
          </p>
          <p className="text-md text-gray-600">Tell us a bit about yourself.</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1 flex-col items-center justify-center p-4 gap-y-4 text-muted-foreground">
        <AlertTriangleIcon />
        {errorMessage || "Something went wrong. Please try again later."}
      </div>
    </div>
  );
};

export default WidgetErrorScreen;
