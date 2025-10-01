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
import { CONTACT_SESSION_KEY } from "../../constant";
import { Id } from "@workspace/backend/_generated/dataModel";

type InitStep = "loading" | "session" | "settings" | "vapi" | "done";

// Use a static organization ID
const STATIC_ORGANIZATION_ID = "org_123456";

const WidgetLoadingScreen = () => {
  const [step, setStep] = useState<InitStep>("loading");
  const [sessionValid, setSessionValid] = useState(false);
  const [isAtomLoaded, setIsAtomLoaded] = useState(false);
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

  // Wait for atom to be properly hydrated from localStorage
  useEffect(() => {
    setLoadingMessage("Initializing...");

    // Add a small delay to ensure localStorage has time to hydrate into the atom
    const timer = setTimeout(() => {
      console.log("Atom loading complete, contactSessionId:", contactSessionId);
      setIsAtomLoaded(true);

      // After atom is loaded, proceed to session validation step
      if (isAtomLoaded === false) {
        setStep("session");
      }
    }, 500); // 500ms should be enough for localStorage hydration

    return () => clearTimeout(timer);
  }, [contactSessionId, setLoadingMessage]);

  // Validation step
  const validateContactSession = useMutation(
    api.public.contactSession.validate
  );

  useEffect(() => {
    if (step !== "session" || !isAtomLoaded) return;

    setLoadingMessage("Finding Contact Session ID...");
    console.log(
      "Starting session validation, contactSessionId:",
      contactSessionId
    );

    // First try with the atom value
    if (contactSessionId) {
      validateContactSession({ contactSessionId })
        .then((result) => {
          setSessionValid(result.valid);
          console.log("Session validation result:", result.valid);
          setStep("done");
        })
        .catch((error) => {
          console.error("Session validation error:", error);
          setSessionValid(false);
          setStep("done");
        });
      return;
    }

    // If atom still doesn't have it, try to get it directly from localStorage
    const storageKey = `${CONTACT_SESSION_KEY}_${STATIC_ORGANIZATION_ID}`;
    const storedSessionId = localStorage.getItem(storageKey);
    console.log("Checking localStorage directly with key:", storageKey);
    console.log("Found in localStorage:", storedSessionId);

    if (storedSessionId) {
      validateContactSession({ contactSessionId: storedSessionId as  Id<"contactSession"> })
        .then((result) => {
          setSessionValid(result.valid);
          console.log("Session validation from localStorage:", result.valid);
          setStep("done");
        })
        .catch((error) => {
          console.error("Session validation error:", error);
          setSessionValid(false);
          setStep("done");
        });
    } else {
      console.log("No contact session ID found anywhere");
      setSessionValid(false);
      setStep("done");
    }
  }, [
    step,
    isAtomLoaded,
    contactSessionId,
    setLoadingMessage,
    validateContactSession,
    setStep,
    setSessionValid,
  ]);

  useEffect(() => {
    if (step !== "done") return;

    // For the final decision, check localStorage one more time if needed
    let finalSessionId = contactSessionId;

    if (!finalSessionId) {
      const storageKey = `${CONTACT_SESSION_KEY}_${STATIC_ORGANIZATION_ID}`;
      const storedValue = localStorage.getItem(storageKey);
      if (storedValue) {
        finalSessionId = storedValue as Id<"contactSession">;
      }
    }

    const hasValidSession = finalSessionId && sessionValid;

    console.log("Final check - sessionId:", finalSessionId);
    console.log("Final check - sessionValid:", sessionValid);
    console.log("Final check - hasValidSession:", hasValidSession);

    setScreen(hasValidSession ? "selection" : "auth");
    console.log("Setting screen to:", hasValidSession ? "selection" : "auth");
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
