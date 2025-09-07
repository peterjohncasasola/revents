import { useForm, type FieldValues } from "react-hook-form"
import { Link } from "react-router-dom"
import { Button, Form, Header, Icon, Segment, Message } from "semantic-ui-react"
import { providers } from "./authProviders"
import { useAppSelector } from "@/app/store"

export default function AccountPage() {
  const { currentUser } = useAppSelector((state) => state.auth)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid }
  } = useForm({
    mode: "onTouched"
  })

  const onSubmit = (data: FieldValues) => {
    console.log("Form submitted:", data)
  }

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
      />

      {/* External provider section */}
      {providers
        .filter((provider) => currentUser?.providerId === provider.link.replace("https://", ""))
        .map((provider) => (
          <ProviderSettings key={provider.name} {...provider} />
        ))}
    </Segment>
  )
}

/* --- Subcomponents --- */

function PasswordForm({ register, handleSubmit, onSubmit, errors, isSubmitting, isValid }: any) {
  return (
    <div>
      <Header color="teal" sub content="Change password" />
      <p>Use this form to change your password</p>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Input
          label="Password"
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
          error={
            errors.password && <Message error content={errors.password.message} />
          }
        />

        <Form.Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword", { required: "Confirm Password is required" })}
          error={
            errors.confirmPassword && (
              <Message error content={errors.confirmPassword.message} />
            )
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
