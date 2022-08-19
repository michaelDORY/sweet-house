import Link from "next/link";
import React, {useState, useEffect, ChangeEvent, FC} from "react";
import { useForm } from "react-hook-form";
// import { useMutation, gql } from "@apollo/client";
// import { useRouter } from "next/router";
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

  const [imagePreview, setImagePreview] = useState<string | null>(null)
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

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(e?.target?.files?.[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <form
      className={`mx-auto py-4 px-8 max-w-2xl flex flex-col gap-3 rounded 
      items-stretch border-2 border-white border-opacity-30 ${styles}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className='text-xl font-bold text-center'>Add a new house</h1>
      <div>
        <label htmlFor='address'>Search for a place</label>
        <SearchBox defaultValue='' onSelectAddress={handleSelectAddress} />
        {errors.address && <p>{errors.address.message}</p>}
      </div>
      {
        address &&
        <div className='w-full flex flex-col items-stretch gap-3 mt-6'>
          <div className='w-full'>
            <label
              htmlFor='image'
              className={`block border-dashed border-2 border-white w-full py-4 
              text-center cursor-pointer hover:bg-blue-300 hover:bg-opacity-10 transition-all duration-200 ease-in-out`}>
              Add an image houses
            </label>
            <input
              id='image'
              name='image'
              type='file'
              accept='image/*'
              className='hidden'
              ref={register({
                validate: (fileList: FileList) => {
                  if (fileList.length === 1) return true;
                  return 'Add image';
                }
              })}
              onChange={handleImageChange}
            />
            {
              errors.image && <p className='text-red-300'>{errors.image.message}</p>
            }
          </div>
          {
            imagePreview && (
              <div className='h-64'>
                <img src={imagePreview} alt='image'
                     className='w-full h-full object-cover'/>
              </div>
            )
          }
          <div>
            <label htmlFor='bedrooms' className='block'>Bedrooms</label>
            <input
              id='bedrooms'
              name='bedrooms'
              type='number'
              className='w-32 text-2xl font-bold px-3 py-2'
              ref={register({
                required: 'Enter number of bedrooms',
                max: {value: 10, message: '10 is max'},
                min: {value: 1, message: '1 is min'}
              })}
            />
            {
              errors.bedrooms && <p className='text-red-300'>{errors.bedrooms.message}</p>
            }
          </div>
          <div>
            <button type='submit' disabled={isSubmitting} className='btn btn-primary mr-4'>Add</button>
            <Link href='/'><a className='btn btn-secondary'>Cancel</a></Link>
          </div>
        </div>
      }
    </form>
  );
};

export default HouseForm;
