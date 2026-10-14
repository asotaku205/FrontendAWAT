import { Search } from 'lucide-react'

const SearchInput = ({placeholder}:{placeholder:string}) => {
  return (
    <div className="relative">
            <Search
              className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500"
              size={20}
            />

            <input
              type="text"
              placeholder = {placeholder}
              className=" rounded-lg border border-gray-300 p-2 pl-10"
            />
          </div>
  )
}

export default SearchInput