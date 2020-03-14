import puppeteer from 'puppeteer';
import {
    LOGIN_URL, EMPLOYEE_CODE, PASSWORD,
    FRAME_URL,
    EMPLOYEE_CODE_SELECTOR, PASSWORD_SELECTOR,
    PUNCH_IN_BUTTON_SELECTOR, PUNCH_OUT_BUTTON_SELECTOR
} from './lib/config';

type PunchType = 'in' | 'out'

interface AuthInfo {
    employeeCode: string;
    password: string;
}

function newAuthInfo(): AuthInfo {
    if (!EMPLOYEE_CODE || !PASSWORD) {
        throw new Error('Please set both of "EMPLOYEE_CODE" and "PASSWORD"')
    } else {
        return {
            employeeCode: EMPLOYEE_CODE,
            password: PASSWORD
        }
    }
}

// デコレータ
function log() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function () {
            console.log(`${new Date()} START ${propertyKey}`);
            const ret = originalMethod.apply(this, arguments);
            console.log(`${new Date()} END ${propertyKey}`);
            return ret;
        }
    }
}

class Puncher {
    frame: puppeteer.Frame | undefined;
    constructor(public authInfo:AuthInfo, private page:puppeteer.Page) {}

    @log()
    async login(): Promise<void> {
        await this.page.goto(LOGIN_URL, { waitUntil: 'networkidle0' });
        this.frame = await this.page.frames().find(frame => frame.url() === FRAME_URL);
        if (this.frame) {
            await this.frame.type(EMPLOYEE_CODE_SELECTOR, this.authInfo.employeeCode);
            await this.frame.type(PASSWORD_SELECTOR, this.authInfo.password);
        } else {
            throw Error('cannot find specified frame')
        }
    }

    async punch(punchType: PunchType) {
        switch (punchType) {
            case 'in': {
                await this.punchIn();
                break;
            }
            case 'out': {
                await this.punchOut();
                break;
            }
            default: {
                throw new Error('Please set [in|out] as arguments');
            }
        }
    }

    // 出勤
    @log()
    async punchIn(): Promise<void> {
        await this.login();
        await this.frame?.click(PUNCH_IN_BUTTON_SELECTOR);
        await this.page.waitFor(1000); // XXX
        // TODO エラー処理
    }

    // 退勤
    @log()
    async punchOut(): Promise<void> {
        await this.login();
        await this.frame?.click(PUNCH_OUT_BUTTON_SELECTOR);
        await this.page.waitFor(1000); // XXX
        // TODO エラー処理
    }
}

const main = async () => {
    const authInfo = newAuthInfo();
    const punchType = <PunchType>process.argv[2];
    const browser = await puppeteer.launch();
    try {
        const page = await browser.newPage();
        const puncher = new Puncher(authInfo, page);
        await puncher.punch(punchType);
    } catch(e) {
        console.log(e);
    } finally {
        await browser.close();
    }
}

main();