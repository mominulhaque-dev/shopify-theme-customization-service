"use client";

/** Submit button that asks for confirmation first (for deletes). */
export default function ConfirmButton({
  message,
  children,
  className = "adm-btn adm-btn-danger",
}: {
  message: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
