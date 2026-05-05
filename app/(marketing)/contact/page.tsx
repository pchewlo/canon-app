import {
  LegalHeader,
  LegalSection,
  LegalShell,
} from "@/components/legal/LegalContent"

export const metadata = { title: "Contact — Canon" }

export default function ContactPage() {
  return (
    <LegalShell>
      <LegalHeader title="Contact" />

      <LegalSection title="Get in touch">
        <p>The fastest way to reach us is by email.</p>
        <p>
          <strong>General enquiries</strong> —{" "}
          <a href="mailto:hello@canon.app">hello@canon.app</a>
        </p>
        <p>
          <strong>Privacy and data requests</strong> —{" "}
          <a href="mailto:hello@canon.app">hello@canon.app</a>
        </p>
        <p>
          <strong>Press and partnerships</strong> —{" "}
          <a href="mailto:hello@canon.app">hello@canon.app</a>
        </p>
      </LegalSection>

      <LegalSection title="Book a call">
        <p>
          If you&apos;re an iGaming operator and want to see Canon running on a
          sample of your players, <a href="/book-call">book a call</a>.
        </p>
      </LegalSection>
    </LegalShell>
  )
}
