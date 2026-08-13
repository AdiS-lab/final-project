import { supabase } from '../utils/supabase.js'

//_____________ signup Service ___________________________
export const createUser = async (userData: { email: string; password: string }) => {
    try {
        const { email, password } = userData
        console.log({ email, password })

        const { data, error } = await supabase.auth.admin.createUser({ email, password, email_confirm: true })

        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({ email, password })

        console.log(error)
        console.log(data)
        console.log(loginData)
        const { access_token, refresh_token } = loginData.session!
        console.log('sign up accessTOKEN' + access_token)
        return { user: data, accessToken: access_token, refreshToken: refresh_token }
    }
    catch (error) {
        console.log(error)
        throw error
    }
}


//______________login Service_________________

export const authUser = async (userData: { email: string; password: string }) => {
    try {
        console.log(userData)
        const { email, password } = userData

        const { data, error } = await supabase.auth.signInWithPassword({ email, password })

        const { access_token, refresh_token } = data.session!
        return { user: data, accessToken: access_token, refreshToken: refresh_token }
    }
    catch (error) {
        console.log(error)
        throw error
    }
}


//_______________get user info upon token____________

export const getUserInformation = async (id: string) => {
    try {
        console.log(id)
        const { data, error } = await supabase.auth.admin.getUserById(id)

        if (!data) {
            throw new Error('user is not here')
        }
        return data
    }
    catch (error) {
        throw error
    }
}

//___________________ canvas services________________________________________________________
export const insertCanvas = async (name: string, userId: string) => {
    try {
        console.log('in service id is ' + userId)
        console.log('in service name is ' + name)
        const { data, error } = await supabase
            .from("Canvas")
            .insert({ name: name, user_reference: userId })
            .select()
        console.log(error)
        console.log(data)
        return data
    }
    catch (error) {
        console.log(error)
        throw error
    }
}

export const getCanvasData = async (userId: string) => {
    try {
        const { data, error } = await supabase
            .from("Canvas")
            .select()
            .eq("user_reference", userId)

        return data
    }
    catch (error) {
        throw error
    }
}

export const updateCanvasData = async (publicUrl: string, id: string) => {
    try {
        const { data, error } = await supabase
            .from("Canvas")
            .update({ img_url: publicUrl })
            .eq('id', id)
    }
    catch (error) {
        throw error
    }
}
export const uploadImageData = async (file: Buffer, id: string, userId: string) => {
    try {
        const { error } = await supabase.storage
            .from('previewStorage')
            .upload(`${userId}/${id}.png`, file, { upsert: true, contentType: 'image/png' })
        console.log('made it to the end')

    }
    catch (error) {
        console.log(error)
        throw error
    }
}

export const getImageData = (id: string, userId: string) => {
    console.log(id)
    const { data } = supabase.storage
        .from('previewStorage')
        .getPublicUrl(`${userId}/${id}.png`)

    console.log("upload blob service" + data)
    return data
}

export const deleteCanvasSession = async (id: string, userId: string) => {
    console.log(id)
    const { error } = await supabase
        .from("Canvas")
        .delete()
        .eq("id", id)

    const { error: storageError } = await supabase.storage
        .from('previewStorage')
        .remove([`${userId}/${id}`])

    if (error)
        throw new Error('could not delete canvas')
}

export const signOutUser = async (userId: string) => {
    console.log('made it to servcicece yee haw' + userId)
    const { error } = await supabase.auth.admin.deleteUser(userId)
    const { data } = await supabase.storage
        .from("previewStorage")
        .list(userId)

    const files = data!.map((fileInfo) => { return `${userId}/${fileInfo.name}` })
    const { error: errorStorage } = await supabase.storage.from("previewStorage").remove(files)


    if (error) {
        console.log(error)
        throw new Error('could not delete user')
    }
}
