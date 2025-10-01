import React from "react";

// Form & Validation Libraries
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// UI Components
import WidgetHeader from "../components/widget-header";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { useMutation } from "convex/react";
import { api } from "@workspace/backend/_generated/api";

import { Doc } from "@workspace/backend/_generated/dataModel";
import { create } from "domain";
import { contactSessionIdAtomFamily, screenAtom } from "../../atoms/widget-atoms";
import { useSetAtom } from "jotai";

// --- Type and Schema Definition ---

const organizationId = "org_123456";

// 1. Define the Zod schema for validation (removed message field)
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid email address." }),
});

// 2. Infer the TypeScript type from the schema
type AuthFormValues = z.infer<typeof formSchema>;

// --- Component ---

const WidgetAuthScreen: React.FC = () => {
  const setContactSessionId = useSetAtom(
    contactSessionIdAtomFamily(organizationId)
  );
  const setScreen = useSetAtom(screenAtom);
  // 3. Initialize the form hook
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(formSchema),
    // Optional: Add default values for a better user experience
    defaultValues: {
      name: "",
      email: "",
    },
    // Optional: Enable real-time validation on blur or change
    mode: "onBlur",
  });

  // 4. Submission handler
  const onSubmit = async (values: AuthFormValues) => {
    if (!organizationId) {
      console.error("Organization ID is missing.");
      return;
    }
    const metadata: Doc<"contactSession">["metadata"] = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      vendor: navigator.vendor,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      cookieEnabled: navigator.cookieEnabled,
    };

    const contactSessionId = await createContactSession({
      ...values,
      organizationId,
      metadata,
    });

    setContactSessionId(contactSessionId);
    
    setScreen("selection");
  };

  const { isSubmitting, isValid } = form.formState;

  const createContactSession = useMutation(api.public.contactSession.create);

  return (
    <div className="flex flex-col h-full rounded-lg shadow-xl">
      {/* 5. Header Section - Improved Styling */}
      <WidgetHeader>
        <div className="flex flex-col gap-y-1 px-4 py-6 border-b">
          <p className="font-extrabold text-3xl text-gray-900">
            Get Started 👋
          </p>
          <p className="text-md text-gray-600">Tell us a bit about yourself.</p>
        </div>
      </WidgetHeader>

      {/* 6. Form Section - Added Padding */}
      <div className="p-4 overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    {/* Added border color to input */}
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormDescription>
                    This will be used to address you.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    {/* Added border color to input */}
                    <Input
                      placeholder="john.doe@example.com"
                      {...field}
                      type="email"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormDescription>
                    We'll use this to follow up with you.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button - Added primary blue color */}
            <Button
              disabled={!isValid || isSubmitting}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Start Chat"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default WidgetAuthScreen;
