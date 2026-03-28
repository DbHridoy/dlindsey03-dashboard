import { usePageTitle } from "../hooks/usePageTitle";
import { SettingsHtmlEditorPage } from "../components/SettingsHtmlEditorPage";

export function AboutUsPage() {
  usePageTitle("About Us");

  return <SettingsHtmlEditorPage title="About Us" contentKey="aboutUs" />;
}
