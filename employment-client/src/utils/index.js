export function getRedirectTo(type,avatar) {
    let path = ''
    if(type === 'employer') {
        path = 'employer'
    } else {
        path = 'employee'
    }
    if(!avatar) path += '_info'
    return path
}