import {
  LegalHeader,
  LegalSection,
  LegalShell,
  LegalUpdated,
} from "@/components/legal/LegalContent"

export const metadata = { title: "Cookie Policy" }

export default function CookiesPage() {
  return (
    <LegalShell>
      <LegalHeader title="Cookie Policy" />

      <LegalSection title="1. What are cookies?">
        <p>
          Cookies are small text files placed on your device when you visit a
          website. They help sites work properly, remember your preferences, and
          provide information for analytics.
        </p>
      </LegalSection>

      <LegalSection title="2. How we use cookies">
        <ul>
          <li>
            <strong>Essential</strong> — required for the Service to function
            (e.g. authentication, security).
          </li>
          <li>
            <strong>Analytics</strong> — help us understand how visitors use the
            Service so we can improve it.
          </li>
          <li>
            <strong>Preferences</strong> — remember choices you make (e.g.
            language or layout).
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Third-party cookies">
        <p>
          We may use third-party services (such as analytics providers) that set
          their own cookies. Their use of cookies is governed by their own
          privacy policies.
        </p>
      </LegalSection>

      <LegalSection title="4. Managing cookies">
        <p>
          Most browsers let you refuse or delete cookies. Doing so may affect
          how the Service works. Refer to your browser&apos;s help documentation
          for instructions.
        </p>
      </LegalSection>

      <LegalSection title="5. Changes">
        <p>
          We may update this policy. The latest version is always available on
          this page.
        </p>
      </LegalSection>

      <LegalSection title="6. Contact">
        <p>
          Questions about our use of cookies? Email{" "}
          <a href="mailto:hello@canon.app">hello@canon.app</a>.
        </p>
      </LegalSection>

      <LegalUpdated date="29 April 2026" />
    </LegalShell>
  )
}
