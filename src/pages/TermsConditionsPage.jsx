import { usePageTitle } from "../hooks/usePageTitle";
import { SettingsHtmlEditorPage } from "../components/SettingsHtmlEditorPage";

export function TermsConditionsPage() {
  usePageTitle("Terms & Conditions");

  return (
    <SettingsHtmlEditorPage
      title="Terms & Conditions"
      contentKey="termsAndCondition"
    />
  );
}
