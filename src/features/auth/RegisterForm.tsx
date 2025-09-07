import { useAppDispatch } from "@/app/store"
import { closeModal } from "@/common/modals/modalSlice"
import ModalWrapper from "@/common/modals/ModalWrapper"
import { useForm, type FieldValues } from "react-hook-form"
import { Button, Divider, Form } from "semantic-ui-react"
import { login } from "./authSlice"
import { auth } from "@/config/firebase"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { toast } from "react-toastify"
import { useFirestore } from "@/app/hooks/useFirestore"
import { Timestamp } from "firebase/firestore"
import SocialAuth from "./SocialAuth"
import { FirestoreCollections } from "@/config/firestoreCollections"

export default function RegisterForm() {
  const { setDocument } = useFirestore(FirestoreCollections.UserProfiles)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid }
  } = useForm({
    mode: "onTouched"
  })

  const dispatch = useAppDispatch()

  const onSubmit = async (data: FieldValues) => {
    try {
      const createdUser = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )
      await updateProfile(createdUser.user, { displayName: data.displayName })
      await setDocument(createdUser.user.uid, {
        displayName: data.displayName,
        email: data.email,
        isAdmin: false,
        userId: createdUser.user.uid,
        createdAt: Timestamp.now()
      })

      dispatch(login(createdUser.user))
      dispatch(closeModal())
    } catch (error) {
      toast.error(`Something went wrong: ${(error as Error).message}`)
    }
  }

  return (
    <ModalWrapper header="Register to re-vents" size="tiny">
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Form.Input
          defaultValue=""
          label="Display Name"
          placeholder="Display Name"
          {...register("displayName", { required: true })}
          error={errors.displayName && "Display Name is required"}
        />
        <Form.Input
          defaultValue=""
          label="Email"
          placeholder="Email address"
          {...register("email", {
            required: true,
            pattern: /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/
          })}
          error={
            (errors.email?.type === "pattern" &&
              "Please enter a valid email address") ||
            (errors.email?.type === "required" && "Email is required")
          }
        />
        <Form.Input
          defaultValue=""
          label="Password"
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
          error={errors.password && "Password is required"}
        />

        <Button
          loading={isSubmitting}
          type="submit"
          disabled={!isDirty || !isValid || isSubmitting}
          fluid
          size="large"
          color="teal"
          content="Register"
        />

        <Divider horizontal>Or</Divider>
        <SocialAuth isSignup={true}/>
      </Form>
    </ModalWrapper>
  )
}
