export default function RatingFliter() {
  return (
    <div className="flex flex-col gap-[1rem] w-auto">
      <h3 className="font-bold text-xl text-gray-800">Rating</h3>
      <form>
        <div className="flex flex-col gap-[1rem]">
          <div className="flex items-center gap-[1.5rem]">
            <input
              type="checkbox"
              id="all"
              name="rating"
              className="appearance-none checked:bg-primary checked:rounded-[0.3rem] w-[2rem] h-[2rem] rounded-[0.6rem] border-solid border-[0.1rem] border-gray-300 bg-gray-100 cursor-pointer"
            />
            <label htmlFor="all">
              <span className="font-medium text-lg text-gray-800">전체</span>
            </label>
          </div>
          <div className="flex items-center gap-[1.5rem]">
            <input
              type="checkbox"
              id="highest"
              name="rating"
              className="appearance-none checked:bg-primary checked:rounded-[0.3rem] w-[2rem] h-[2rem] rounded-[0.6rem] border-solid border-[0.1rem] border-gray-300 bg-gray-100 cursor-pointer"
            />
            <label htmlFor="highest">
              <span className="font-medium text-lg text-gray-800">
                4.5 - 5.0
              </span>
            </label>
          </div>
          <div className="flex items-center gap-[1.5rem]">
            <input
              type="checkbox"
              id="muchHigher"
              name="rating"
              className="appearance-none checked:bg-primary checked:rounded-[0.3rem] w-[2rem] h-[2rem] rounded-[0.6rem] border-solid border-[0.1rem] border-gray-300 bg-gray-100 cursor-pointer"
            />
            <label htmlFor="muchHigher">
              <span className="font-medium text-lg text-gray-800">
                4.0 - 4.5
              </span>
            </label>
          </div>
          <div className="flex items-center gap-[1.5rem] cursor-pointer">
            <input
              type="checkbox"
              id="higher"
              name="rating"
              className="appearance-none checked:bg-primary checked:rounded-[0.3rem] w-[2rem] h-[2rem] rounded-[0.6rem] border-solid border-[0.1rem] border-gray-300 bg-gray-100 cursor-pointer"
            />
            <label htmlFor="higher">
              <span className="font-medium text-lg text-gray-800">
                3.5 - 4.0
              </span>
            </label>
          </div>
          <div className="flex items-center gap-[1.5rem]">
            <input
              type="checkbox"
              id="littleHigher"
              name="rating"
              className="appearance-none checked:bg-primary checked:rounded-[0.3rem] w-[2rem] h-[2rem] rounded-[0.6rem] border-solid border-[0.1rem] border-gray-300 bg-gray-100 cursor-pointer"
            />
            <label htmlFor="littleHigher">
              <span className="font-medium text-lg text-gray-800">
                3.0 - 3.5
              </span>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}
