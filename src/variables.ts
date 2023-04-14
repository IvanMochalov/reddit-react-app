export const NODE_ENV = process.env.NODE_ENV;
export const IS_DEV = NODE_ENV !== 'production';
export const IS_PROD = NODE_ENV === 'production';

export let PORT = process.env.PORT || 3000;

export let params = {
  CLIENT_ID: IS_PROD ? 'k81bBSY6JVJZwYXC6X6-Lw' : '7jhaNYgHvNLiEJh8DPHRUw',
  SECRET: IS_PROD ? 'NdoI3HGQVIoiq5v1QpKB6W8dv_8SxA' : 'eLdkITrFSY46UTrveAz9if2kGzghqg',
  REDIRECT: IS_PROD ? 'https://mirror-app.onrender.com/auth' : `http://localhost:${PORT}/auth`,
}
