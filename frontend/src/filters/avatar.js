
export default function(value) {
    if (!value) {
        return  require('@img/avatar.svg');
    }
    

    return require(`../../../backend/uploads/${value}`);
}