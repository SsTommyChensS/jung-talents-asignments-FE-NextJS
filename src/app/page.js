"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"

import { createOrder } from "@/services/orderService"

const data = {
    totalAmount: {amount: '190.00', currency: 'EUR'},
    consumer: {
      phoneNumber: '0400000001',
      givenNames: 'Joe',
      surname: 'Consumer',
      email: 'test@scalapay.com'
    },
    shipping: {
      name: 'Joe Consumer',
      line1: 'Via della Rosa, 58',
      suburb: 'Montelupo Fiorentino',
      postcode: '50056',
      countryCode: 'IT',
      phoneNumber: '0400000000'
    },
    items: [
      {
        name: 'T-Shirt',
        category: 'clothes',
        subcategory: ['shirt', 'long-sleeve'],
        brand: 'TopChoice',
        gtin: '123458791330',
        sku: '12341234',
        quantity: 1,
        price: {amount: '10.00', currency: 'EUR'}
      },
      {
        name: 'Jeans',
        category: 'clothes',
        subcategory: ['pants', 'jeans'],
        brand: 'TopChoice',
        gtin: '123458722222',
        sku: '12341235',
        quantity: 1,
        price: {amount: '20.00', currency: 'EUR'}
      }
    ],
    merchant: {
      redirectConfirmUrl: 'https://portal.integration.scalapay.com/success-url',
      redirectCancelUrl: 'https://portal.integration.scalapay.com/failure-url'
    },
};


