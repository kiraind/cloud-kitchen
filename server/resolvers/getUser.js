export default async function getUser(parent, args, context) {
    if(!context.user) {
        return null
    }

    return {
        name:  context.user.name,
        email: context.user.email,
    }
}