export function AuthPageTitle({ title, description }) {
  return (
    <div className="mb-8 text-center md:mb-10">
      <h2 className="text-[2rem] font-semibold tracking-tight text-white sm:text-[2.4rem] md:text-[2.9rem]">
        {title}
      </h2>
      {description ? (
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/90 sm:text-lg md:mt-5 md:text-xl md:leading-8">
          {description}
        </p>
      ) : null}
    </div>
  );
}
