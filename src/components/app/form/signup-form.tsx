import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type {ComponentProps} from "react";

interface Props extends ComponentProps<"div"> {
  onLogin?: () => void
}

export function SignupForm({className, onLogin, ...props}: Props) {
  return (
      <div className={cn("gap-6 w-sm", className)} {...props}>
        <Card className="overflow-hidden p-0 shadow-[none]">
          <CardContent className="p-0 flex flex-col">
            <form className="p-6 md:p-8">
              <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">Create your account</h1>

                </div>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                  />
                  <FieldDescription>
                    We&apos;ll use this to contact you. We will not share your
                    email with anyone else.
                  </FieldDescription>
                </Field>
                <Field>
                  <Field className="grid grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <Input id="password" type="password" required />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="confirm-password">
                        Confirm Password
                      </FieldLabel>
                      <Input id="confirm-password" type="password" required />
                    </Field>
                  </Field>
                  <FieldDescription>
                    Must be at least 8 characters long.
                  </FieldDescription>
                </Field>
                <Field>
                  <Button type="submit">Create Account</Button>
                </Field>
                <Field className="grid grid-cols-3 gap-4">
                </Field>
                <FieldDescription className="text-center">
                  Already have an account? <Button type={'button'} variant={'ghost'} className={'px-1 hover:bg-transparent'} onClick={() => {onLogin?.()}}>Sign in</Button>
                </FieldDescription>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
  )
}
