import { MdKeyboardArrowDown } from "react-icons/md";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { fetchCities } from "../api/WhetherApiService";
import { City } from "../models/city.model";


export function SearchInput({ setCity }: { setCity: (city: City) => void }) {

  const [togle, settogle] = useState(false);
  const [q, setQ] = useState('')
  const [suggestions, setSuggestions] = useState<City[] | string[]>([])


  const previousQ = useRef(q);

  useEffect(() => {


    async function onSetQ() {
      setSuggestions(['Searching...'])
      const s = await fetchCities(q);
      if (s.length === 0) return setSuggestions(['No result found']);
      return setSuggestions(s);
    }
    if (previousQ.current !== q) onSetQ();
    previousQ.current = q;

  }, [q])

  return <div className="relative">

    <div
      className="flex items-center justify-center w-full rounded-md overflow-hidden  relative"
      onFocus={() => settogle(true)}
      onBlur={() => settogle(false)}
    >
      <DebounceInput
        type="text"
        debounceTimeout={1000}
        placeholder="Search for cities"
        className=" text-white w-full p-2 placeholder:text-sm placeholder:tracking-wide bg-black/30"
        onChange={(e) => setQ(e.target.value)} />
      <MdKeyboardArrowDown
        size={25}
        className="absolute right-1 top-2 border-l-2 fill-gray-400" />
    </div>

    {togle && (
      <div className="absolute top-full w-full my-2  rounded-md text-white bg-black/30 backdrop-blur  ">
        {suggestions?.map((item) => (
          <p key={(typeof item !== "string") ? item.id: "id"} className="px-4 py-2  cursor-pointer hover:bg-blue-500" onMouseDown={() => (typeof item !== "string") && setCity(item)}>{(typeof item === "string") ? item : item.name}</p>
        ))}
      </div>
    )}

  </div>;
}
