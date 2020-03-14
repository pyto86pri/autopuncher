import * as dotenv from 'dotenv';

dotenv.config();

export const LOGIN_URL = process.env.LOGIN_URL || "";
export const FRAME_URL = process.env.FRAME_URL || "";
export const EMPLOYEE_CODE = process.env.EMPLOYEE_CODE;
export const PASSWORD = process.env.PASSWORD;
export const EMPLOYEE_CODE_SELECTOR = process.env.EMPLOYEE_CODE_SELECTOR || "";
export const PASSWORD_SELECTOR = process.env.PASSWORD_SELECTOR || "";
export const PUNCH_IN_BUTTON_SELECTOR = process.env.PUNCH_IN_BUTTON_SELECTOR || "";
export const PUNCH_OUT_BUTTON_SELECTOR = process.env.PUNCH_OUT_BUTTON_SELECTOR || "";

