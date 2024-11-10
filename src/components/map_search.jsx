import { SearchBox } from '@mapbox/search-js-react';

const SearchMap = () => {
  return (
    <div>
    <SearchBox
      accessToken={process.env.REACT_APP_MAPBOX}
      options={{
        language: 'en',
        country: 'US'
      }}
    />
    </div>
  )
}

export default SearchMap
