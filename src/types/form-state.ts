import { ValidationErrors } from '@/types/validation-errors'

export type FormState<
  T extends Record<string, unknown> = Record<string, unknown>,
> = {
  message?: string
  validationErrors?: ValidationErrors<T>
  isError: boolean
} | null
