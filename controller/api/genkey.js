/* controller/genkey.js */
const getRandomHex = (len) => {
    len = len || 32;
    const chars = 'abcdef0123456789';
    const maxPos = chars.length;
    let pwd = '';
    for (i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));

    }
    return pwd;
}

module.exports = {
    genkey: async (ctx, next) => {
        let secret = getRandomHex(32);
        let iv = getRandomHex(32);
        ctx.session.key = {};
        ctx.session.key.ts = new Date().getTime();
        ctx.session.key.secret = secret;
        ctx.session.key.iv = iv;
        secret = Buffer.from(secret).toString('base64').slice(0, 43);
        iv = Buffer.from(iv).toString('base64').slice(0, 43);
        let data = "";
        for (let i = 0; i < secret.length; i++) {
            data += secret[i] + iv[i];
        }
        ctx.set("Content-Type", "text/plain");
        ctx.body = data;
    }
}