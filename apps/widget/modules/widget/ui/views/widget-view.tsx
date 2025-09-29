"use client";

import React from "react";
import WidgetAuthScreen from "../screens/widget-auth-screen";
import { useAtomValue } from "jotai";
import { screenAtom } from "../../atoms/widget-atoms";

interface Props {
  organizationId: string;
}

const WidgetView = ({ organizationId }: Props) => {
  const screen = useAtomValue(screenAtom);

  const screenComponents = {
    error: <p>TODO</p>,
    loading: <p>TODO: Loading...</p>,
    auth: <WidgetAuthScreen />,
    voice: <p>TODO: Voice</p>,
    chat: <p>TODO: Chat</p>,
    selection: <p>TODO: Selection</p>,
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
