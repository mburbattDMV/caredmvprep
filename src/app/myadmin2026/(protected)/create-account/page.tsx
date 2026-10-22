import type { Metadata } from "next";
import CreateAccountForm from "@/components/admin/CreateAccountForm";

export const metadata: Metadata = { title: "Create account | Admin", robots: { index: false, follow: false } };

export default function CreateAccountPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Create account</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Set someone up with their email. Optionally grant paid access for a fixed time; they set their own password from the link.
        </p>
      </div>
      <CreateAccountForm />
    </div>
  );
}
