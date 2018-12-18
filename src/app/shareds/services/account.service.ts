import { Injectable } from "@angular/core";
import { IRegister } from "src/app/components/register/register.interface";
import { ILogin } from "src/app/components/login/login.interface";
import { AlertService } from "./alert.service";

@Injectable()

export class AccountService {

    private mockUserItems: IAccount[] = [
        {
            id: 1,
            firstname: 'naluebet',
            lastname: 'manpati',
            email: 'naluebet.m@gmail.com',
            password: '12341234',
            position: 'Frontend Developer',
            image: 'https://scontent.fbkk5-3.fna.fbcdn.net/v/t1.0-1/p160x160/47436678_1838941552870058_8139537125608521728_n.jpg?_nc_cat=111&_nc_eui2=AeG-YwaZRAs28hC34ibWJ8Bj0cPDomlKHABpOqmwog_SpZeUy6AEnyosOzozNwGIPj1xcYmU86DC4ZcOLrYId_DZuXp0No2IkvtH3-JZDQVYzQ&_nc_ht=scontent.fbkk5-3.fna&oh=807b9b5bfaafdaaaa94a8fc866d14800&oe=5C96C56F',
            created: new Date(),
            updated: new Date()
        },
        {
            id: 2,
            firstname: 'naluebet',
            lastname: 'manpati',
            email: 'naluebet2014@gmail.com',
            password: '12341234',
            position: 'Mobile Developer',
            image: null,
            created: new Date(),
            updated: new Date()
        }
    ];

    constructor(
        private alert: AlertService
    ) { }

    getUserLogin(accessToken: string) {
        return new Promise<IAccount>((resolve, reject) => {
            const userLogin = this.mockUserItems.find(m => m.id == accessToken);
            if (!userLogin) {
                return reject({ Message: 'accessToken ไม่ถูกต้อง' });
            }
            resolve(userLogin);
        });
    }

    // เข้าสู่ระบบ
    onLogin(model: ILogin) {
        return new Promise<{ accessToken: string }>((resolve, reject) => {
            const userLogin = this.mockUserItems.find(item => item.email === model.email && item.password === model.password);
            // console.log(userLogin);
            if (!userLogin) {
                return reject({ Message: 'ชื่อผู้ใช้งานหรือรหัสผ้านไม่ถูกต้อง' });
            }
            resolve({
                accessToken: userLogin.id
            });
        });
    }

    // ลงทะเบียน
    onRegister(model: IRegister) {
        return new Promise((resolve, reject) => {
            model['id'] = Math.random;
            this.mockUserItems.push(model);
            resolve(model);
        });
    }
}

export interface IAccount {
    firstname: string;
    lastname: string;
    email: string;
    password: string;

    id?: any;
    position?: string;
    image?: string;
    created?: Date;
    updated?: Date;
}