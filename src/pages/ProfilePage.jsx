import { useRef, useState } from "react";
import { usePageTitle } from "../hooks/usePageTitle";
import { DashboardPanel } from "../components/DashboardPanel";

const initialProfile = {
  userName: "Mr. Admin",
  email: "email@gmail.com",
  contactNo: "+1 222 333 4444",
  avatar: "",
};

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

function Field({ label, name, value, disabled, onChange, type = "text" }) {
  return (
    <label className="grid gap-2 text-[1rem] text-white">
      <span className="font-semibold">{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className={[
          "h-11 rounded-[4px] border px-3 text-white outline-none transition",
          disabled
            ? "border-white/30 bg-[#243149]/45 text-white/80"
            : "border-[#12ddd0] bg-[#243149]/70",
        ].join(" ")}
      />
    </label>
  );
}

export function ProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [draftProfile, setDraftProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const fileInputRef = useRef(null);
  usePageTitle("Profile");

  function handleEditStart() {
    setDraftProfile(profile);
    setIsEditing(true);
    setStatusMessage("");
  }

  function handleCancel() {
    setDraftProfile(profile);
    setIsEditing(false);
    setStatusMessage("Changes discarded.");
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setDraftProfile((currentProfile) => ({
      ...currentProfile,
      [name]: value,
    }));
  }

  function handleAvatarClick() {
    if (!isEditing) {
      handleEditStart();
      return;
    }

    fileInputRef.current?.click();
  }

  function handleAvatarChange(event) {
    const [file] = event.target.files || [];

    if (!file) {
      return;
    }

    const nextAvatar = URL.createObjectURL(file);

    setDraftProfile((currentProfile) => ({
      ...currentProfile,
      avatar: nextAvatar,
    }));

    setStatusMessage("Profile picture selected. Save to apply changes.");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setProfile(draftProfile);
    setIsEditing(false);
    setStatusMessage("Profile updated successfully.");
  }

  const currentProfile = isEditing ? draftProfile : profile;
  const action = isEditing ? (
    <button
      type="button"
      onClick={handleCancel}
      className="text-sm font-semibold text-white underline sm:text-base"
    >
      Cancel
    </button>
  ) : null;

  return (
    <DashboardPanel
      title="Profile"
      action={action}
      contentClassName="px-4 py-6 sm:px-6"
    >
      <form onSubmit={handleSubmit} className="mx-auto grid max-w-[420px] justify-items-center gap-6 py-1">
        <button
          type="button"
          onClick={handleAvatarClick}
          className="relative grid h-[86px] w-[86px] place-items-center rounded-full border-2 border-white/70 bg-linear-to-br from-slate-200 via-slate-500 to-slate-800 text-2xl font-semibold"
          aria-label="Edit profile"
        >
          {currentProfile.avatar ? (
            <img
              src={currentProfile.avatar}
              alt={currentProfile.userName}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            getInitials(currentProfile.userName)
          )}
          <span className="absolute bottom-0 right-0 grid h-7 w-7 place-items-center rounded-full bg-[#d9d9d9] text-slate-700">
            ✎
          </span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarChange}
        />

        <div className="text-center">
          <h3 className="text-[2rem] font-semibold text-white">{currentProfile.userName}</h3>
          <button
            type="button"
            onClick={handleEditStart}
            className="mt-4 font-semibold text-[#13ddd0] underline"
          >
            {isEditing ? "Editing Profile" : "Edit Profile"}
          </button>
        </div>

        <div className="grid w-full gap-4">
          <Field
            label="User Name"
            name="userName"
            value={draftProfile.userName}
            disabled={!isEditing}
            onChange={handleChange}
          />
          <Field
            label="Email"
            name="email"
            type="email"
            value={draftProfile.email}
            disabled
            onChange={handleChange}
          />
          <Field
            label="Contact No"
            name="contactNo"
            value={draftProfile.contactNo}
            disabled={!isEditing}
            onChange={handleChange}
          />
        </div>

        {statusMessage ? (
          <p className="text-center text-sm font-medium text-[#c6fffb]">
            {statusMessage}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={!isEditing}
          className="h-11 w-full rounded-[6px] bg-linear-to-r from-[#32cbc9] to-[#11d9cd] text-lg font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50"
        >
          Update Profile
        </button>
      </form>
    </DashboardPanel>
  );
}
