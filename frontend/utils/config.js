export function imgProducts() {  
  const authData = JSON.parse(localStorage.getItem("auth"));
  const showImgProducts = authData.user.img_products;

  return true;
}

export function adminUser() {  
  const authData = JSON.parse(localStorage.getItem("auth"));
  const userAdmin = authData.user.admin;

  return true;
}
