"use client";

import { type FormEvent, useState } from "react";

export function LoginForm() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/admin/login", {
        body: JSON.stringify({
          password: formData.get("password"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const payload = await response.json();

      if (response.ok) {
        setMessage("Login successful. Opening visual editor...");
        window.location.href = "/";
        return;
      }

      setMessage(payload.message || "Login failed. Check your credentials.");
    } catch {
      setMessage("Login request failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="mx-auto flex w-full max-w-sm flex-col gap-3 rounded-2xl border p-6 shadow-xl backdrop-blur-md transition-all"
      style={{
        backgroundColor: "var(--background)",
        borderColor: "var(--foreground)",
        color: "var(--foreground)",
      }}
    >
      <input
        className="rounded-lg border px-4 py-3 font-medium outline-none focus:ring-2 focus:ring-wellness-500 transition-colors w-full"
        style={{ 
          backgroundColor: "transparent", 
          borderColor: "var(--foreground)", 
          color: "var(--foreground)" 
        }}
        name="password"
        placeholder="Change"
        required
        type="password"
      />
      <button 
        className="rounded-lg px-4 py-3 font-bold text-white transition-all hover:opacity-90 w-full"
        style={{ backgroundColor: "var(--tw-wellness-600)" }}
      >
        {isLoading ? "Checking..." : "Enter"}
      </button>
      {message ? (
        <p
          className={`text-sm font-bold text-center ${
            message.startsWith("Login successful")
              ? "text-wellness-600"
              : "text-red-500"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
