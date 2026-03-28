import { usePageTitle } from "../hooks/usePageTitle";
import { SettingsHtmlEditorPage } from "../components/SettingsHtmlEditorPage";

const initialHtml = `
  <p>Iacus nulla eu netus pretium. Pellentesque scelerisque tellus nisl eu nisl sed senectus nunc. Porta sollicitudin vel elit varius nulla sit diam sed. Bibendum elit facilisi nulla viverra augue pellentesque gravida morbi.</p>
  <p>Diam pellentesque orci eget gravida cursus. Ut ut nulla sapien eget vitae at eget pretium. Tristique nibh ipsum iaculis quam. Vestibulum magna cursus facilisis adipiscing cras dui. Risus auctor faucibus orci tortor tristique elit.</p>
  <p>Ut suscipit cursus id mauris. Accumsan egestas sit arcu sed. Feugiat tortor pharetra id ipsum elit diam viverra tortor. Mattis tincidunt eget ut nunc in. Mauris ipsum ut purus laoreet nisi eu viverra velit adipiscing.</p>
`;

export function AboutUsPage() {
  usePageTitle("About Us");

  return <SettingsHtmlEditorPage title="About Us" initialHtml={initialHtml} />;
}
