export class ValidationMessages {
    emptyField = "Field is empty";
    invalidEmail = "You have entered an invalid email address!"
    invalidPhone = "Not a valid phone number";
    weakPassword = "Password is weak must be at least 8 character long.";
    passwordNotMatchToConfirmPassword = "Password and confirm Password Doesn't match.";
    incorrectPassword = "Old Password entered is wrong.";
    sameToOldPass = "Old password and new password can't be same please choose a different password.";
    regexToTestEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
}

export class ProductsMessages {
    chooseFirst = "Choose first";
    productFinished = "Products finished."
}