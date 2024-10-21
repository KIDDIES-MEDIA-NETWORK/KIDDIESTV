import React from 'react'
import AuthLayout from '../components/AuthLayout'

const page = () => {
  return (
    <div>
       <AuthLayout
            heading={"Create an account"}
            action={'signup'}
            placeholder={"Create a new password"}
            radioBtnInfo={
              "By signing up,  you’re agreeing to our Terms and Conditions"
            }
            buttonText={"Next"}
            loadingmessage={"Creating your account..."}
          />
    </div>
  )
}

export default page
