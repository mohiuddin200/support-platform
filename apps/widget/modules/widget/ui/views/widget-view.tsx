"use client";

import React from "react";
import WidgetAuthScreen from "../screens/widget-auth-screen";
import { useAtomValue } from "jotai";
import { screenAtom } from "../../atoms/widget-atoms";
import WidgetErrorScreen from "../screens/widget-error-screen";
import WidgetLoadingScreen from "../screens/widget-loading-screen";
import WidgetSelectionScreen from "../screens/widget-selection-screen";

interface Props {
  organizationId?: string;
}

const WidgetView = ({ organizationId }: Props) => {
  const screen = useAtomValue(screenAtom);

  const screenComponents = {
    loading: <WidgetLoadingScreen />,
    error: <WidgetErrorScreen />,
    auth: <WidgetAuthScreen />,
    voice: <p>TODO: Voice</p>,
    chat: <p>TODO: Chat</p>,
    selection: <WidgetSelectionScreen />,
    inbox: <p>TODO: Inbox</p>,
    contact: <p>TODO: Contact</p>,
  };
  // const [screen, setScreen] = useState<WidgetScreen>("auth");
  return (
    <main className="min-h-screen min-w-screen flex h-full flex-col overflow-hidden rounded-xl border bg-muted">
      {screenComponents[screen]}
    </main>
  );
};

export default WidgetView;
