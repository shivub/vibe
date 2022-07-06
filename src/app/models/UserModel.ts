import { SocialUser } from "@abacritt/angularx-social-login";

export class UserModel{
    userDetails!: SocialUser|undefined;
    isAdmin!: boolean;
    isPrime!: boolean;
}