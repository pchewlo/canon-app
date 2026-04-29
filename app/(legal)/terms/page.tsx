import {
  LegalHeader,
  LegalSection,
  LegalUpdated,
} from "@/components/legal/LegalContent"

export const metadata = { title: "Terms of Service — Canon" }

export default function TermsPage() {
  return (
    <>
      <LegalHeader title="Terms of Service" />

      <LegalSection title="1. Agreement">
        <p>
          By accessing or using Canon (the &quot;Service&quot;), you agree to be
          bound by these Terms of Service. If you do not agree, do not use the
          Service.
        </p>
      </LegalSection>

      <LegalSection title="2. The Service">
        <p>
          Canon provides AI-driven tools for player-engagement decisioning. We
          may modify, suspend, or discontinue any part of the Service at any
          time without notice.
        </p>
      </LegalSection>

      <LegalSection title="3. Accounts">
        <p>
          You are responsible for maintaining the confidentiality of your account
          and for all activities that occur under it. You must provide accurate
          information and notify us of any unauthorised use.
        </p>
      </LegalSection>

      <LegalSection title="4. Acceptable use">
        <ul>
          <li>Do not use the Service for any unlawful purpose.</li>
          <li>Do not interfere with or disrupt the Service.</li>
          <li>Do not attempt to access data not intended for you.</li>
          <li>Do not reverse engineer, decompile, or disassemble the Service.</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Customer data">
        <p>
          You retain ownership of data you submit to the Service. You grant us a
          limited licence to use such data solely to provide and improve the
          Service.
        </p>
      </LegalSection>

      <LegalSection title="6. Fees">
        <p>
          Fees, if any, are agreed separately in an order form or commercial
          agreement. Fees are non-refundable except as required by law.
        </p>
      </LegalSection>

      <LegalSection title="7. Disclaimers">
        <p>
          The Service is provided &quot;as is&quot; and &quot;as available&quot;
          without warranties of any kind, whether express or implied. We do not
          warrant that the Service will be uninterrupted, error-free, or meet
          your specific requirements.
        </p>
      </LegalSection>

      <LegalSection title="8. Limitation of liability">
        <p>
          To the maximum extent permitted by law, Canon shall not be liable for
          any indirect, incidental, special, consequential, or punitive damages
          arising from your use of the Service.
        </p>
      </LegalSection>

      <LegalSection title="9. Termination">
        <p>
          We may suspend or terminate your access at any time, with or without
          cause. You may stop using the Service at any time.
        </p>
      </LegalSection>

      <LegalSection title="10. Governing law">
        <p>
          These Terms are governed by the laws of England and Wales. Any
          disputes shall be resolved in the courts of England and Wales.
        </p>
      </LegalSection>

      <LegalSection title="11. Contact">
        <p>
          Questions about these Terms? Email{" "}
          <a href="mailto:hello@canon.app">hello@canon.app</a>.
        </p>
      </LegalSection>

      <LegalUpdated date="29 April 2026" />
    </>
  )
}
