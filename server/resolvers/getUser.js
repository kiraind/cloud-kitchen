export default async function getUser(_parent, _args, context) {
    if(!context.user) {
        return null
    }

    return {
        name:  context.user.name,
        email: context.user.email,
    }
}