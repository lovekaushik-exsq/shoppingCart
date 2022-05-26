import { notSameToOldPassword, oldPasswordIsCorrect, passwordValidate, validPhoneNumber } from "../../utilities/validation";
import { togglePassword, unAuthorized } from "../../utilities/generalFunction";
import { emptyField } from "../../utilities/validation";
import { IUserInfo } from "../../models/types";
import * as api from "../../api/index"


export const profile = () => {
    let first = true;
    const profile = document.getElementById('profile');
    const modal = document.getElementById('myModal');
    const data = localStorage.getItem('profile')!;
    const user = JSON.parse(data);
    document.getElementById('myModal')!.innerHTML = (`
        <div class="modal-content">
          <span class="close">&times;</span>
          <p>Name: ${user.userInfo.userName}</p>
          <p>Email: ${user.userInfo.userEmail}</p>
          <p>Phone Number: ${user.userInfo.userPhoneNumber}</p>
          <button id="editUser">Edit profile</button>
          <button id="logout">Logout</button>
          </div>
          `)

    document.getElementById('editUser')?.addEventListener('click', (e: Event) => {
        e.preventDefault();
        window.location.href = 'editProfile.html'
    })

    const close = document.getElementsByClassName('close')[0];
    profile?.addEventListener('click', () => {
        modal!.style.display = 'block';
    });

    close.addEventListener('click', () => {
        modal!.style.display = 'none';
    })

    document.getElementById('logout')?.addEventListener('click', () => {
        localStorage.clear();
        window.location.href = 'index.html'
    })

    window.addEventListener('click', (event: Event) => {
        if (event.target == modal) {
            modal!.style.display = "none";
        } else if (first) {
            modal!.style.display = 'block';
            first = false;
        }
    })
}

const user = localStorage.getItem('profile');
export const loadEditProfile = () => {
    togglePassword();
    if (!user) {
        window.location.href = 'index.html';
    }
}

export const editProfile = async () => {
    const userName = (<HTMLInputElement>document.getElementById("user_name")).value;
    const oldPassword = (<HTMLInputElement>document.getElementById("oldPassword")).value;
    const userPassword = (<HTMLInputElement>document.getElementById("password")).value;
    const confirmPassword = (<HTMLInputElement>document.getElementById("confirmPassword")).value;
    const userPhoneNumber = (<HTMLInputElement>document.getElementById("phoneNumber")).value;
    const userEmail = JSON.parse(user!).userInfo.userEmail;
    const fields = {
        userName,
        userEmail,
        oldPassword,
        userPassword,
        confirmPassword,
        userPhoneNumber
    }
    const updatedUser: IUserInfo = {
        userEmail,
        userName,
        userPassword,
        userPhoneNumber
    };
    const error: string[] = [];
    error.length = 0;
    if (emptyField(fields, error) || (await validationFail(fields, error))) {
        document.getElementById('msg')!.innerHTML = error.join(`\n`);
        return;
    }
    const updatedProfile = await api.updateUser(updatedUser);

    if (typeof updatedProfile.data === 'string') {
        return unAuthorized(updatedProfile.data);
    }
    localStorage.clear();
    window.location.href = 'index.html';

}

const validationFail = async (user: any, error: string[]) => {
    let err: boolean = false;
    const oldPassword = await oldPasswordIsCorrect(user, error);
    notSameToOldPassword(oldPassword, user.userPassword, error);
    passwordValidate(user.userPassword, user.confirmPassword!, error)
    validPhoneNumber(user.userPhoneNumber, error);
    if (error.length > 0) {
        err = true;
    }
    return err;
}