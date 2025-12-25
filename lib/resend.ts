import { Resend } from "resend";
import { env } from "./env";

// Create the Resend client only when an API key exists.
export const resend = env.RESEND_API_SECRET_KEY
	? new Resend(env.RESEND_API_SECRET_KEY)
	: new Resend("re_bQCTsRcC_5VDW3WqM4tEPCK6amD3UmgEE");

