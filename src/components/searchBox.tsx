import React, { ChangeEvent, FC } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useGoogleMapsScript, Libraries } from "use-google-maps-script";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const libraries: Libraries = ['places']

interface Props {
  onSelectAddress: (address: string, latitude: number | null, longitude: number | null) => void
  defaultValue: string
}

const SearchBox: FC<Props> = (props) => {
  const {loadError, isLoaded} = useGoogleMapsScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    libraries
  })

  if(!isLoaded) return null

  if(loadError) return <h2>Loading error...</h2>

  return (
    <ReadySearchBox {...props} />
  );
};

const ReadySearchBox: FC<Props> = (props) => {
  const {onSelectAddress, defaultValue} = props

  const {ready, clearSuggestions, suggestions, value, setValue} = usePlacesAutocomplete({debounce: 300, defaultValue})

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    if (!e.target.value) {
      onSelectAddress('', null, null)
    }
  }

  const handleSelect = async (address: string) => {
    setValue(address, false)
    clearSuggestions()

    try {
      const results = await getGeocode({address})
      const {lat, lng} = await getLatLng(results[0])
      onSelectAddress(address, lat, lng)
    } catch (e) {}

  }

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        id='address'
        autoComplete='off'
        onChange={handleChange}
        disabled={!ready}
        className='w-full p-2'
        value={value}
      />
      <ComboboxPopover>
        <ComboboxList>
          {
            suggestions.status === 'OK' && suggestions.data.map(({description, place_id}) => (
              <ComboboxOption key={place_id} value={description} className='!text-black' />
            ))
          }
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  )
}

export default SearchBox;
