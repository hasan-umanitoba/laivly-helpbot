const cache = require('./instance');
const userIdKey = 'user.id:';
const userEmailKey = 'user.email:';

/**
 * @param {String} id
 * @return {user}
 */
function getUserById(id) {
  const key = formatKey(userIdKey, id);
 
  return cache.get(key);
}

/**
 * @param {String} id 
 * @param {user} user
 * @returns {Boolean}
 */
function setUserById(id, user) {
  try {
    const key = formatKey(userIdKey, id);
    cache.set(
      key,
      formatUser(user)
    );
  
    return true;
  } catch(e) {
    console.log(e);
    
    return false;
  }
}

/**
 * @param {String} email
 * @returns {user}
 */
function getUserByEmail(email) {
  const key = formatKey(userEmailKey, email);
  const userId = cache.get(key);
  let user = null;

  if (userId) {
    user = getUserById(userId);
  }

  return user;
}

/**
 * @param {String} email
 * @param {*} user
 * @returns {Boolean}
 */
function setUserByEmail(email, user) {
  try {
    const key = formatKey(userEmailKey, email);
    cache.set(key, user.id);
    setUserById(user.id, user);
  
    return true;
  } catch(e) {
    console.log(e);

    return false;
  }
}

function formatKey(key, uid) {
  return `${key}${uid}`;
}

function formatUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.profile.email,
    deleted: user.deleted,
    realName: user.real_name,
    isBot: user.is_bot
  };
}

module.exports = {
  getUserById, setUserById, getUserByEmail, setUserByEmail
}