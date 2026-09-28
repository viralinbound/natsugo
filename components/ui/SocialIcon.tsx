type Name = "instagram" | "facebook" | "linkedin" | "youtube";

const paths: Record<Name, string> = {
  instagram:
    "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Zm4.75-3.75a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z",
  facebook:
    "M13.5 21v-7.5H16l.4-3H13.5V8.3c0-.87.24-1.46 1.5-1.46H16.5V4.2C16.2 4.16 15.2 4 14 4c-2.5 0-4.2 1.53-4.2 4.33V10.5H7v3h2.8V21h3.7Z",
  linkedin:
    "M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9.5h4v11H3v-11Zm7 0h3.8v1.5h.05a4.17 4.17 0 0 1 3.75-2.06c4 0 4.7 2.63 4.7 6.05V20.5h-4v-5.03c0-1.2-.02-2.75-1.68-2.75-1.68 0-1.94 1.31-1.94 2.66V20.5h-4v-11Z",
  youtube:
    "M21.6 7.6a2.8 2.8 0 0 0-1.97-2C18 5.1 12 5.1 12 5.1s-6 0-7.63.5a2.8 2.8 0 0 0-1.97 2A29 29 0 0 0 2 12a29 29 0 0 0 .4 4.4 2.8 2.8 0 0 0 1.97 2C6 19 12 19 12 19s6 0 7.63-.6a2.8 2.8 0 0 0 1.97-2A29 29 0 0 0 22 12a29 29 0 0 0-.4-4.4ZM10 15V9l5.2 3-5.2 3Z",
};

export function SocialIcon({ name, size = 16 }: { name: Name; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
