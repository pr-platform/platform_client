export type SendEmailArgs = {
  to: string,
  subject?: string,
  text?: string,
  html?: string,
}

export type SendEmailResponse = {
  message_send: string,
}
