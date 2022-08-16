import React, {useState, useEffect, ChangeEvent, FC} from "react";
import { useForm } from "react-hook-form";
// import { useMutation, gql } from "@apollo/client";
// import { useRouter } from "next/router";
// import Link from "next/link";
// import { Image } from "cloudinary-react";
import SearchBox from "./searchBox";
// import {
//   CreateHouseMutation,
//   CreateHouseMutationVariables,
// } from "src/generated/CreateHouseMutation";
// import {
//   UpdateHouseMutation,
//   UpdateHouseMutationVariables,
// } from "src/generated/UpdateHouseMutation";
// import { CreateSignatureMutation } from "src/generated/CreateSignatureMutation";

interface IFormData {
  address: string;
  latitude: number;
  longitude: number;
  bedrooms: number;
  image: FileList;
}

interface Props {
  styles?: string;
}

const HouseForm: FC<Props> = (props) => {
  const {styles} = props

  const [isSubmitting, setIsSubmitting] = useState(false)
  const {register, handleSubmit, errors, setValue, watch} = useForm<IFormData>({defaultValues: {}})
  const address = watch('address')

  useEffect(() => {
    register('address', {required: true})
    register('latitude', {required: true, min: -90, max: 90})
    register('longitude', {required: true, min: -180, max: 180})
  }, [register])

  const handleSelectAddress = (address: string, latitude: number | null, longitude: number | null) => {
    setValue('address', address)
    setValue('latitude', latitude)
    setValue('longitude', longitude)
  }

  const handleCreate = (data: IFormData) => {

  }

  const onSubmit = (data: IFormData) => {
    setIsSubmitting(true)
    handleCreate(data)
    setIsSubmitting(false)
  }

  return (
    <form
      className={`mx-auto py-4 px-8 max-w-2xl flex flex-col gap-3 items-center border-2 border-white ${styles}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className='text-lg'>Add a new house</h1>
      <div>
        <label htmlFor='address'>Search for a place</label>
        <SearchBox defaultValue='' onSelectAddress={handleSelectAddress} />
        {errors.address && <p>{errors.address.message}</p>}
      </div>
      <h2>{address}</h2>
    </form>
  );
};

export default HouseForm;
