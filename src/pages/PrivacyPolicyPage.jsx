import { usePageTitle } from "../hooks/usePageTitle";
import { SettingsHtmlEditorPage } from "../components/SettingsHtmlEditorPage";

export function PrivacyPolicyPage() {
  usePageTitle("Privacy Policy");

  return (
    <SettingsHtmlEditorPage
      title="Privacy Policy"
      contentKey="privacyPolicy"
    />
  );
}
