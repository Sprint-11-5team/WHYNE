export default function RatingFilter() {
  return (
    <div className="flex flex-col gap-[1.6rem] w-auto">
      <h3 className="font-bold text-[1.8rem] text-gray-800">RATING</h3>
      <form>
        <fieldset className="flex flex-col gap-[1.2rem]">
          {[
            { id: "all", label: "전체" },
            { id: "highest", label: "4.5 - 5.0" },
            { id: "muchHigher", label: "4.0 - 4.5" },
            { id: "higher", label: "3.5 - 4.0" },
            { id: "littleHigher", label: "3.0 - 3.5" },
          ].map(({ id, label }) => (
            <div key={id} className="flex">
              <label
                htmlFor={id}
                className="flex items-center gap-[1.2rem] cursor-pointer relative"
              >
                <input type="checkbox" id={id} name="rating" className="" />
                <span className="absolute inset-0 bg-transparent peer-checked:bg-primary peer-checked:w-[1rem] peer-checked:h-[1rem] peer-checked:top-[0.5rem] peer-checked:left-[0.5rem] transition-all rounded-[0.3rem]" />
                <span className="font-medium text-[1.6rem] text-gray-800">
                  {label}
                </span>
              </label>
            </div>
          ))}
        </fieldset>
      </form>
    </div>
  );
}
