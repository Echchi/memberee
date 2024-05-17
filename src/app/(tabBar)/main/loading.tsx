export default function Loading() {
  return (
    <div className="relative box flex-col row-span-3 hover:shadow-lg transition-all h-1/2 md:h-full">
      <span className="box_title !bg-stone-100 rounded-lg h-10 !w-1/2 animate-pulse transition-all"></span>
      <div className="bg-stone-100 h-full rounded-lg mt-5 animate-pulse transition-all"></div>
    </div>
  );
}
