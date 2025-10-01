import { useAtomValue, useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";
import {
  contactSessionIdAtomFamily,
  errorMessageAtom,
  loadingMessageAtom,
  organizationIdAtom,
  screenAtom,
} from "../../atoms/widget-atoms";
import WidgetHeader from "../components/widget-header";
import { LoaderIcon } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@workspace/backend/_generated/api";

type InitStep = "session" | "settings" | "vapi" | "done";

// Use a static organization ID
const STATIC_ORGANIZATION_ID = "org_123456";

const WidgetLoadingScreen = () => {
  const [step, setStep] = useState<InitStep>("session");
  const [sessionValid, setSessionValid] = useState(false);
  const setOrganizationId = useSetAtom(organizationIdAtom);
  const loadingMessage = useAtomValue(loadingMessageAtom);
  const setLoadingMessage = useSetAtom(loadingMessageAtom);
  const setErrorMessage = useSetAtom(errorMessageAtom);
  const setScreen = useSetAtom(screenAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(STATIC_ORGANIZATION_ID)
  );

  // Set the static organization ID on component mount
  useEffect(() => {
    setOrganizationId(STATIC_ORGANIZATION_ID);
  }, [setOrganizationId]);

  //step 2 validation session(if exist)
  const validateContactSession = useMutation(
    api.public.contactSession.validate
  );

  // useEffect(() => {
  //   if (step !== "session") return;

  //   setLoadingMessage("Finding Contact Session ID...");

  //   if (!contactSessionId) {
  //     setSessionValid(false);
  //     setStep("done");
  //     return;
  //   }

  //   setLoadingMessage("Finding Contact Session ID...");

  //   validateContactSession({ contactSessionId })
  //     .then((result) => {
  //       setSessionValid(result.valid);
  //       setStep("done");
  //     })
  //     .catch((error) => {
  //       setSessionValid(false);
  //       setStep("done");
  //     });
  // }, [
  //   step,
  //   contactSessionId,
  //   setLoadingMessage,
  //   validateContactSession,
  //   setStep,
  //   setSessionValid,
  //   setScreen,
  // ]);

  useEffect(() => {
    if (step !== "session") return;

    setLoadingMessage("Finding Contact Session ID...");

    // 1-second delay to wait for localStorage retrieval
    const timer = setTimeout(() => {
      // Check for contactSessionId *after* the delay
      if (!contactSessionId) {
        setSessionValid(false);
        setStep("done");
        return;
      }

      // If contactSessionId is found, proceed with validation
      setLoadingMessage("Validating Session..."); // Updated message for clarity

      validateContactSession({ contactSessionId })
        .then((result) => {
          setSessionValid(result.valid);
          setStep("done");
        })
        .catch((error) => {
          setSessionValid(false);
          setStep("done");
        });
    }, 1000); // 1000 milliseconds = 1 second

    // Cleanup function to clear the timeout if the component unmounts
    // or dependencies change before the timeout fires.
    return () => clearTimeout(timer);
  }, [
    step,
    contactSessionId,
    setLoadingMessage,
    validateContactSession,
    setStep,
    setSessionValid,
    setScreen,
  ]);

  useEffect(() => {
    if (step !== "done") return;

    const hasValidSession = contactSessionId && sessionValid;

    setScreen(hasValidSession ? "selection" : "auth");
  }, [step, contactSessionId, sessionValid, setScreen]);

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
        <LoaderIcon className="animate-spin" />
        {loadingMessage || "loading..."}
      </div>
    </div>
  );
};

export default WidgetLoadingScreen;
