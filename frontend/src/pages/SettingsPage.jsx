import React from "react";
import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../constants";
import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hello, how are you?", isSeen: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSeen: true },
];

function SettingsPage() {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen px-4 pt-20">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* HEADER */}
        <div>
          <h2 className="text-lg font-semibold">Themes</h2>
          <p className="text-sm text-base-content/50">
            Choose a theme for your interface
          </p>
        </div>

        {/* THEME SELECTOR GRID */}
        <div className="mx-auto">
          <div
            className="grid justify-center justify-items-center gap-4"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))" }}
          >
            {THEMES.map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`w-28 flex flex-col items-center gap-2 p-2 rounded-lg transition-colors ${
                  theme === t ? "bg-base-200" : "hover:bg-base-200/50"
                }`}
              >
                <div
                  className="relative h-8 w-full rounded-md overflow-hidden"
                  data-theme={t}
                >
                  <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                    <div className="rounded bg-primary"></div>
                    <div className="rounded bg-secondary"></div>
                    <div className="rounded bg-accent"></div>
                    <div className="rounded bg-neutral"></div>
                  </div>
                </div>

                <span className="text-[11px] font-medium w-full text-center leading-tight">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* PREVIEW SECTION */}
        <div className="mt-10">
          <h2 className="text-md font-semibold mb-3">Preview</h2>

          {/* WRAPPER CARD */}
          <div className="bg-base-200/50 rounded-xl shadow border border-base-300 p-6 max-w-3xl mx-auto space-y-6">

            {/* CHAT PREVIEW */}
            <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100 rounded-lg border border-base-300">
              {PREVIEW_MESSAGES.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isSeen ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl p-3 shadow-sm ${
                      message.isSeen
                        ? "bg-primary text-primary-content"
                        : "bg-base-200"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>

                    <p
                      className={`text-[10px] mt-1.5 ${
                        message.isSeen
                          ? "text-primary-content/70"
                          : "text-base-content/70"
                      }`}
                    >
                      12:00 PM
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* INPUT PREVIEW */}
            <div className="p-4 border border-base-300 bg-base-100 rounded-lg">
              <div className="flex gap-2">
                <input
                  type="text"
                  className="input input-bordered flex-1 text-sm h-10"
                  placeholder="Type a message ..."
                  value="This is a preview"
                  readOnly
                />

                <button className="btn btn-primary h-10 w-10 min-h-10">
                  <Send size={16} />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default SettingsPage;
