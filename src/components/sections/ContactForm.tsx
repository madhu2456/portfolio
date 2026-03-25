"use client";

import { useRef, useState, useTransition } from "react"; // 1. Added useRef
import { submitContactForm } from "@/actions/submit-contact-form";

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null); // 2. Create a ref for the form
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // 3. Changed argument from Event to FormData
  const handleAction = async (formData: FormData) => {
    startTransition(async () => {
      const result = await submitContactForm(formData);

      if (result.success) {
        setStatus({
          type: "success",
          message: "Thank you! Your message has been sent successfully.",
        });

        // 4. Use the ref to reset the form
        formRef.current?.reset();

        setTimeout(() => {
          setStatus({ type: null, message: "" });
        }, 5000);
      } else {
        setStatus({
          type: "error",
          message: result.error || "Something went wrong. Please try again.",
        });
      }
    });
  };

  return (
    <div className="@container/form bg-card border rounded-lg p-4 @md/form:p-6">
      <h3 className="text-xl @md/form:text-2xl font-semibold mb-6">
        Send a Message
      </h3>

      {status.type && (
        <div
          className={`mb-4 p-3 rounded-lg text-sm ${
            status.type === "success"
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
          }`}
        >
          {status.message}
        </div>
      )}

      {/* 5. Switch onSubmit to action and attach the ref */}
      <form
        className="space-y-3 @md/form:space-y-4"
        action={handleAction}
        ref={formRef}
      >
        <div>
          <label
            htmlFor="name"
            className="block text-xs @md/form:text-sm font-medium mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-3 py-1.5 @md/form:px-4 @md/form:py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm @md/form:text-base"
            placeholder="Your name"
            required
            disabled={isPending}
          />
        </div>

        {/* ... email, subject, message inputs stay exactly the same ... */}

        <div>
          <label
            htmlFor="email"
            className="block text-xs @md/form:text-sm font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-3 py-1.5 @md/form:px-4 @md/form:py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm @md/form:text-base"
            placeholder="your.email@example.com"
            required
            disabled={isPending}
          />
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block text-xs @md/form:text-sm font-medium mb-2"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="w-full px-3 py-1.5 @md/form:px-4 @md/form:py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm @md/form:text-base"
            placeholder="What's this about?"
            required
            disabled={isPending}
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-xs @md/form:text-sm font-medium mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="w-full px-3 py-1.5 @md/form:px-4 @md/form:py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none text-sm @md/form:text-base"
            placeholder="How may I help you?"
            required
            disabled={isPending}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full px-4 py-2 @md/form:px-6 @md/form:py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium text-sm @md/form:text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
