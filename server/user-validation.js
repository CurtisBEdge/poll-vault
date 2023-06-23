const usernameRegex = /^[a-zа-щьюяґєії_]{3,}$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-zа-щьюяґєії])(?=.*[A-ZА-ЩЬЮЯҐЄІЇ])[a-zа-щьюяґєіїA-ZА-ЩЬЮЯҐЄІЇ\d]{8,}$/;

export const notValidUsername = (value) => {
  if (value === null || value === undefined) {
    return true
  }
  return (!usernameRegex.test(value))
}

export const notValidPassword = (value) => {
  if (value === null || value === undefined) {
    return true
  }
  return (!passwordRegex.test(value))
}

export const passwordsDontMatch = (password, confirmpassword) => {
  return (password !== confirmpassword)

}