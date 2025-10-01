import { useAtomValue, useSetAtom } from "jotai";
import React from "react";
import {
  contactSessionIdAtomFamily,
  conversationIdAtom,
  errorMessageAtom,
  organizationIdAtom,
  screenAtom,
} from "../../atoms/widget-atoms";
import WidgetHeader from "../components/widget-header";
import { AlertTriangleIcon, ArrowLeftIcon } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { json } from "stream/consumers";

const WidgetChatScreen = () => {
  const setScreen = useSetAtom(screenAtom);
  const setConversationId = useSetAtom(conversationIdAtom);
  const errorMessage = useAtomValue(errorMessageAtom);
  const conversationId = useAtomValue(conversationIdAtom);
  const organizationId = useAtomValue(organizationIdAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId || "")
  );

  const conversation = useQuery(
    api.public.conversations.getOne,
    conversationId && contactSessionId
      ? {
          conversationId,
          contactSessionId,
        }
      : "skip"
  );

  const onBack = () => {
    setConversationId(null);
    setScreen("selection");
  };

  return (
    <div>
      <WidgetHeader className="flex items-center justify-between">
        <div className="flex flex-col gap-y-1 px-4 py-6 border-b">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeftIcon />
          </Button>
          <p>Chat</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1 flex-col items-center justify-center p-4 gap-y-4 text-muted-foreground">
        <AlertTriangleIcon />
        {JSON.stringify(conversation)}
      </div>
    </div>
  );
};

export default WidgetChatScreen;
