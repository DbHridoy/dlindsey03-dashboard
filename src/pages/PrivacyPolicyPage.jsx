import { usePageTitle } from "../hooks/usePageTitle";
import { SettingsHtmlEditorPage } from "../components/SettingsHtmlEditorPage";

const initialHtml = `
  <p>Iacus nulla eu netus pretium. Pellentesque scelerisque tellus nisl eu nisl sed senectus nunc. Porta sollicitudin vel elit varius nulla sit diam sed. Bibendum elit facilisi nulla viverra augue pellentesque gravida morbi.</p>
  <p>Diam pellentesque orci eget gravida cursus. Ut ut nulla sapien eget vitae at eget pretium. Tristique nibh ipsum iaculis quam. Vestibulum magna cursus facilisis adipiscing cras dui. Risus auctor faucibus orci tortor tristique elit. Sit tincidunt id felis malesuada placerat ultricies enim. Purus ut congue ornare id sed.</p>
  <p>Ut suscipit cursus id mauris. Accumsan egestas sit arcu sed. Feugiat tortor pharetra id ipsum elit diam viverra tortor. Mattis tincidunt eget ut nunc in. Mauris ipsum ut purus laoreet nisi eu viverra velit adipiscing.</p>
`;

export function PrivacyPolicyPage() {
  usePageTitle("Privacy Policy");

  return <SettingsHtmlEditorPage title="Privacy Policy" initialHtml={initialHtml} />;
}
