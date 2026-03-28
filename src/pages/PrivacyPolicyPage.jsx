import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";
import { DashboardPanel } from "../components/DashboardPanel";

const copy = [
  "Iacus nulla eu netus pretium. Pellentesque scelerisque tellus nisl eu nisl sed senectus nunc. Porta sollicitudin vel elit varius nulla sit diam sed. Bibendum elit facilisi nulla viverra augue pellentesque gravida morbi.",
  "Diam pellentesque orci eget gravida cursus. Ut ut nulla sapien eget vitae at eget pretium. Tristique nibh ipsum iaculis quam. Vestibulum magna cursus facilisis adipiscing cras dui. Risus auctor faucibus orci tortor tristique elit. Sit tincidunt id felis malesuada placerat ultricies enim. Purus ut congue ornare id sed.",
  "Ut suscipit cursus id mauris. Accumsan egestas sit arcu sed. Feugiat tortor pharetra id ipsum elit diam viverra tortor. Mattis tincidunt eget ut nunc in. Mauris ipsum ut purus laoreet nisi eu viverra velit adipiscing.",
];

function RichEditorFooter() {
  return (
    <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="flex items-center gap-3 text-white">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-white text-slate-400">☁</div>
        <div>
          <p className="font-semibold">Upload your image</p>
          <p className="text-sm text-white/55">jpg/png • Max. 5MB</p>
        </div>
        <button type="button" className="h-9 rounded-[4px] bg-[#1dd7ce] px-4 text-sm font-semibold text-white">
          Upload
        </button>
      </div>

      <div className="flex items-center gap-2 text-[0.7rem] text-[#14ddd0]">
        {["12", "B", "I", "U", "≡", "☰", "☷", "☰"].map((item, index) => (
          <button
            key={`${item}-${index}`}
            type="button"
            className="grid h-4 min-w-4 place-items-center border border-[#14ddd0] px-1"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export function PrivacyPolicyPage() {
  usePageTitle("Privacy Policy");

  return (
    <DashboardPanel
      title="Privacy Policy"
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
          <RichEditorFooter />
      </div>
    </DashboardPanel>
  );
}
