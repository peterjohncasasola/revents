import { useAppDispatch } from "@/app/store"
import { closeModal } from "@/common/modals/modalSlice"
import ModalWrapper from "@/common/modals/ModalWrapper"
import { useForm, type FieldValues } from "react-hook-form"
import { Button, Form } from "semantic-ui-react"
import { login } from "./authSlice"

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid }
  } = useForm({
    mode: "onTouched"
  })


  const dispatch = useAppDispatch()

  const onSubmit = (data: FieldValues) => {
    dispatch(login(data))
    dispatch(closeModal())
  }

  return (
    <ModalWrapper header="Sign into re-vents" size="tiny">
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Form.Input
          defaultValue=""
          label="Email"
          placeholder="Email address"
          {...register("email", {
            required: true,
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
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
          content="Login"
        />
      </Form>
    </ModalWrapper>
  )
}
