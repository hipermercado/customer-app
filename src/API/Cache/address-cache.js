import addressApi from "../Address/AddressAPI"

const getAddressForCurrentUser = async () => {
    if (localStorage.getItem('address') === null || localStorage.getItem('address') === JSON.stringify({})) {
        try {
            const address = await addressApi.getAddressForCurrentUser();
            console.log(address);
            localStorage.setItem('address', JSON.stringify(address));
        } catch (error) {
            console.log(error);
        }
    }
    return JSON.parse(localStorage.getItem('address'));
}

// add adrress only if not only present
// currently we are supporting only one address per use
const addAddressForCurrentUser = async (data) => {
    const res = await addressApi.add(data);
    localStorage.removeItem('address');
    return res;
}

const updateAddressForCurrentUser = async (data) => {
    if (data.addressId === null) {
        throw new Error("AddressId can not be null for update operation");
    }
    const res = await addressApi.add(data);
    localStorage.removeItem('address');
    return res;
}

export {
    getAddressForCurrentUser,
    updateAddressForCurrentUser,
    addAddressForCurrentUser
};