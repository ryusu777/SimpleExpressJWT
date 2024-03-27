import { readFile } from 'node:fs/promises';

/**
 * @param {string} username
 * @param {string} password
 * @returns {Object} user
 * @returns {string} user.username
 * @returns {string} user.password
 */

const findUser = async (username, password) => {
    try {
        const fileContent = await readFile("data/users.json");
        const data = JSON.parse(fileContent);

        const foundUser = data
            .find(e => 
                e.username === username &&
                e.password === password);
        
        return foundUser;
    } catch(err) {
        throw err;
    }
}

export {
    findUser
}
