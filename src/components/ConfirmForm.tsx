"use client";

import React, { FormEvent } from "react";

interface ConfirmFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  action: (payload: FormData) => void;
  confirmMessage?: string;
  children: React.ReactNode;
}

export default function ConfirmForm({ action, confirmMessage, children, ...props }: ConfirmFormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (confirmMessage) {
      if (!window.confirm(confirmMessage)) {
        e.preventDefault();
        return;
      }
    }
  };

  return (
    <form action={action} onSubmit={handleSubmit} {...props}>
      {children}
    </form>
  );
}
