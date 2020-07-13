export function getRedirectTo(type,avatar) {
    let path = ''
    //employer will redirect to employer page,employee to employee page
    if(type === 'employer') {
        path = 'employer'
    } else {
        path = 'employee'
    }
    //if both of them didn't choose the avatar, need to redirect info page for complete their profile info
    if(!avatar) path += '_info'
    return path
}
