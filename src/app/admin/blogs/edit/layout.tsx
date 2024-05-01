import Script from "next/script"

import hljs from "highlight.js";

import "highlight.js/styles/atom-one-dark.css";
export default function EditPageLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    hljs.configure({
        // optionally configure hljs
        languages: ["javascript", "python", "c", "c++", "java", "HTML", "css", "matlab"],
      });
    return (
        <>
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js" />

            {children}

        </>
    )
}