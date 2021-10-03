export type postType = {
    id: number
    message: string
    like: number,
    img: string
}
export type ContactType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type ProfileType = {
    userId: number | null
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactType
    photos: PhotosType
    followed: boolean
    aboutMe: string
}
export type UsersArrayType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}
