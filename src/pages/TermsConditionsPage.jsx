import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";
import { DashboardPanel } from "../components/DashboardPanel";

export function TermsConditionsPage() {
  usePageTitle("Terms & Conditions");

  const copy = [
    "Iacus nulla eu netus pretium. Pellentesque scelerisque tellus nisl eu nisl sed senectus nunc. Porta sollicitudin vel elit varius nulla sit diam sed. Bibendum elit facilisi nulla viverra augue pellentesque gravida morbi.",
    "Diam pellentesque orci eget gravida cursus. Ut ut nulla sapien eget vitae at eget pretium. Tristique nibh ipsum iaculis quam. Vestibulum magna cursus facilisis adipiscing cras dui. Risus auctor faucibus orci tortor tristique elit. Sit tincidunt id felis malesuada placerat ultricies enim. Purus ut congue ornare id sed.",
    "Ut suscipit cursus id mauris. Accumsan egestas sit arcu sed. Feugiat tortor pharetra id ipsum elit diam viverra tortor. Mattis tincidunt eget ut nunc in. Mauris ipsum ut purus laoreet nisi eu viverra velit adipiscing.",
  ];

  return (
    <DashboardPanel
      title="Terms & Conditions"
      backTo="/setting"
      action={
        <button type="button" className="h-8 rounded-[4px] bg-white px-6 text-sm font-semibold text-[#17b7bb]">
          Save
        </button>
      }
      contentClassName="px-4 py-5 text-[1rem] leading-9 text-white/80 sm:px-6"
    >
      <div>
          {copy.map((paragraph, index) => (
            <p key={`${paragraph.slice(0, 10)}-${index}`} className={index > 0 ? "mt-6" : ""}>
              {paragraph}
            </p>
          ))}
      </div>
    </DashboardPanel>
  );
}
