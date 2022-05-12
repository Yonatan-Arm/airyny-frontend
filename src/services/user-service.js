import { storageService } from "./async-storage-service.js";
import { stayService } from "./stay-service.js";
import { orderService } from "./order-service.js";
import { httpService } from "./http.service.js";
import { utilService } from "./util-service.js";
import { socketService } from "./socket.service.js";

const STORAGE_KEY = "userDB";
const ENDPOINT = "auth";

export const userService = {
  getLoggedinUser,
  saveUser,
  getUserStays,
  getUserOrder,
  getUserLikedStays,
  login,
  signup,
  logout,
};

async function getUserStays(entityId) {
  let userStays = []
  const stays = await stayService.query();
  try {
    userStays = stays.filter(stay => stay.host.id === entityId)
    return userStays
  } catch {
    console.log('cant get user');

  }
}

async function getUserLikedStays(likedStays) {
  return await Promise.all(
    likedStays.map((likedStay) => {
      return stayService.getById(likedStay);
    })
  );
}
async function getUserOrder(entityId) {
  let userOrders = []
  const orders = await orderService.query();
  try {
    userOrders = orders.filter(order => order.hostId === entityId)
    return userOrders;
  } catch {
    console.error("cannot get user order");
  }

}


async function login(userInfo) {
  try {
    const loggedInUser = await httpService.post(`${ENDPOINT}/login`, userInfo);
    utilService.saveToSessionStorage(STORAGE_KEY, loggedInUser);
    socketService.emit('set-user-socket', loggedInUser.id)
    return loggedInUser;
  } catch {
    console.log("cant login");
  }
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "null");
}

async function saveUser(user) {
  user = await httpService.put(`user/${user._id}`, user);
  // Handle case in which admin updates other user's details
  if (getLoggedinUser()._id === user._id) _saveLocalUser(user);
  return user;
}

function _saveLocalUser(user) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  return user
}

async function logout() {
  try {
    const loggedOutUser = await httpService.post(`${ENDPOINT}/logout`);
    utilService.removeFromSessionStorage(STORAGE_KEY);
    socketService.emit('unset-user-socket', loggedOutUser.id)
    return loggedOutUser;
  } catch {
    console.log("logout failed");
  }
}

async function signup(userDetails) {
  try {
    return await httpService.post(`${ENDPOINT}/signup`, userDetails);
    // return signUser.data
  } catch {
    console.log("cant login");
  }
}

(async () => {
  var user = getLoggedinUser()
  if (user) socketService.emit('set-user-socket', user.id)
})();