export default function Home() {
  const [displayMsg, setDisplayMsg] = useState(false);

  const validationSchema = Yup.object().shape({
    consumer_phoneNumber: Yup.string()
      .required("Consumer's phone number is required!")
      .matches(/^[0-9]+$/, "Phone number must be only digits")
      .min(10, "Phone number must be 10 or 11 digits!")
      .max(11, "Phone number must be 10 or 11 digits!"),
    consumer_givenNames: Yup.string()
      .required("Consumer's given name is required!"),
    consumer_surname: Yup.string()
      .required("Consumer's surname is required!"),
    consumer_email: Yup.string()
      .required("Consumer's email is required!")
      .email("Invalid consumer's email value!"),
    shipping_name: Yup.string()
      .required("Shipping's name is required!"),
    shipping_line1: Yup.string()
      .required("Shipping's adress line is required!"),
    shipping_suburd: Yup.string()
      .required("Shipping's city is required!"),
    shipping_postcode: Yup.string()
      .required("Shipping's postcode is required!"),
    shipping_countryCode: Yup.string()
      .required("Shipping's country code is required!")
      .min(2, "Shipping's country code must be 2 charaters!")
      .max(2, "Shipping's country code must be 2 charaters!"),
    shipping_phoneNumber: Yup.string()
      .required("Shipping's phone number is required!")
      .matches(/^[0-9]+$/, "Shipping's phone number must be only digits")
      .min(10, "Shipping's phone number must be 10 or 11 digits!")
      .max(11, "Shipping's phone number must be 10 or 11 digits!"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;


  const onSubmit = (order_info) => {
    createOrder(data)
    .then(response => {
        const checkoutUrl = response.data.data.checkoutUrl;
        setDisplayMsg(true);

        setTimeout(() => {
          window.location.href = checkoutUrl;
        }, 2000);
    })
    .catch(error => {
        const error_response = error.response;
        console.log(error_response);
    });
  };

  useEffect(() => {
    reset({ 
      consumer_phoneNumber: data.consumer.phoneNumber,
      consumer_givenNames: data.consumer.givenNames,
      consumer_surname: data.consumer.surname,
      consumer_email: data.consumer.email,
      shipping_name: data.shipping.name,
      shipping_line1: data.shipping.line1,
      shipping_suburd: data.shipping.suburb,
      shipping_postcode: data.shipping.postcode,
      shipping_countryCode: data.shipping.countryCode,
      shipping_phoneNumber: data.shipping.phoneNumber
    })
  }, [])

  return (
    <main className="mt-4 ml-2">
      <div className="create-order-section p-2 w-4/5">
        <h1 className="create-order__title mb-4 text-4xl text-lime-800 font-bold">Create order:</h1>
        <div className="create-order__form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="border border-solid border-gray-300 p-4">
              <legend className="bg-gray-400 p-2 rounded border-stone-400 text-white">Customer:</legend>
              <div className="relative z-0 w-full mb-6 group">
                <input {...register("consumer_phoneNumber")} type="text" disabled name="consumer_phoneNumber" id="consumer_phoneNumber" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
                <label htmlFor="consumer_phoneNumber" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number:</label>
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.consumer_phoneNumber?.message}</p>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input {...register("consumer_givenNames")} type="text" disabled name="consumer_givenNames" id="consumer_givenNames" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
                <label htmlFor="consumer_givenNames" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Given name:</label>
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.consumer_givenNames?.message}</p>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input {...register("consumer_surname")} type="text" disabled name="consumer_surname" id="consumer_surname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
                <label htmlFor="consumer_surname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Surname:</label>
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.consumer_surname?.message}</p>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input {...register("consumer_email")} type="email" disabled name="consumer_email" id="consumer_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
                <label htmlFor="consumer_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email:</label>
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.consumer_email?.message}</p>
              </div>
            </fieldset>
            <fieldset className="border border-solid border-gray-300 p-4 mt-4">
              <legend className="bg-gray-400 p-2 rounded border-stone-400 text-white">Shipping:</legend>
              <div className="relative z-0 w-full mb-6 group">
                <input {...register("shipping_name")} type="text" disabled name="shipping_name" id="shipping_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
                <label htmlFor="shipping_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name:</label>
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.shipping_name?.message}</p>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input {...register("shipping_line1")} type="text" disabled name="shipping_line1" id="shipping_line1" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
                <label htmlFor="shipping_line1" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address line:</label>
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.shipping_line1?.message}</p>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input {...register("shipping_suburd")} type="text" disabled name="shipping_suburd" id="shipping_suburd" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
                <label htmlFor="shipping_suburd" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City:</label>
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.shipping_suburd?.message}</p>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input {...register("shipping_postcode")} type="text" disabled name="shipping_postcode" id="shipping_postcode" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
                <label htmlFor="shipping_postcode" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Postcode:</label>
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.shipping_postcode?.message}</p>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input {...register("shipping_countryCode")} type="text" disabled name="shipping_countryCode" id="shipping_countryCode" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
                <label htmlFor="shipping_countryCode" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Postcode:</label>
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.shipping_countryCode?.message}</p>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input {...register("shipping_phoneNumber")} type="text" disabled name="shipping_phoneNumber" id="shipping_phoneNumber" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
                <label htmlFor="shipping_phoneNumber" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Postcode:</label>
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.shipping_phoneNumber?.message}</p>
              </div>
            </fieldset>
            <fieldset className="border border-solid border-gray-300 p-4 mt-4">
              <legend className="bg-gray-400 p-2 rounded border-stone-400 text-white">Items:</legend>
              <div className="list-items-section flex flex-row justify-around gap-10">
                { data.items.map(item => { return (
                  <div className="item_info w-full" key={item.name}>
                    <div className="relative z-0 w-full mb-6 group">
                      <input defaultValue={item.name} type="text" disabled className="block py-2.5 px-0 w-full text-sm text-red-500 font-bold bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
                      <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name:</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                      <input defaultValue={item.category} type="text" disabled className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
                      <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Category:</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                      <input defaultValue={item.sku} type="text" disabled className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
                      <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Sku:</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                      <input defaultValue={item.quantity} type="number" disabled className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
                      <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Quantity:</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                      <input defaultValue={`${item.price.amount} ${item.price.currency}` } type="text" disabled className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
                      <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price:</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                      <label className="font-small text-gray-500">Subcategory:</label>
                      {
                        item.subcategory.map((sub, index) => { return (
                          <span className="text-blue-400 m-2" key={index}>{`#${sub}`}</span>
                        )})
                      }
                    </div>
                  </div>
                )        
                })}
              </div>     
            </fieldset>
            <fieldset className="border border-solid border-gray-300 p-4 mt-4">
              <legend className="bg-gray-400 p-2 rounded border-stone-400 text-white">Total:</legend>
              <label className="text-2xl text-gray-400">Total:</label>
              <span className="ml-2 text-2xl text-blue-600 font-bold">{`${data.totalAmount.amount} ${data.totalAmount.currency}`}</span>
            </fieldset>
            <div className="m-4">
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Order</button>
            </div>
            {
              displayMsg && (
                <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:text-green-800" role="alert">
                  <span className="font-medium">Create order successfully!</span> 
                </div>        
              )
            }
          </form>
        </div>
      </div>
    </main>
  )
}
