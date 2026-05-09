import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { RequestOtpDto, requestOtpDtoSchema } from "@vigil/dto"

import { useRequestOtp } from "../api/auth.queries"

export function RequestOtpForm() {
  const form = useForm<RequestOtpDto>({
    resolver: zodResolver(requestOtpDtoSchema),
    defaultValues: {
      email: "",
    },
  })

  const { mutate: requestOtp } = useRequestOtp()

  const onSubmit = (dto: RequestOtpDto) => {
    requestOtp(dto)
  }

  return <></>
}
