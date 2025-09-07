import { useForm, type FieldValues } from "react-hook-form"
import { Link } from "react-router-dom"
import { Button, Form, Header, Icon, Segment } from "semantic-ui-react"
import { providers } from "./authProviders"
import { useAppSelector } from "@/app/store"
import { useEffect } from "react"

export default function AccountPage() {
  const { currentUser } = useAppSelector((state) => state.auth)

  const {
    register,
    handleSubmit,
    getValues: formValues,
    trigger,
    watch,
    formState: { errors, isSubmitting, isValid }
  } = useForm({
    mode: "onTouched"
  })

  const password = watch("password")
  const confirmPassword = watch("confirmPassword")

  const onSubmit = (data: FieldValues) => {
    console.log("Form submitted:", data)
  }

  useEffect(() => {
    if (confirmPassword) trigger("confirmPassword")
  }, [confirmPassword, trigger, password])

  return (
    <Segment>
      <Header dividing size="large" content="Account" />

      {/* Change password section */}
      <PasswordForm
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        isSubmitting={isSubmitting}
        isValid={isValid}
        formValues={formValues}
      />

      {/* External provider section */}
      {providers
        .filter(
          (provider) =>
            currentUser?.providerId === provider.link.replace("https://", "")
        )
        .map((provider) => (
          <ProviderSettings key={provider.name} {...provider} />
        ))}
    </Segment>
  )
}

/* --- Subcomponents --- */

function PasswordForm({
  register,
  handleSubmit,
  onSubmit,
  errors,
  isSubmitting,
  isValid,
  formValues
}: any) {
  return (
    <div>
      <Header color="teal" sub content="Change password" />
      <p>Use this form to change your password</p>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Input
          label="Password"
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
          error={errors.password && "Password is required"}
        />

        <Form.Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: true,
            validate: {
              passwordMatch: (value: any) =>
                value === formValues().password ||
                "Password and confirm password do not match"
            }
          })}
          error={
            (errors.confirmPassword?.type === "required" &&
              "Confirm Password is required") ||
            (errors.confirmPassowrd?.type === "passwordMatch" &&
              errors.confirmPassword?.message)
          }
        />

        <Button
          loading={isSubmitting}
          disabled={!isValid || isSubmitting}
          type="submit"
          icon="send"
          positive
          content="Update password"
        />
      </Form>
    </div>
  )
}

function ProviderSettings({ label, link, color, icon }: any) {
  return (
    <div style={{ marginTop: "1em" }}>
      <Header color="teal" sub content={`${label} Account`} />
      <p>Please visit {label} to update your account settings</p>
      <Button as={Link} to={link} color={color}>
        <Icon name={icon} /> Go to {label}
      </Button>
    </div>
  )
}
