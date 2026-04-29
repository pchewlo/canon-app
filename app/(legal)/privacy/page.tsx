import {
  LegalHeader,
  LegalSection,
  LegalUpdated,
} from "@/components/legal/LegalContent"

export const metadata = { title: "Privacy Policy — Canon" }

export default function PrivacyPage() {
  return (
    <>
      <LegalHeader title="Privacy Policy" />

      <LegalSection title="1. Who we are">
        <p>
          Canon (&quot;Canon&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;)
          provides an AI-powered platform for player engagement. This policy
          explains what personal information we collect, how we use it, and the
          choices you have.
        </p>
      </LegalSection>

      <LegalSection title="2. Information we collect">
        <ul>
          <li>
            <strong>Account information</strong> — name, work email, company, and
            role when you request a demo or create an account.
          </li>
          <li>
            <strong>Usage data</strong> — pages viewed, features used, device and
            browser information, and approximate location.
          </li>
          <li>
            <strong>Operator data</strong> — anonymised player and engagement data
            provided by operator customers, used solely to deliver the service.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. How we use information">
        <ul>
          <li>To provide, maintain, and improve the service.</li>
          <li>To respond to enquiries and demo requests.</li>
          <li>To send service-related communications.</li>
          <li>To comply with legal obligations.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Sharing and disclosure">
        <p>
          We do not sell personal information. We share information only with
          service providers acting on our behalf (hosting, analytics,
          communications) under appropriate data-protection terms, or where
          required by law.
        </p>
      </LegalSection>

      <LegalSection title="5. Data retention">
        <p>
          We retain personal information for as long as needed to provide the
          service and comply with legal obligations. You may request deletion at
          any time by contacting us.
        </p>
      </LegalSection>

      <LegalSection title="6. Your rights">
        <p>
          Depending on where you live, you may have the right to access, correct,
          delete, or port your personal information, or object to certain
          processing. To exercise these rights, contact us at{" "}
          <a href="mailto:hello@canon.app">hello@canon.app</a>.
        </p>
      </LegalSection>

      <LegalSection title="7. Security">
        <p>
          We use reasonable technical and organisational measures to protect
          personal information. No system is perfectly secure, and we cannot
          guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection title="8. Changes to this policy">
        <p>
          We may update this policy from time to time. Material changes will be
          notified through the service or by email.
        </p>
      </LegalSection>

      <LegalSection title="9. Contact">
        <p>
          Questions about this policy? Email{" "}
          <a href="mailto:hello@canon.app">hello@canon.app</a>.
        </p>
      </LegalSection>

      <LegalUpdated date="29 April 2026" />
    </>
  )
}
